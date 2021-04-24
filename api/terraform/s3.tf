resource "aws_s3_bucket" "files" {
  bucket        = "${local.prefix}-files"
  acl           = "private"
  force_destroy = var.stage != "prod"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true
    noncurrent_version_expiration {
      days = 7
    }
  }

  tags = { Name = "${local.prefix}-files" }
}
