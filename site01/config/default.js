require('app-module-path').addPath(__dirname + '/helpers')

const 
    fs = require('fs'),
    engine = require('express-handlebars'),
    handlebarsHelpers = require('handlebars-helpers')(),
    templateHelpers = require('template-helpers')(),
    helperMoment = require('helper-moment'),
    log = require('logger'),
    UPLOADS = './assets/static/core/uploads'


if(fs.existsSync('views/layouts/' + process.env.NODE_ENV + '.handlebars'))
    layout = 'views/layouts/' + process.env.NODE_ENV + '.handlebars'
else
    layout = 'views/layouts/default.handlebars'

module.exports = {
    storage: {
        uploads: UPLOADS,
    },
    cms: {
        'name': 'Portal ITA',
        'brand': 'ITA',
        'favicon': 'assets/static/favicon.ico',
        'static': 'assets',
        'compress': true,

        'auto update': true,
        'user model': 'User',
        'default role': ['admin'],
        'default model user id': 'displayName',
        'default model role id': 'role',

        'session': true,
        'session store': 'mongo',
        'auth': true,
        'signin logo': '/static/images/logo-ita.png',

        'applog': log.applog,
        'seclog': log.seclog,

        'logging middleware': log.midlog,

        'admin path': 'admin',

        'kfm public url': '/static/core/uploads/',
        'kfm uploaded files storage': UPLOADS,

        'supported languages': ['pt', 'en'],
        'language': 'pt',

        'cors allow methods': false,
        'cors allow headers': false,

        'views': 'views',

        'custom engine': engine({
            helpers: [
                handlebarsHelpers,
                templateHelpers,
                helperMoment,
            ],
            layoutsDir: 'views/layouts',
            partialsDir: 'views/partials',
            defaultLayout: layout,
        }),
        'view engine': 'handlebars',

        'validator rules': 'config/validator.js',
        'access rules': 'config/rules.js',
        'headers rules': 'config/headers.js',
        'editor rules': 'config/editor.js',

        'trust proxy': true,
    },
    portal: {
        color: 'dark',

        initiatives: [
            'iniciativas-tecnicas',
            'iniciativas-sociais',
        ],

        home: 'http://www.ita.br',
    },
    models: './models',
    routes: './routes',
}
