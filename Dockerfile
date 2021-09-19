FROM node:14.17.1

WORKDIR /app

COPY ./ ./

RUN npm install \
  && npm run build

CMD ["npm", "run", "start:docker"]