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

new fileManager(Publication).init(capstone)

Publication.add({
    title: { type: String, required: true, intl: true },
    authors: { type: Types.Relationship, ref: 'Profile', many: true },
    abstract: { type: Types.Html, wysiwyg: true, height: 300, intl: true },
    project: { type: Types.Relationship, ref: 'Project', many: false },
    publishedDate: { type: Types.Date, index: true },
    publisher: { type: String },
    cite: { type: Types.Textarea, height: 300 },
    doi: { type: Types.Url, label: 'DOI' },
    link: { type: Types.Url },
    dataset: { type: Types.Url },
    video: { type: Types.Url },
    file: { type: Types.File },
    post: { type: Types.Relationship, required: false, ref: 'Post', many: false },
})

Publication.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Publication.defaultColumns = 'title, authors, project, publishedDate'

Publication.register()
