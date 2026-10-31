FROM node:22-alpine

WORKDIR /app

COPY *.json .

RUN npm ci

COPY . .

EXPOSE 7777

CMD [ "npm","run", "start" ]