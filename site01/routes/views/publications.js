require('app-module-path').addPath(__dirname + '/helpers')

const 
    partials = require('partials'),
    capstone = require('capstonejs'),
    setup = require('config')

module.exports = (req, res) => {
    const view = new capstone.View(req, res)

    res.locals.data = {
        menu: [],
        publications: [],
        version: capstone.version,
    }

    view.on('init', (next) => {
        partials.menu(res.locals.language, (err, result) => {
            res.locals.data.menu = result
            next(err)
        })
    })

    view.on('init', (next) => {
        partials.publications(res.locals.language, (err, result) => {
            res.locals.data.publications = result
            next(err)
        })
    })

    view.render('publications')
}