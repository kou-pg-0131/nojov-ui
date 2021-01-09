provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

module "main" {
  source              = "../.."
  stage               = var.stage
  basic_auth_username = var.basic_auth_username
  basic_auth_password = var.basic_auth_password
}

variable "basic_auth_username" {}
variable "basic_auth_password" {}
