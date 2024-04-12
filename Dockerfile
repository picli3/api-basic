FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

CMD ["npm", "start"]