FROM node:8-slim

ARG ENV=qa

ENV ROOT_APP_DIR=/webapp/current

WORKDIR $ROOT_APP_DIR

COPY ./build $ROOT_APP_DIR/

RUN npm i

EXPOSE 8080

CMD ./scripts/start-server.sh
