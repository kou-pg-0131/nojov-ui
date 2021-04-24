resource "aws_s3_bucket" "redirect" {
  bucket        = "${local.prefix}-redirect"
  acl           = "private"
  force_destroy = true

  website {
    redirect_all_requests_to = "https://nojov.kou-pg.com"
  }
}
