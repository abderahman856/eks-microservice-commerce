module "ecr_repositories" {
  source = "./ecr"  # Points to the folder where the resources are

  ecr_repo_list = [
    "auth",
    "cart",
    "orders",
    "product",
    "notification",
    "payment",
    "frontend"
  ]

  tags = {
    Environment = "Production"
    Project     = "Ecommerce-Microservices"
  }
}

module "state_backend" {
  source       = "./s3" 
  project_name = "baashe-ecommerce"
  aws_region   = "us-east-1"
}