var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    fileManager = require('capstone-file-manager'),
    Types = capstone.Field.Types,
    Slider = new capstone.List('Slider', {
        track: true,
        defaultSort: 'sequence',
    })

new fileManager(Slider).init()

Slider.add({
    sequence: { type: Types.Number, required: true, default: 0 },
    post: { type: Types.Relationship, required: false, initial: false, ref: 'Post', many: false },
    subTitle: { type: String, intl: true },
    subTitleAlignment: { type: Types.Select, options: 'left, center, right', default: 'center' },
    route: { type: String },
    link: { type: Types.Url },
    image: { type: Types.File },
})

Slider.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Slider.defaultColumns = 'sequence, post, subTitle, subTitleAlignment'

Slider.register()