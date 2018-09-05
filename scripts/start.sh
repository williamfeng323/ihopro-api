#!/usr/bin/env sh

docker-compose -p $application -f ./docker-compose.yml build
docker-compose -p $application -f ./docker-compose.yml run
