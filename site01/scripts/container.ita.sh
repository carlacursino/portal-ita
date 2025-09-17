#!/usr/bin/env bash
set -euo pipefail

docker stop portal || true
docker rm portal || true
docker rmi portal || true

rm assets/static || true
rm -rf node_modules || true

DOCKER_BUILDKIT=1 ECOSYSTEM=ita PORT=3001 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose-drone.yaml up --build --detach

ln -s drone assets/static
