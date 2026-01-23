# Documentação do portal de sites institucionais do ITA

## Instalação do `LaTeX`

Recomendamos instalar o `LaTeX` num computador *Linux* para manter a atualizar esta documentação. Utilizamos uma distribuição *Debian*. Adapte para a sua distribuição.

```sh
sudo apt update
sudo apt upgrade -y
sudo apt install -y texlive-latex-recommended texlive-bibtex-extra biber texlive-xetex latexmk texlive-lang-portuguese texlive-science
```

## Copiar `classes` e `estilos`

Na pasta do projeto (i.e. `portal`):

```sh
mkdir -p `kpsewhich -var-value=TEXMFHOME`/tex/latex
cp docs/_common/*.cls `kpsewhich -var-value=TEXMFHOME`/tex/latex
cp docs/_common/*.sty `kpsewhich -var-value=TEXMFHOME`/tex/latex
cp docs/_common/*.bbx `kpsewhich -var-value=TEXMFHOME`/tex/latex
cp docs/_common/*.cbx `kpsewhich -var-value=TEXMFHOME`/tex/latex
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

O seguinte arquivo [`.latexmkrc`], utilizando conjuntamente com a ferramente *Latexmk*, compila os documentos do projeto:

```perl
@default_files = ('_relatorio.tex');
$pdf_mode = 1;
$pdflatex = 'xelatex --shell-escape %O %S';
$clean_ext = 'acn bcf bbl dvi frm glg glo gls ist loa lol mw run.xml xwm glhidden glhiddenin acr alg bbl synctex.gz';
add_cus_dep('glo', 'gls', 0, 'makeglo2gls');
add_cus_dep('acn', 'acr', 0, 'makeacn2acr');
sub makeglo2gls {
    if ( $silent ) {
        system("makeindex -q -s '$_[0].ist' -t '$_[0].glg' -o '$_[0].gls' '$_[0].glo'");
    }
    else {
        system("makeindex -s '$_[0].ist' -t '$_[0].glg' -o '$_[0].gls' '$_[0].glo'");
    }
}
sub makeacn2acr {
  if ( $silent ) {
    system("makeglossaries -q '$_[0]'");
  }
  else {
    system("makeglossaries '$_[0]'");
  };
}
```

O comando `latexmk` irá gerar qualquer um dos documentos desejado:

```sh
cd <PASTA DO DOCUMENTO RS...>
latexmk -r ../.latexmkrc -xelatex -synctex=1 -interaction=nonstopmode -file-line-error <NOME DO DOCUMENTO RS...>
```
