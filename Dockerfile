FROM node:latest

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules

RUN yarn

RUN yarn build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react
