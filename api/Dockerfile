FROM node:12

WORKDIR /usr/src/crud-people

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev:server" ]
