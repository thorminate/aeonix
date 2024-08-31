FROM node:20.16.0-alpine as build

WORKDIR /.
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]