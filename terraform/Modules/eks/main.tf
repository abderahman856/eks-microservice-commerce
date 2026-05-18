resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = var.cluster_role_arn

  enabled_cluster_log_types = ["api", "audit", "authenticator", "profile", "scheduler"]

  vpc_config {
    subnet_ids = var.subnet_ids

    endpoint_public_access = true
    public_access_cidrs    = ["203.0.113.5/32"]
  }

  encryption_config {
    resources = ["secrets"]
    provider {
      key_arn = aws_kms_key.eks_secrets_key.arn
    }
  }
}

resource "aws_kms_key" "eks_secrets_key" {
  description             = "KMS Key for EKS Secrets Encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
}

resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.cluster_name}-node-group"
  node_role_arn   = var.node_role_arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = 3
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.small"]

  depends_on = [
    aws_eks_cluster.main
  ]
}