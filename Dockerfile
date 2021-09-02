FROM node:14.17.1

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

RUN npm install -g concurrently

CMD ["concurrently","npm:start:docker", "npm:createdb:prod", "npm:migrate:prod"]

# CMD npm run start:docker
# CMD npm run createdb:prod
# CMD npm run migrate:prod