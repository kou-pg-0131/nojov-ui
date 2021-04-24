FROM amazon/aws-cli:2.0.24
WORKDIR /app
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV TERRAFORM_VERSION 0.14.9

RUN yum -y update
RUN yum -y install wget unzip

RUN aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} \
 && aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} \
 && aws configure set region us-east-1

# install terraform
RUN wget -P /tmp https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip \
 && unzip /tmp/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/local/bin/

ENTRYPOINT [""]
