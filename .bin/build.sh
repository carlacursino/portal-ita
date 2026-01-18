#!/usr/bin/env bash
set -euo pipefail

find . -name "node_modules" -type d -prune -exec rm -rf {} + && rm -f package-lock.json && npm i --legacy-peer-deps && npm run build && npm audit fix --legacy-peer-deps
