var
    capstone = require('capstonejs'),
    config = require('config')
    translations = require('capstone-intl'),
    Types = capstone.Field.Types,
    Gallery = new capstone.List('Gallery', {
        map: { name: 'title' },
        track: true,
        autokey: { path: 'slug', from: 'title.pt', unique: true },
        defaultSort: 'sequence',
    })

Gallery.add({
    title: { type: String, required: true, intl: true },
    sequence: { type: Types.Number, required: true, default: 0 },
    categories: { type: Types.Relationship, ref: 'Category', many: true, required: true, initial: true },
    light: { type: Types.Boolean, default: true },
    icon: { type: String, required: true, default: 'newspaper' },
    active: { type: Types.Boolean, default: true },
})

Gallery.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Gallery.defaultColumns = 'title, sequence, light, icon'

Gallery.register()