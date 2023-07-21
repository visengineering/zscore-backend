FROM node:18    

WORKDIR /usr/src/app

COPY package*.json ./

ENV SSH_TUNNEL_HOST " "\
  SSH_TUNNEL_USER_NAME " " \
  SSH_TUNNEL_PASSWORD " " \
  SSH_TUNNEL_PORT " " \
  DATABASE_PORT " " \
  DATABASE_USER_NAME " " \
  DATABASE_PASSWORD " " \
  DATABASE_HOST_NAME " " \
  DATABASE_NAME " "

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]