#!/usr/bin/env bash
set -euo pipefail

if [[ "$*" == "--low" ]]; then
    echo "Audit **LOW**"
    npm audit --severity=low --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "low") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" == "--moderate" ]]; then
    echo "Audit **MODERATE**"
    npm audit --severity=moderate --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "moderate") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" == "--high" ]]; then
    echo "Audit **HIGH**"
    npm audit --severity=high --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "high") | select(.fixAvailable | type == "object")' > audit.json
fi

if [[ "$*" == "--critical" ]]; then
    echo "Audit **CRITICAL**"
    npm audit --severity=critical --json --legacy-peer-deps | jq '.vulnerabilities[] | select(.severity == "critical") | select(.fixAvailable | type == "object")' > audit.json
fi
