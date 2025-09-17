#!/usr/bin/env bash
set -euo pipefail

docker stop drone || true
docker rm drone || true
docker rmi drone || true

rm assets/static || true
rm -rf node_modules || true

DOCKER_BUILDKIT=1 ECOSYSTEM=drone PORT=3003 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose-drone.yaml up --build --detach

ln -s drone assets/static
