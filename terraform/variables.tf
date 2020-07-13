variable stage {}

locals {
  zone_name  = "kou-pg.com"
  sub_domain = var.stage == "prod" ? "" : "${var.stage}."
  domain     = "${local.sub_domain}nojov.${local.zone_name}"
  prefix     = "nojov-ui-${var.stage}"
}
