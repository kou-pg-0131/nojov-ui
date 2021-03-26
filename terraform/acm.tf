resource "aws_acm_certificate" "main" {
  domain_name       = local.domain
  validation_method = "DNS"
  tags              = { Name = local.prefix }
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [aws_route53_record.certificate_validation.fqdn]
}

resource "aws_acm_certificate" "nojov_net" {
  domain_name       = "nojov.net"
  validation_method = "DNS"
  tags              = { Name = "${local.prefix}-net" }
}

resource "aws_acm_certificate_validation" "nojov_net" {
  certificate_arn         = aws_acm_certificate.nojov_net.arn
  validation_record_fqdns = [aws_route53_record.nojov_net_certificate_validation.fqdn]
}
