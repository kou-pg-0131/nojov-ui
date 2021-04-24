variable "stage" {}

locals {
  zone_name  = "kou-pg.com"
  sub_domain = var.stage == "prod" ? "" : "${var.stage}."
  domain     = "${local.sub_domain}api.nojov.${local.zone_name}"
  prefix     = "nojov-api-${var.stage}"
}
