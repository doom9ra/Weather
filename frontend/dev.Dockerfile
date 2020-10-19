FROM node:10-alpine
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm install
COPY ./app /app
