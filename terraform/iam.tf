data "aws_iam_policy_document" "basic_auth_lambda" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "basic_auth_lambda" {
  count              = var.stage == "prod" ? 0 : 1
  name               = "${local.prefix}-basic-auth-lambda"
  assume_role_policy = data.aws_iam_policy_document.basic_auth_lambda.json
}

data "aws_iam_policy" "aws_lambda_basic_execution_role" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "basic_auth_lambda" {
  count      = var.stage == "prod" ? 0 : 1
  role       = aws_iam_role.basic_auth_lambda[0].name
  policy_arn = data.aws_iam_policy.aws_lambda_basic_execution_role.arn
}
