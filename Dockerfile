FROM node:14.17.1

WORKDIR /app

COPY ./ ./

RUN npm install \
  && npm run build

EXPOSE 3030

CMD ["npm", "run", "start:docker"]