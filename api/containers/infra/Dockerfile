FROM amazon/aws-cli:2.0.24
WORKDIR /app
ENV TERRAFORM_VERSION 0.14.9

RUN yum -y update
RUN yum -y install wget unzip

# install terraform
RUN wget -P /tmp https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip \
 && unzip /tmp/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/local/bin/

ENTRYPOINT [""]
