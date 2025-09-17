#!/usr/bin/env bash
set -euo pipefail

docker stop ceds || true
docker rm ceds || true
docker rmi ceds || true

rm assets/static
rm -rf node_modules

DOCKER_BUILDKIT=1 ECOSYSTEM=ceds PORT=3002 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose-drone.yaml up --build --detach

ln -s drone assets/static
