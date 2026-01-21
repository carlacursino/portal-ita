# Pendências

## Remover código legado

* Remover dependências externas em desuso:
    * ✅ - Cloudinary
    * ✅ - AWS/S3
    * ✅ - Azure Storage
* Reduzir problemas apontados no audit:
    * ✅ - (* dez-2025 *) - 165 vulnerabilities ( 4 low, 53 moderate, 66 high, 42 critical)
    * 👩‍💻 - (em andamento) -  14 vulnerabilities ( 4 low,  1 moderate,  8 high,  1 critical)

Obs.: 
* A dependência crítica restante irá demandar maior esforço de migração e será abordada numa próxima fase
* Estamos no momento eliminando os problemas críticos restantes

## Atualizar componentes

* Mongoose - componente de ORM para MongoDB
* TinyMCE - editor HTML (não é prioridade pois a facilidade de edição não é aberta e está limitada a comandos HTML básicos)

## Atualizar arquitetura

* ✅ - MongoDB - 5.0.32 - versão ativamente mantida
* ✅ - NodeJS - 22.21.1 - versão estável, LTS
