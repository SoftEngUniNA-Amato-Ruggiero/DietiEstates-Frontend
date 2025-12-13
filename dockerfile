FROM node:lts-trixie AS build
WORKDIR /app
COPY ./src ./src
COPY ./public ./public
COPY *.json ./
RUN npm -g install @angular/cli@20.1.3 && npm install && ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/DietiEstatesFrontend/browser /usr/share/nginx/html
EXPOSE 80