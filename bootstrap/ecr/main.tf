resource "aws_ecr_repository" "app_repos" {
  for_each             = toset(var.ecr_repo_list)
  
  name                 = "${each.key}-service"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true # Automatically checks your code for vulnerabilities
  }

  tags = var.tags
}

resource "aws_ecr_lifecycle_policy" "repo_policy" {
  for_each = aws_ecr_repository.app_repos

  repository = each.value.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 10 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 10
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}