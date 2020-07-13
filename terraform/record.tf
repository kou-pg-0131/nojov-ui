data aws_route53_zone main {
  name         = local.zone_name
  private_zone = false
}

resource aws_route53_record main {
  zone_id = data.aws_route53_zone.main.id
  name    = local.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.deployment.domain_name
    zone_id                = aws_cloudfront_distribution.deployment.hosted_zone_id
    evaluate_target_health = false
  }
}
