FROM node:12

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev:server"]
