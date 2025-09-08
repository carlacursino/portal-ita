var
    capstone = require('capstonejs'),
    config = require('config'),
    translations = require('capstone-intl'),
    fileManager = require('capstone-file-manager'),
    Types = capstone.Field.Types,
    Profile = new capstone.List('Profile', {
        map: { name: 'name' },
        track: true,
        autokey: { path: 'slug', from: 'name.pt', unique: true },
        defaultSort: '-publishedDate',
    })

new fileManager(Profile).init()

Profile.add({
    name: { type: String, required: true, initial: true },
    title: { type: String, intl: true },
    institution: {
        description: { type: String, intl: true },
        site: { type: Types.Url },
    },
    picture: { type: Types.File },
    cv: { type: Types.Url, label: 'CV' },
    email: { type: Types.Email },
    scholar: { type: Types.Url, label: 'Google Scholar' },
    vcs: { type: Types.Url, label: 'Sources repository' },
    lattes: { type: Types.Url },
    orcid: { type: Types.Url },
    linkedin: { type: Types.Url },
    youtube: { type: Types.Url },
    curriculum: { type: Types.Markdown, height: 300, toolbarOptions: { hiddenButtons: 'H1,H6,Code' }, intl: true },
    interests: { type: Types.Markdown, height: 150, toolbarOptions: { hiddenButtons: 'H1,H6,Code' }, intl: true },
    education: { type: Types.Markdown, height: 150, toolbarOptions: { hiddenButtons: 'H1,H6,Code' }, intl: true },
})

Profile.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Profile.defaultColumns = 'name, title, institution.description'

Profile.register()
