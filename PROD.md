# Executando a aplicação em modo de **Produção**

Para executar a aplicação em modo de produção, assim que o servidor DNS do ITA for configurado para o endereço IP do servidor onde reside a aplicação, devemos modificar a chave `HTTP` no arquivo `.env` na raiz do projeto no servidor para `HTTP=portal`. Em seguida verifique a chave `DOMAIN` no mesmo arquivo e valide os domínios que deverão ser registrados (por exemplo: `DOMAIN="lab.ita.br www.lab.ita.br"`)

Prossiga executando o script [register.sh](/site01/scripts/register.sh). Isso irá gerar certificados para o domínio  (chave `DOMAIN` no arquivo `.env`) na [Let's Encrypt](https://letsencrypt.org/).

Finalmente execute o script [setup.sh](/site01/scripts/setup.sh) com o parâmetro `--prod`, o que colocará o Nginx em modo de produção apontando para os certificados gerados pelo passo anterior e ativará o serviço Certbot da [Let's Encrypt](https://letsencrypt.org/) para renovação automática do certificado.
