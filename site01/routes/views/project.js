require('app-module-path').addPath(__dirname + '/helpers')

const
    partials = require('partials'),
    capstone = require('capstonejs')
    googleAPI = require('googleAPI')

module.exports = (req, res) => {
    const view = new capstone.View(req, res)

    res.locals.filters = req.params.project

    res.locals.data = {
        menu: [],
        acontece: [],
        destaque: [],
        contacts: [],
        project: {},
        publications: [],
        files: [],
        news: [],
        version: capstone.version,
    }

    view.on('init', (next) => {
        partials.menu(res.locals.language, (err, result) => {
            res.locals.data.menu = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.posts({ state: 'published', panel: 'acontece' }, res.locals.language, (err, result) => {
            res.locals.data.acontece = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.posts({ state: 'published', panel: 'destaque' }, res.locals.language, (err, result) => {
            res.locals.data.destaque = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.contacts({ active: true }, (err, result) => {
            res.locals.data.contacts = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.project({ _id: res.locals.filters }, res.locals.language, (err, result) => {
            if (err) return next(err)
            res.locals.data.project = result
            res.locals.data.news = result.researchers
                .filter(researcher => researcher.user && researcher.user.posts)
                .flatMap(researcher => researcher.user.posts)
            googleAPI.list(result.files)
                .then((files) => {
                    res.locals.data.files = files
                    next()
                })
                .catch((err) => {
                    next(err)
                })
        })
    })

    view.on('init', (next) => {
        partials.publications({ project: res.locals.filters }, res.locals.language, (err, result) => {
            res.locals.data.publications = result
            next(err)
        })
    })

    view.render('project')
}
