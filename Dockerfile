FROM node:14.17.1

WORKDIR /app

COPY ./ ./

CMD npm install && npm run build && npm run start:docker && npm run createdb:prod && npm run migrate:prod