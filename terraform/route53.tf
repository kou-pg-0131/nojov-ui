data "aws_route53_zone" "main" {
  name         = "kou-pg.com"
  private_zone = false
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main.id
  name    = "nojov"
  type    = "CNAME"

  records = ["cname.vercel-dns.com"]
  ttl     = 60
}

resource "aws_route53_record" "certificate_validation" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_acm_certificate.main.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.main.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.main.domain_validation_options.*.resource_record_value[0]]
  ttl     = 300
}

data "aws_route53_zone" "nojov_net" {
  name         = "nojov.net"
  private_zone = false
}

resource "aws_route53_record" "nojov_net_certificate_validation" {
  zone_id = data.aws_route53_zone.nojov_net.zone_id
  name    = aws_acm_certificate.nojov_net.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.nojov_net.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.nojov_net.domain_validation_options.*.resource_record_value[0]]
  ttl     = 300
}

data "aws_route53_zone" "redirect" {
  name         = "nojov.net"
  private_zone = false
}

resource "aws_route53_record" "redirect" {
  zone_id = data.aws_route53_zone.redirect.id
  name    = "nojov.net"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.redirect.domain_name
    zone_id                = aws_cloudfront_distribution.redirect.hosted_zone_id
    evaluate_target_health = false
  }
}
