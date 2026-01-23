#!/usr/bin/env bash
set -euo pipefail

latexmk -r ../.latexmkrc -xelatex -synctex=1 -interaction=nonstopmode -file-line-error $*
rm -rf *.aux *.bbl *.bcf *.blg *.idx *.ind *.lof *.lot *.out *.toc *.acn *.acr *.alg *.glg *.glo *.gls *.ist *.fls *.log *.fdb_latexmk *.snm *.nav *.vrb *.synctex.gz *.glhidden *.glhiddenin *.mw *.run.xml *.xdv
