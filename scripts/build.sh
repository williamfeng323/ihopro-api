#!/usr/bin/env sh

npm run build
cp ./environments/$BUILD_ENV.env ./build/.env
cp ./package*.json ./build/
if [ -d "./build/scripts" ]; then
  rm -rf ./build/scripts
fi
mkdir ./build/scripts
cp ./scripts/start-server.sh ./build/scripts/start-server.sh

docker build -f ./Dockerfile -t $IMAGE_NAME --build-arg ENV=$BUILD_ENV  .
