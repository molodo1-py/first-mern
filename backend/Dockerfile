FROM node:latest

RUN mkdir /home/app

WORKDIR /home/app

COPY package.json .

RUN npm i --only=production

COPY . .

CMD ["npm", "start"]