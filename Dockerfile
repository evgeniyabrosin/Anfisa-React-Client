FROM node:16 as build-deps
RUN cd /opt && https://github.com/evgeniyabrosin/Anfisa-React-Client.git && cd ./Anfisa-React-Client && git checkout develop
WORKDIR /opt/Anfisa-React-Client/
RUN ["yarn", "install"]
RUN ["yarn", "build"]

FROM nginx:latest
COPY ./default.nginx /opt/
RUN rm -Rf /etc/nginx/conf.d/* && cd /opt/ && mv default.nginx /etc/nginx/conf.d/Anfisa.conf
COPY --from=build-deps /opt/Anfisa-React-Client/build /usr/share/nginx/html/Anfisa
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
