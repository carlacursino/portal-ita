var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    Types = capstone.Field.Types,
    Slider = new capstone.List('Slider', {
        track: true,
        defaultSort: 'sequence',
    })

Slider.add({
    sequence: { type: Types.Number, required: true, default: 0 },
    post: { type: Types.Relationship, required: true, initial: true, ref: 'Post', many: false },
    subTitle: { type: String, intl: true },
    subTitleAlignment: { type: Types.Select, options: 'left, center, right', default: 'center' },
})

Slider.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Slider.defaultColumns = 'sequence, post, subTitle, subTitleAlignment'

Slider.register()