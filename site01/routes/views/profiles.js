require('app-module-path').addPath(__dirname + '/helpers')

const 
    partials = require('partials'),
    capstone = require('capstonejs')

module.exports = (req, res) => {
    const view = new capstone.View(req, res)

    res.locals.filters = { post: req.params.profile }

    res.locals.data = {
        menu: [],
        acontece: [],
        destaque: [],
        contacts: [],
        teachers: [],
        assessors: [],
        researchers: [],
        students: [],
        volunteers: [],
        alumni: [],
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
        partials.profiles({ active: true, group: 'professor' }, res.locals.language, (err, result) => {
            res.locals.data.teachers = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.profiles({ active: true, group: 'assessor' }, res.locals.language, (err, result) => {
            res.locals.data.assessors = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.profiles({ active: true, group: 'pesquisador' }, res.locals.language, (err, result) => {
            res.locals.data.researchers = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.profiles({ active: true, group: 'estudante' }, res.locals.language, (err, result) => {
            res.locals.data.students = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.profiles({ active: true, group: 'voluntário' }, res.locals.language, (err, result) => {
            res.locals.data.volunteers = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.profiles({ active: true, group: 'alumni' }, res.locals.language, (err, result) => {
            res.locals.data.alumni = result
            next(err)
        })
    })

    view.render('profiles')
}
