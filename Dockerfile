FROM node

WORKDIR /app

COPY package.json .

COPY public ./public

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node","app.cjs" ]