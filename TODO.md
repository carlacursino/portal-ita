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
* A dependência crítica restante demanda maior esforço - será abordada em próxima fase
* No momento eliminando problemas altos restantes

## Documentação

* 👩‍💻 - (em andamento) - Manual do Usuário
    * - Sliders - novos atributos e facilidades
    * - Embedings:
        * - AirTable
        * - Google Drive
    * - Projetos
    * - Equipe de Colaboradores
    * - Galerias de Posts
* 👩‍💻 - (em andamento) - Manual do Desenvolvedor
    * - Script de Setup
    * - Modo de Desenvolvimento
    * - Configuração IDE (VSCode)
        * - VM Linux e containers Docker
        * - VSCode e SSH
    * - Configuração NGINX
    * - Configuração MongoDB
* 👩‍💻 - (em andamento) - Todos Manuais
    * - Imagens de exemplos atualizadas
    * - Trechos de código atualizados

## Atualizar componentes

* Mongoose - componente de ORM para MongoDB
    * ✅ - Dependia do MongoDB que já foi atualizado
* TinyMCE - editor HTML
    * Não é prioridade - edição não é aberta

## Atualizar arquitetura

* ✅ - MongoDB - 5.0.32 - versão compatível, atualizada e ativamente mantida
* ✅ - NodeJS - 22.21.1 - versão estável, LTS
