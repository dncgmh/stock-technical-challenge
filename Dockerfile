FROM node:16-alpine
LABEL maintainer "dncgmh"

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./

RUN set -x && yarn
RUN yarn global add @nestjs/cli

COPY . .

CMD [ "yarn", "start:dev" ]