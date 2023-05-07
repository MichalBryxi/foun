FROM ruby:3.2.2-alpine

RUN apk update && \
      apk add --no-cache \
      git \
      g++ \
      make \
      graphviz \
      ttf-freefont \
      linux-headers \
      postgresql-dev \
      nodejs \
      ncurses

WORKDIR /myapp

ADD backend/Gemfile backend/Gemfile.lock /myapp/
RUN bundle install