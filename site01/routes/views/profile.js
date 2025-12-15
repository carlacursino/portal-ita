require('app-module-path').addPath(__dirname + '/helpers')

const 
    partials = require('partials'),
    capstone = require('capstonejs')
    gdrive = require('gdrive')

module.exports = (req, res) => {
    const view = new capstone.View(req, res)

    res.locals.filters = { _id: req.params.profile }

    res.locals.data = {
        menu: [],
        acontece: [],
        destaque: [],
        profile: {},
        projects: [],
        publications: [],
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
        partials.profile({ _id: res.locals.filters._id }, res.locals.language, (err, result) => {
            res.locals.data.profile = result
            gdrive.list(result.files)
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
        partials.projects({ researchers: res.locals.filters._id }, res.locals.language, (err, result) => {
            res.locals.data.projects = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.publications({ authors: res.locals.filters._id }, res.locals.language, (err, result) => {
            res.locals.data.publications = result
            next(err)
        })
    })

    view.on('init', (next) => {
        if(res.locals.data.profile.user) {
            partials.posts({ state: 'published', author: res.locals.data.profile.user._id }, res.locals.language, (err, result) => {
                res.locals.data.news = result
                next(err)
            })
        }
        else
            next()
    })


    view.render('profile')
}
