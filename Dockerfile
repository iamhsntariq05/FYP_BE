FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

# for  TS
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 8000

CMD node  src/index.js