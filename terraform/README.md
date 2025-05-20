# GCP Deployment with Terraform

This directory contains Terraform configurations to deploy the Next.js portfolio site to Google Cloud Platform (GCP) using App Engine.

## Prerequisites

1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. [Terraform](https://www.terraform.io/downloads.html)
3. A GCP Project with billing enabled
4. GCP credentials configured locally

## Setup

1. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit `terraform.tfvars` with your GCP project details:
   ```hcl
   project_id = "your-project-id"
   region     = "us-central1"
   env        = "prod"
   ```

3. Initialize Terraform:
   ```bash
   terraform init
   ```

4. Plan the deployment:
   ```bash
   terraform plan
   ```

5. Apply the configuration:
   ```bash
   terraform apply
   ```

## Deployment Process

1. Build the Next.js application:
   ```bash
   npm run build
   ```

2. Deploy to App Engine:
   ```bash
   gcloud app deploy app.yaml
   ```

## Cleanup

To destroy all created resources:
```bash
terraform destroy
```

## Costs

The deployment uses:
- App Engine Standard Environment (F1 instance)
- Cloud Storage for static assets
- Cloud Build for deployments

Most resources fall under GCP's free tier:
- App Engine: 28 instance hours per day free
- Cloud Storage: First 5GB per month free
- Cloud Build: First 120 build-minutes per day free

## Notes

- The site will be available at `https://[PROJECT_ID].appspot.com`
- Static assets are served from a public Cloud Storage bucket
- The deployment uses the smallest instance class (F1) to minimize costs 