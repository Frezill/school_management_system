FROM node:20-alpine

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 1507
CMD npm start