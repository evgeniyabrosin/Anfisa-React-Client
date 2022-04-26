FROM evgenyabrosin/node:16 as build-deps
RUN cd /opt && git clone https://github.com/ForomePlatform/Anfisa-React-Client.git && cd ./Anfisa-React-Client && git checkout feature/FOROME-787
WORKDIR /opt/Anfisa-React-Client/
RUN ["yarn", "install"]
RUN ["yarn", "build"]

FROM evgenyabrosin/nginx:latest
COPY ./default.nginx /opt/
RUN rm -Rf /etc/nginx/conf.d/* && cd /opt/ && mv default.nginx /etc/nginx/conf.d/Anfisa.conf
COPY --from=build-deps /opt/Anfisa-React-Client/build /usr/share/nginx/html/Anfisa
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
