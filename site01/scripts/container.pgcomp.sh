#!/usr/bin/env bash
set -euo pipefail

docker stop pgcomp || true
docker rm pgcomp || true
docker rmi pgcomp || true

rm assets/static
rm -rf node_modules

DOCKER_BUILDKIT=1 ECOSYSTEM=pgcomp PORT=3004 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose-drone.yaml up --build --detach

ln -s drone assets/static
