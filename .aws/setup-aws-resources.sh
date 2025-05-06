#!/bin/bash
# Script to set up required AWS resources for the portfolio deployment

# Exit on error
set -e

# Variables - customize these
AWS_REGION="us-east-1"
ECR_REPOSITORY_NAME="ntanwir-portfolio"
ECS_CLUSTER_NAME="portfolio-cluster"
ECS_SERVICE_NAME="portfolio-service"
TASK_FAMILY_NAME="portfolio-task"
VPC_NAME="portfolio-vpc"
SECURITY_GROUP_NAME="portfolio-sg"

echo "Setting up AWS resources for portfolio deployment..."

# Create ECR repository if it doesn't exist
echo "Creating ECR repository..."
aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} ||
  aws ecr create-repository \
    --repository-name ${ECR_REPOSITORY_NAME} \
    --image-tag-mutability IMMUTABLE \
    --image-scanning-configuration scanOnPush=true \
    --region ${AWS_REGION}

# Create VPC if it doesn't exist
echo "Creating VPC..."
VPC_ID=$(aws ec2 describe-vpcs \
  --filters Name=tag:Name,Values=${VPC_NAME} \
  --query "Vpcs[0].VpcId" \
  --output text \
  --region ${AWS_REGION} || echo "")

if [ "$VPC_ID" == "None" ] || [ -z "$VPC_ID" ]; then
  echo "Creating new VPC..."
  VPC_ID=$(aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=${VPC_NAME}}]" \
    --region ${AWS_REGION} \
    --query "Vpc.VpcId" \
    --output text)
  
  # Enable DNS hostnames for the VPC
  aws ec2 modify-vpc-attribute \
    --vpc-id ${VPC_ID} \
    --enable-dns-hostnames \
    --region ${AWS_REGION}
fi

echo "VPC ID: ${VPC_ID}"

# Create Internet Gateway if it doesn't exist
echo "Creating Internet Gateway..."
IGW_ID=$(aws ec2 describe-internet-gateways \
  --filters Name=attachment.vpc-id,Values=${VPC_ID} \
  --query "InternetGateways[0].InternetGatewayId" \
  --output text \
  --region ${AWS_REGION} || echo "")

if [ "$IGW_ID" == "None" ] || [ -z "$IGW_ID" ]; then
  echo "Creating new Internet Gateway..."
  IGW_ID=$(aws ec2 create-internet-gateway \
    --tag-specifications "ResourceType=internet-gateway,Tags=[{Key=Name,Value=${VPC_NAME}-igw}]" \
    --region ${AWS_REGION} \
    --query "InternetGateway.InternetGatewayId" \
    --output text)
  
  # Attach Internet Gateway to VPC
  aws ec2 attach-internet-gateway \
    --internet-gateway-id ${IGW_ID} \
    --vpc-id ${VPC_ID} \
    --region ${AWS_REGION}
fi

echo "Internet Gateway ID: ${IGW_ID}"

# Create subnets in different availability zones
echo "Creating subnets..."
SUBNET_IDS=""
for AZ_SUFFIX in a b; do
  AZ="${AWS_REGION}${AZ_SUFFIX}"
  
  # Set CIDR based on availability zone
  if [ "$AZ_SUFFIX" == "a" ]; then
    CIDR="10.0.1.0/24"
  else
    CIDR="10.0.2.0/24"
  fi
  
  SUBNET_ID=$(aws ec2 describe-subnets \
    --filters "Name=vpc-id,Values=${VPC_ID}" "Name=availability-zone,Values=${AZ}" \
    --query "Subnets[0].SubnetId" \
    --output text \
    --region ${AWS_REGION} || echo "")
  
  if [ "$SUBNET_ID" == "None" ] || [ -z "$SUBNET_ID" ]; then
    echo "Creating subnet in ${AZ}..."
    if [ "$AZ_SUFFIX" == "a" ]; then
      CIDR="10.0.1.0/24"
    else
      CIDR="10.0.2.0/24"
    fi
    
    SUBNET_ID=$(aws ec2 create-subnet \
      --vpc-id ${VPC_ID} \
      --cidr-block ${CIDR} \
      --availability-zone ${AZ} \
      --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=${VPC_NAME}-subnet-${AZ_SUFFIX}}]" \
      --region ${AWS_REGION} \
      --query "Subnet.SubnetId" \
      --output text)
    
    # Enable auto-assign public IP
    aws ec2 modify-subnet-attribute \
      --subnet-id ${SUBNET_ID} \
      --map-public-ip-on-launch \
      --region ${AWS_REGION}
  fi
  
  echo "Subnet ID for ${AZ}: ${SUBNET_ID}"
  
  if [ -z "$SUBNET_IDS" ]; then
    SUBNET_IDS="${SUBNET_ID}"
  else
    SUBNET_IDS="${SUBNET_IDS},${SUBNET_ID}"
  fi
done

