var
    capstone = require('capstonejs'),
    translations = require('capstone-intl'),
    Types = capstone.Field.Types,
    Contact = new capstone.List('Contact', {
        map: { name: 'name' },
        track: true,
        autokey: { path: 'slug', from: 'name.pt', unique: true },
        defaultSort: 'name',
    })

Contact.add({
    name: { type: String, required: true, initial: true },
    phone: { type: String, required: true, initial: true },
    room: { type: String, required: true, initial: true },
    profile: { type: Types.Relationship, ref: 'Profile', required: false },
    active: { type: Types.Boolean, default: true },
})

Contact.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Contact.defaultColumns = 'name, phone, room, active'

Contact.register()
