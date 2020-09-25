FROM node:14-alpine

WORKDIR /usr/src/app
RUN apk add --no-cache build-base git python

COPY package*.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

CMD ["yarn", "start"]
