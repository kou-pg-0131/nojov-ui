FROM lambci/yumda:2 as build-layer

RUN yum -y update \
 && yum install -y \
      libuuid.x86_64 \
      libblkid.x86_64 \
      libmount.x86_64

# ---

FROM lambci/lambda:build-nodejs12.x
WORKDIR /app
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV HOME /root
ENV YARN_VERSION 1.22.10

COPY --from=build-layer /lambda/opt/lib/ /opt/lib/

RUN aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} \
 && aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} \
 && aws configure set region us-east-1

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version ${YARN_VERSION}
