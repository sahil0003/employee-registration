FROM node:17.4.0  as node
WORKDIR /src/app
COPY . .
RUN npm install
RUN npm run build 
#stage 2
FROM nginx:alpine
COPY --from=node /src/app/dist/employee-registration /usr/share/nginx/html
