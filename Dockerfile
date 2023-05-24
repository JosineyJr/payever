FROM node:lts-alpine

RUN mkdir -p /home/root/api/node_modules && chown -R root:root /home/root/api

WORKDIR /home/root/api

COPY package.json yarn.* ./

COPY /messaging ./

USER root

RUN yarn

COPY --chown=root:root . .

RUN yarn build

RUN apk update && \
    apk add git

EXPOSE ${SERVER_PORT}

CMD ["yarn", "start:prod"]