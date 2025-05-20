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
   ![Terraform Init](../screenshots/terraform/terraform%20init.png)
   This initializes Terraform and downloads required providers. The green output indicates successful initialization.

4. Plan the deployment:
   ```bash
   terraform plan
   ```
   ![Terraform Plan](../screenshots/terraform/terraform%20plan.png)
   The plan shows what resources will be created in GCP. Here you can review the changes before applying them.

5. Apply the configuration:
   ```bash
   terraform apply
   ```
   ![Terraform Apply Part 1](../screenshots/terraform/terraform%20apply%201.png)
   ![Terraform Apply Part 2](../screenshots/terraform/terraform%20apply%202.png)
   This creates all the necessary resources in GCP. The green output shows successful resource creation.

## Deployment Process

1. Build the Next.js application:
   ```bash
   npm run build
   ```
   ![Next.js Build](../screenshots/terraform/npm%20run%20build.png)
   This creates an optimized production build of your Next.js application. The output shows successful compilation and page generation.

2. Deploy to App Engine:
   ```bash
   gcloud app deploy app.yaml
   ```
   ![GCloud Deploy](../screenshots/terraform/gcloud%20deploy.png)
   This deploys your application to App Engine. The output shows deployment progress and success.

3. View the live site:
   ![Live Site](../screenshots/terraform/live%20site.png)
   After successful deployment, your site will be accessible at the App Engine URL.

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

- The site is available at [https://portfolio-on-gcp.uc.r.appspot.com/](https://portfolio-on-gcp.uc.r.appspot.com/)
- Static assets are served from a public Cloud Storage bucket
- The deployment uses the smallest instance class (F1) to minimize costs 