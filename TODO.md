# Pendências

## Criar uma galeria textual

Para ser usada como uma apresentação do site, no estilo do PAIC.
* Modelo sugerido:
    esquema Pai e relacionamento com Posts
        - title: { type: String, required: true, intl: true }
        - content: { type: Types.Html, wysiwyg: true, height: 150, intl: true }
        - categories: { type: Types.Relationship, ref: 'Category', many: true, required: true, initial: true }
* Template sugerida (semelhante à de Galleries, mas usando uma cor de fundo do tema ao invés de imagem):
```html
{{#gt data.esquema.length 0}}
    {{#each data.esquema}}
        <div class="container-out highlight">
            <div class="title title-section">
                <div class="title">
                    <h2>{{this.title}}</h2>
                </div>
                <div class="text">
                    <p>{{{this.content}}}</p>
                </div>
            </div>
            <div data-animate="slideInLeft">
                <div class="carousel-wrap">
                    <ul class="carousel-nav">
                        <li><a href="#" class="btn btn-icon-prev prev"></a></li>
                        <li><a href="#" class="btn btn-icon-next next"></a></li>
                    </ul>
                    <div class="projects carousel" data-visible="3">
                        
                        {{> esquemaTopic this language=../language}}
                        
                    </div>
                    <div class="carousel-pagi"></div>
                </div>
            </div>
        </div>
    {{/each}}
{{/gt}}
```
* O tópico também seria baseado em galleries, porém sem links, apenas textos extraídos de posts.
```html
{{#gt this.posts.length 0}}
    {{#each this.posts}}
        <article class="project project-default photography">
            <div class="project-heading">
                <div class="thumbnail">
                    <div class="title">
                        <h3>{{this.title}}</h3>
                    </div>
                    <div class="text">
                        <p>{{{this.content.brief}}}</p>
                    </div>
                </div>
            </div>
        </article>
    {{/each}}
{{/gt}}
```
* A consulta aos Posts deve ser idêntica à de galleries, praticamente mudando apenas o nome do esquema. Do mesmo modo que galleries, a lista de boas vindas (welcome) seria baseada em categorias!
```js
exports.welcome = async (language, callback) => {
    try {
        const activeWelcome = await capstone.list('Welcome').model.find({ active: true })
        const welcomeWithPosts = await Promise.all(
            activeWelcome.map(async (welcome) => {
                const categoryIds = welcome.categories
                const posts = await capstone.list('Post').model.find({
                    'categories': { $in: categoryIds },
                    'state': 'published'
                })
                .sort({ publishedDate: -1 })
                welcome.posts = posts
                return welcome
            })
        )

        callback(null, welcomeWithPosts)
    } catch (err) {
        callback(err)
    }
}
```


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
