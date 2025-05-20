variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "env" {
  description = "Environment (dev/prod)"
  type        = string
  default     = "prod"
} 
