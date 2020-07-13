data aws_acm_certificate main {
  domain   = local.domain
  statuses = ["ISSUED"]
}
