var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    Types = capstone.Field.Types,
    Project = new capstone.List('Profile', {
        map: { name: 'name' },
        track: true,
        autokey: { path: 'slug', from: 'name.pt', unique: true },
        defaultSort: '-publishedDate',
    })

Project.add({
    name: { type: String, required: true, initial: true, intl: true },
    description: { type: Types.Markdown, height: 150, toolbarOptions: { hiddenButtons: 'H1,H6,Code' }, intl: true },
})

Project.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Project.defaultColumns = 'name'

Project.register()
