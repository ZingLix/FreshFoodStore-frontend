FROM node as react-build
WORKDIR /app
COPY ./ /app
RUN npm i
RUN npm run build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
ADD https://raw.githubusercontent.com/ZingLix/FreshFoodStore-frontend/21cb092e384a36fc73f54e5b839a232dd4d0d8e3/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
