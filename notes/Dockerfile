FROM node:14.19.2

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "index.js" ]