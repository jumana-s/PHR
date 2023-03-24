FROM node:18-alpine as build-stage

# setting working dir inside container
WORKDIR /react-app

# copy everything
COPY . .

# installing npm packages
RUN npm install

# creating production build to serve through nginx
RUN npm run build

# starting second, nginx build-stage
FROM nginx:1.15

# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf

# copying our nginx config
COPY --from=build-stage /react-app/nginx.conf /etc/nginx/conf.d/

# copying production build from last stage to serve through nginx
COPY --from=build-stage /react-app/build/ /usr/share/nginx/html

# exposing port 8080 on container
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]