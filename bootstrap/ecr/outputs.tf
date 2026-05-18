output "repository_urls" {
  description = "The URLs of the generated ECR repositories"
  value       = { for k, v in aws_ecr_repository.app_repos : k => v.repository_url }
}

output "registry_id" {
  description = "The account ID of the ECR registry"
  value       = values(aws_ecr_repository.app_repos)[0].registry_id
}