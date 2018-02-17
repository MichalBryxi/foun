FROM node:18-alpine

RUN \
  npm install -g ember-cli@4.8.0 netlify-cli && \
  npm cache clean --force

ENV HOME=/myapp
ENV TMP=/tmp
WORKDIR $HOME

COPY ui/frontend/package.json ui/frontend/yarn.lock $TMP/
RUN cd $TMP && yarn && yarn cache clean
RUN ln -s /tmp/node_modules