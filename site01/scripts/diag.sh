#!/bin/bash

npm audit --json > upgrade/security-audit-$(date +%Y%m%d).json
npm outdated --json > upgrade/outdated-packages-$(date +%Y%m%d).json
npm ls --depth=0 > upgrade/dependency-tree-$(date +%Y%m%d).txt

npx depcheck > upgrade/unused-dependencies-$(date +%Y%m%d).txt

npm audit --audit-level=critical > upgrade/security-audit-critical-$(date +%Y%m%d).txt

