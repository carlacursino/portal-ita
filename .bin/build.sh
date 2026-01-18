#!/usr/bin/env bash
set -euo pipefail

find . -name "node_modules" -type d -prune -exec rm -rf {} + && \
rm -f package-lock.json && \
npm i --legacy-peer-deps && \
npm run build && \
npm prune --production --legacy-peer-deps && \
npm audit fix --omit=dev --legacy-peer-deps
