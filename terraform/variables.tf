variable "project_name" {
  description = "The name of the project"
  default     = "ecommerce-app"
}
variable "vpc_name" {
  type    = string
  default = "my-vpc"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnets_cidrs" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets_cidrs" {
  type    = list(string)
  default = ["10.0.10.0/24", "10.0.11.0/24"]
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "eks_cluster_role_name" {
  type    = string
  default = "eks-cluster-role"
}

variable "node_group_role_name" {
  type    = string
  default = "eks-node-group-role"
}

variable "dbPassword" {
  type      = string
  sensitive = true
}

variable "jwtSecret" {
  type      = string
  sensitive = true
}

variable "db_username" {
  type    = string
  default = "dbadmin"
}