variable "stage" {}
variable "basic_auth_username" {}
variable "basic_auth_password" {}

locals {
  zone_name  = "kou-pg.com"
  sub_domain = var.stage == "prod" ? "" : "${var.stage}."
  domain     = "${local.sub_domain}nojov.${local.zone_name}"
  prefix     = "nojov-ui-${var.stage}"
}
