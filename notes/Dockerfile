FROM node:14.19.2

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "index.js" ]