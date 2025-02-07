FROM node:23-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

EXPOSE ${PORT}

COPY . .

CMD npm start