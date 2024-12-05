FROM node:20

#tao thu muc trong container
WORKDIR /root/order-service

#copy package.json vao WORKDIR
COPY package.json .

RUN yarn install

COPY ./src/prisma ./src/prisma

RUN yarn prisma generate --schema src/prisma/schema.prisma

#copy src vao WORKDIR
COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]

#docker build . -t order-service ==> tao image
#docker run -d --name order-service --net node-network order-service