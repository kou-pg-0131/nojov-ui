data "template_file" "basic_auth_lambda_src" {
  template = file("../../lambda_src/index.js.template")
  vars = {
    basic_auth_username = var.basic_auth_username
    basic_auth_password = var.basic_auth_password
  }
}

data "archive_file" "basic_auth_lambda_src" {
  type = "zip"
  source {
    content  = data.template_file.basic_auth_lambda_src.rendered
    filename = "index.js"
  }
  output_path = "index.js.zip"
}

resource "aws_lambda_function" "basic_auth" {
  count = var.stage == "prod" ? 0 : 1

  function_name    = "${local.prefix}-basic-auth"
  filename         = data.archive_file.basic_auth_lambda_src.output_path
  source_code_hash = data.archive_file.basic_auth_lambda_src.output_base64sha256
  runtime          = "nodejs12.x"
  role             = aws_iam_role.basic_auth_lambda[0].arn
  handler          = "index.handler"
  publish          = true
}
