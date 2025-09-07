var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    fileManager = require('capstone-file-manager'),
    Types = capstone.Field.Types,
    Profile = new capstone.List('Profile', {
        map: { name: 'title' },
        track: true,
        autokey: { path: 'slug', from: 'name.pt', unique: true },
        defaultSort: '-publishedDate',
    })

new fileManager(Profile).init()

Profile.add({
    name: { type: String, required: true },
    name: { type: String, required: true },
    institution: {
        description: { type: String, required: true, intl: true },
        site: { type: String, required: true, intl: true },
    },
    picture: { type: Types.File },
    curriculum: { type: Types.Markdown, toolbarOptions: { hiddenButtons: 'H1,H6,Indent,Code' } },
    interests: { type: String, multiple: true, intl: true },
    education: { type: String, multiple: true, intl: true },
})

Profile.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Profile.defaultColumns = 'name'

Profile.register()