# Create route table and add routes
echo "Setting up route table..."
ROUTE_TABLE_ID=$(aws ec2 describe-route-tables \
  --filters "Name=vpc-id,Values=${VPC_ID}" "Name=tag:Name,Values=${VPC_NAME}-rtb" \
  --query "RouteTables[0].RouteTableId" \
  --output text \
  --region ${AWS_REGION} || echo "")

if [ "$ROUTE_TABLE_ID" == "None" ] || [ -z "$ROUTE_TABLE_ID" ]; then
  echo "Creating new route table..."
  ROUTE_TABLE_ID=$(aws ec2 create-route-table \
    --vpc-id ${VPC_ID} \
    --tag-specifications "ResourceType=route-table,Tags=[{Key=Name,Value=${VPC_NAME}-rtb}]" \
    --region ${AWS_REGION} \
    --query "RouteTable.RouteTableId" \
    --output text)
  
  # Add route to Internet Gateway
  aws ec2 create-route \
    --route-table-id ${ROUTE_TABLE_ID} \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id ${IGW_ID} \
    --region ${AWS_REGION}
  
  # Associate route table with subnets
  IFS=',' read -ra SUBNET_ARRAY <<< "$SUBNET_IDS"
  for SUBNET in "${SUBNET_ARRAY[@]}"; do
    aws ec2 associate-route-table \
      --route-table-id ${ROUTE_TABLE_ID} \
      --subnet-id ${SUBNET} \
      --region ${AWS_REGION}
  done
fi

echo "Route Table ID: ${ROUTE_TABLE_ID}"

# Create security group if it doesn't exist
echo "Creating security group..."
SECURITY_GROUP_ID=$(aws ec2 describe-security-groups \
  --filters Name=group-name,Values=${SECURITY_GROUP_NAME} Name=vpc-id,Values=${VPC_ID} \
  --query "SecurityGroups[0].GroupId" \
  --output text \
  --region ${AWS_REGION} || echo "")

if [ "$SECURITY_GROUP_ID" == "None" ] || [ -z "$SECURITY_GROUP_ID" ]; then
  SECURITY_GROUP_ID=$(aws ec2 create-security-group \
    --group-name ${SECURITY_GROUP_NAME} \
    --description "Security group for portfolio application" \
    --vpc-id ${VPC_ID} \
    --region ${AWS_REGION} \
    --output text \
    --query "GroupId")
  
  # Add inbound rule for HTTP
  aws ec2 authorize-security-group-ingress \
    --group-id ${SECURITY_GROUP_ID} \
    --protocol tcp \
    --port 3000 \
    --cidr 0.0.0.0/0 \
    --region ${AWS_REGION}
fi

echo "Security Group ID: ${SECURITY_GROUP_ID}"

# Create ECS cluster if it doesn't exist
echo "Creating ECS cluster..."
CLUSTER_EXISTS=$(aws ecs describe-clusters --clusters ${ECS_CLUSTER_NAME} --region ${AWS_REGION} --query 'clusters[0].clusterName' --output text 2>/dev/null || echo "MISSING")

if [ "$CLUSTER_EXISTS" == "MISSING" ] || [ -z "$CLUSTER_EXISTS" ] || [ "$CLUSTER_EXISTS" == "None" ]; then
  echo "Creating new ECS cluster..."
  aws ecs create-cluster --cluster-name ${ECS_CLUSTER_NAME} --region ${AWS_REGION}
fi

# Register task definition
echo "Registering task definition..."
# Replace placeholders in task definition
sed -i.bak "s|123456789012.dkr.ecr.us-east-1.amazonaws.com\/ntanwir-portfolio|$(aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} --query 'repositories[0].repositoryUri' --output text)|g" $(dirname "$0")/task-definition.json
sed -i.bak "s/123456789012/$(aws sts get-caller-identity --query 'Account' --output text)/g" $(dirname "$0")/task-definition.json

# Register the task definition
aws ecs register-task-definition --cli-input-json file://$(dirname "$0")/task-definition.json --region ${AWS_REGION}

# Create ECS service if it doesn't exist
echo "Creating ECS service..."
SERVICE_EXISTS=$(aws ecs describe-services --cluster ${ECS_CLUSTER_NAME} --services ${ECS_SERVICE_NAME} --region ${AWS_REGION} --query 'services[0].status' --output text 2>/dev/null || echo "MISSING")

if [ "$SERVICE_EXISTS" == "MISSING" ] || [ "$SERVICE_EXISTS" == "None" ]; then
  aws ecs create-service \
    --cluster ${ECS_CLUSTER_NAME} \
    --service-name ${ECS_SERVICE_NAME} \
    --task-definition ${TASK_FAMILY_NAME} \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_IDS}],securityGroups=[${SECURITY_GROUP_ID}],assignPublicIp=ENABLED}" \
    --region ${AWS_REGION}
fi

echo "AWS resources setup complete!"