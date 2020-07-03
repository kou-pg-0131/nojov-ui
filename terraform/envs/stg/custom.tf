variable stage { default = "stg" }

terraform {
  backend "s3" {
    bucket  = "nojov-ui-tfstates"
    region  = "us-east-1"
    key     = "stg/terraform.tfstate"
    profile = "default"
    encrypt = true
  }
}
