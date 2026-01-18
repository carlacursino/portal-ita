#!/usr/bin/env bash
set -euo pipefail

if [[ "$*" != *"--low"* ]]; then
    npm audit --severity=low --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "low") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" != *"--moderate"* ]]; then
    npm audit --severity=moderate --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "moderate") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" != *"--high"* ]]; then
    npm audit --severity=high --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "high") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" != *"--critical"* ]]; then
    npm audit --severity=critical --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "critical") | select(.fixAvailable | type == "object")' > audit.json
fi
