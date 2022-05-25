FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]