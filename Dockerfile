FROM node:10-slim
# Puerto que va a atender
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD ["npm","start"]
