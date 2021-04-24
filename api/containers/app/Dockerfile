FROM lambci/yumda:2 as build-layer

RUN yum -y update \
 && yum install -y \
      libuuid.x86_64 \
      libblkid.x86_64 \
      libmount.x86_64

# ---

FROM lambci/lambda:build-nodejs12.x
WORKDIR /app

ENV YARN_VERSION 1.22.10

COPY --from=build-layer /lambda/opt/lib/ /opt/lib/

ENV HOME /root
ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

# install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version ${YARN_VERSION}
