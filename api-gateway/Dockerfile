FROM node:20

#tao thu muc trong container
WORKDIR /root/api-gateway

#copy package.json vao WORKDIR
COPY package.json .

RUN yarn install

#copy src vao WORKDIR
COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start:prod" ]

#docker build . -t api-gateway ==> tao image
#docker run -d -p 8080:8080 --name api-gateway --net node-network api-gateway