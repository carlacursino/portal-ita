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
        defaultSort: 'name',
    })

new fileManager(Profile).init(capstone)

Profile.add({
    name: { type: String, required: true, initial: true },
    group: { type: Types.Select, options: 'professor, assessor, pesquisador, estudante, voluntário, alumni, organizacao', default: 'pesquisador', index: true, initial: true },
    institution: {
        description: { type: String, intl: true },
        site: { type: Types.Url },
        affiliation: { type: String, intl: true },
    },
    title: { type: String, intl: true },
    files: { type: Types.Url },
    email: { type: Types.Email, label: 'Public email' },
    picture: { type: Types.File },
    user: { type: Types.Relationship, ref: 'User', required: false },
    cv: { type: Types.Url, label: 'CV' },
    scholar: { type: Types.Url, label: 'Google Scholar' },
    vcs: { type: Types.Url, label: 'Sources repository' },
    lattes: { type: Types.Url },
    orcid: { type: Types.Url },
    linkedin: { type: Types.Url },
    instagram: { type: Types.Url },
    youtube: { type: Types.Url },
    curriculum: { type: Types.Html, wysiwyg: true, height: 400, intl: true },
    interests: { type: Types.Html, wysiwyg: true, height: 150, intl: true },
    education: { type: Types.Html, wysiwyg: true, height: 150, intl: true },
    active: { type: Types.Boolean, default: true },
})

Profile.schema.plugin(translations, { languages: config.cms['supported languages'], defaultLanguage: config.cms.language })

Profile.defaultColumns = 'name, title, institution.description, active'

Profile.register()
