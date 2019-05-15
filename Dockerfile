FROM node as react-build
WORKDIR /app
COPY ./ /app
RUN npm i
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
