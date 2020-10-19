FROM node:10-alpine as builder
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm install
COPY ./app /app
RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /var/www/frontend
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]