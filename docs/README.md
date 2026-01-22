# Documentação do portal de sites institucionais do ITA

## Instalação do `LaTeX`

Recomendamos instalar o `LaTeX` num computador *Linux* para manter a atualizar esta documentação. Utilizamos uma distribuição *Debian*. Adapte para a sua distribuição.

```sh
sudo apt update
sudo apt upgrade -y
sudo apt install -y texlive-latex-recommended texlive-bibtex-extra texlive-xetex latexmk texlive-lang-portuguese texlive-science
```

## Copiar `classes` e `estilos`

Na pasta do projeto (i.e. `portal`):

```sh
mkdir `kpsewhich -var-value=TEXMFHOME`
cp docs/_common/*.cls `kpsewhich -var-value=TEXMFHOME`/
cp docs/_common/*.sty `kpsewhich -var-value=TEXMFHOME`/
ls -la `kpsewhich -var-value=TEXMFHOME`
```

## Gerar a documentação.

Cada pasta contém um manual:

|#|Pasta|Manual|
|---|---|---|
|*|[RS0000](./RS0000)| Arquitetura |
|1|[RS0001](./RS0001)| Elementos Visuais |
|2|[RS0002](./RS0002)| Guia de Cores |
|3|[RS0003](./RS0003)| Guia do Desenvolvedor |
|4|[RS0004](./RS0004)| Guia do Operador |
|5|[RS0005](./RS0005)| Controle de Acesso |
|6|[RS0006](./RS0006)| Guia do Editor de Conteúdo |
---
