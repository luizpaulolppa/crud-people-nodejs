FROM node:12

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
