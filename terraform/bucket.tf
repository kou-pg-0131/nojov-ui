resource aws_s3_bucket deployment {
  bucket        = "${local.prefix}-deployment"
  acl           = "private"
  force_destroy = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    prefix  = "/"
    enabled = true
    noncurrent_version_expiration {
      days = 60
    }
  }

  tags = {
    Name = "${local.prefix}-deployment"
  }
}
