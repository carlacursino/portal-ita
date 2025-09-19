#!/usr/bin/env bash
set -euo pipefail

TARGET=${1:-default}
PORT=${2:-3000}

docker stop ${TARGET} || true
docker rm ${TARGET} || true
docker rmi ${TARGET} || true

[ -d ~/volumes/${TARGET}data ] || mkdir -p ~/volumes/${TARGET}data
[ "$(docker volume ls -q -f name=${TARGET}data)" ] || docker volume create -d local -o type=none -o device=~/volumes/${TARGET}data -o o=bind ${TARGET}data

[ -d ~/volumes/${TARGET}dbdata ] || mkdir -p ~/volumes/${TARGET}dbdata
[ "$(docker volume ls -q -f name=${TARGET}dbdata)" ] || docker volume create -d local -o type=none -o device=~/volumes/${TARGET}dbdata -o o=bind ${TARGET}dbdata

DOCKER_BUILDKIT=1 ECOSYSTEM=${TARGET} PORT=${PORT} USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose.yaml up --build --detach
