terraform {
  backend "s3" {
    bucket  = "nojov-ui-tfstates"
    region  = "us-east-1"
    key     = "terraform.tfstate"
    profile = "default"
    encrypt = true
  }
}
