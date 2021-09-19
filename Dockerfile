FROM node:14.17.1

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

RUN npm run createdb:prod

RUN npm run migrate:prod

CMD npm run start:docker