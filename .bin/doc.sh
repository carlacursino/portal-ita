#!/usr/bin/env bash
set -euo pipefail

latexmk -xelatex -synctex=1 -interaction=nonstopmode -file-line-error -auxdir=.tmp -outdir=.pdf $*
