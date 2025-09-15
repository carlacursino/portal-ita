var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    Types = capstone.Field.Types,
    Project = new capstone.List('Project', {
        map: { name: 'name' },
        track: true,
        autokey: { path: 'slug', from: 'name.pt', unique: true },
        defaultSort: 'name',
    })

Project.add({
    name: { type: String, required: true, initial: true, intl: true },
    description: { type: Types.Html, wysiwyg: true, height: 300, intl: true },
    researchers: { type: Types.Relationship, ref: 'Profile', many: true },
    post: { type: Types.Relationship, required: false, ref: 'Post', many: false },
})

Project.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Project.defaultColumns = 'name'

Project.register()
