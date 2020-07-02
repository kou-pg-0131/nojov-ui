variable stage { default = "dev" }

terraform {
  backend "s3" {
    bucket  = "nojov-ui-tfstates"
    region  = "us-east-1"
    key     = "dev/terraform.tfstate"
    profile = "default"
    encrypt = true
  }
}
