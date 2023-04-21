FROM node:20.0.0

WORKDIR /usr/app
COPY ../ /usr/app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm run start
