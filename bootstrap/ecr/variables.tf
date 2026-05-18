variable "ecr_repo_list" {
  description = "List of microservices requiring ECR repositories"
  type        = list(string)
  default     = [
    "auth",
    "cart",
    "orders",
    "product",
    "notification",
    "payment",
    "frontend"
  ]
}

variable "tags" {
  description = "Common tags for all repositories"
  type        = map(string)
  default     = {
    Project = "Ecommerce-Platform"
    Owner   = "Baashe"
  }
}