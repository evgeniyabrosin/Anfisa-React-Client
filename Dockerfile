FROM evgenyabrosin/node:16 as build-deps
RUN cd /opt && git clone https://github.com/ForomePlatform/Anfisa-React-Client.git && cd ./Anfisa-React-Client && git checkout develop
WORKDIR /opt/Anfisa-React-Client/
#ENV REACT_APP_URL_BACKEND=https://ui.asset-forome-0b8a4e8de101bcbaf4eafc441eda83b3-0000.us-south.containers.appdomain.cloud/app
ENV REACT_APP_URL_BACKEND=https://qa.asset-forome-dev-162fa491ef10b14d22843708d94ef0ba-0000.us-south.containers.appdomain.cloud/app
RUN ["yarn", "install"]
RUN ["yarn", "build"]

FROM evgenyabrosin/nginx:latest
COPY ./default.nginx /opt/
RUN rm -Rf /etc/nginx/conf.d/* && cd /opt/ && mv default.nginx /etc/nginx/conf.d/Anfisa.conf
COPY --from=build-deps /opt/Anfisa-React-Client/build /usr/share/nginx/html/Anfisa
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
