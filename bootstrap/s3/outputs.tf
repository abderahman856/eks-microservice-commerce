output "state_bucket_name" {
  description = ""
  value       = aws_s3_bucket.terraform_state.id
}

output "state_bucket_arn" {
  description = "ARN of the state bucket."
  value       = aws_s3_bucket.terraform_state.arn
}

output "aws_region" {
  description = "Region the bucket was created in."
  value       = var.aws_region
}