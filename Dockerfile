#Stage 1

FROM node:18-alpine as builder

WORKDIR  /app

# Set build arguments with default values 
ARG VITE_WP_URL=http://localhost:8080

ENV VITE_WP_URL=$VITE_WP_URL

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

#Stage 2

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]