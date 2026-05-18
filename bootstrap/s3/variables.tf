variable "project_name" {
  description = "The name of the project."
  type        = string
  default     = "ecommerce-app"
}

variable "aws_region" {
  description = "AWS region to create the state bucket in."
  type        = string
  default     = "us-east-1"
}