var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    fileManager = require('capstone-file-manager'),
    Types = capstone.Field.Types,
    Publication = new capstone.List('Publication', {
        map: { name: 'title' },
        track: true,
        autokey: { path: 'slug', from: 'title.pt', unique: true },
        defaultSort: '-publishedDate',
    })

new fileManager(Publication).init()

Publication.add({
    title: { type: String, required: true, intl: true },
    authors: { type: Types.Relationship, ref: 'Profile', many: true },
    abstract: { type: Types.Html, wysiwyg: true, height: 150, intl: true },
    project: { type: Types.Relationship, ref: 'Post', many: false },
    publisher: { type: String },
    cite: { type: Types.Markdown, height: 150, toolbarOptions: { hiddenButtons: 'H1,H6,Code' } },
    doi: { type: Types.Url, label: 'DOI' },
    link: { type: Types.Url },
    dataset: { type: Types.Url },
    video: { type: Types.Url },
    file: { type: Types.File },
})

Publication.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Publication.defaultColumns = 'title'

Publication.register()
