FROM node:12

WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./source ./source/
CMD ["node", "source/index.js"]
