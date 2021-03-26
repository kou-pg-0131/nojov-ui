resource "aws_cloudfront_distribution" "redirect" {
  enabled = true

  origin {
    origin_id   = aws_s3_bucket.redirect.id
    domain_name = "${aws_s3_bucket.redirect.id}.s3-website-${data.aws_region.current.name}.amazonaws.com"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2", ]
    }
  }

  aliases      = ["nojov.net"]
  http_version = "http2"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", ]
    cached_methods         = ["GET", "HEAD", ]
    compress               = true
    default_ttl            = 3600
    max_ttl                = 86400
    min_ttl                = 0
    target_origin_id       = aws_s3_bucket.redirect.id
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      headers = []
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.nojov_net.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2019"
    ssl_support_method             = "sni-only"
  }
}
