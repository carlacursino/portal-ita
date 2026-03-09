# Para registrar um site como HTTPS devemos:

Modificar arquivo `.env`. As configurações:

```ini
  .  .  .
DOMAIN="ecosystem.ita.br www.ecosystem.ita.br"
HTTP=portal
  .  .  .
```

Onde `ecosystem` deve corresponder ao nome da configuração de domínio que deverá ser usada em produção.

> *Obs*.: A configuração `HTTP=portal` é a configuração padrão. Durante o desenvolvimento usa-se `HTTP=demo`, mas é possível termos uma configuração particular para um determinando `ecosystem`, assim podemos ter por exemplo `HTTP=ecosystem`.

* Executar o _script_ [setup.sh](/site01/scripts/setup.sh) sem parâmetros - isto irá encerrar todos os serviços da aplicação
* Executar o _script_ [register.sh](/site01/scripts/register.sh)
* Executar o _script_ [setup.sh](/site01/scripts/setup.sh) com parâmetro `--prod` - isto irá colocar a aplicação em modo de produção
