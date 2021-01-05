resource aws_acm_certificate main {
  domain_name       = local.domain
  validation_method = "DNS"
  tags              = { Name = local.prefix }
}

resource aws_acm_certificate_validation main {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [aws_route53_record.certificate_validation.fqdn]
}
