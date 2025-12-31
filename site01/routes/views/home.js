require('app-module-path').addPath(__dirname + '/helpers')

const 
    partials = require('partials'),
    capstone = require('capstonejs'),
    setup = require('config')

module.exports = (req, res) => {
    const view = new capstone.View(req, res)

    res.locals.data = {
        today: new Date(),
        testimonials: [],
        sliders: [],
        spotlight: {},
        acontece: [],
        destaque: [],
        contacts: [],
        initiatives: [],
        galleries: [],
        menu: [],
        version: capstone.version,
    }

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.menu(res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.menu = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.posts({ state: 'published', panel: 'acontece' }, res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.acontece = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.posts({ state: 'published', panel: 'destaque' }, res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.destaque = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.contacts({ active: true }, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.contacts = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.categories({ $or: [{ slug: setup.portal.initiatives[0] }, { slug: setup.portal.initiatives[1] }] }, res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            const tasks = []
            result.forEach((record) => {
                tasks.push(new Promise((resolve) => {
                    partials.initiatives(record, res.locals.language, (err, result) => {
                        if (!err && result) res.locals.data.initiatives = result.concat(res.locals.data.initiatives)
                        resolve()
                    })
                }))
            })
            return Promise.all(tasks)
        }).then(() => next()).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.testimonials(res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.testimonials = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.slider(res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.sliders = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.spotlight(res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.spotlight = result
            next()
        }).catch((err) => next(err))
    })

    view.on('init', (next) => {
        new Promise((resolve, reject) => {
            partials.galleries(res.locals.language, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        }).then((result) => {
            res.locals.data.galleries = result
            next()
        }).catch((err) => next(err))
    })

    view.render(setup.portal['view home'])
}