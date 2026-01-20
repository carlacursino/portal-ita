#!/usr/bin/env bash
set -euo pipefail

function low() {
    echo "👉 Audit **LOW**"
    (npm audit --severity=low --json --legacy-peer-deps || true) | jq '.vulnerabilities[] | select(.severity == "low") | select(.fixAvailable | type == "object")' > .audit.low.json
}

function moderate() {
    echo "👆 Audit **MODERATE**"
    (npm audit --severity=moderate --json --legacy-peer-deps || true) | jq '.vulnerabilities[] | select(.severity == "moderate") | select(.fixAvailable | type == "object")' > .audit.moderate.json
}

function high() {
    echo "🧨 Audit **HIGH**"
    (npm audit --severity=high --json --legacy-peer-deps || true) | jq '.vulnerabilities[] | select(.severity == "high") | select(.fixAvailable | type == "object")' > .audit.high.json
}

function critical() {
    echo "💣 Audit **CRITICAL**"
    (npm audit --severity=critical --json --legacy-peer-deps || true) | jq '.vulnerabilities[] | select(.severity == "critical") | select(.fixAvailable | type == "object")' > .audit.critical.json
}

if [[ "$*" == "--low" ]]; then
    low
    exit 0
fi

if [[ "$*" == "--moderate" ]]; then
    moderate
    exit 0
fi

if [[ "$*" == "--high" ]]; then
    high
    exit 0
fi

if [[ "$*" == "--critical" ]]; then
    critical
    exit 0
fi

if [[ "$*" == "--all" ]]; then
    echo "🌐 Audit **ALLLOW**"
    low
    moderate
    high
    critical
    exit 0
fi

echo " Invalid option `$*`"
exit 1
