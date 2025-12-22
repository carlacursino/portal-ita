require('app-module-path').addPath(__dirname + '/helpers')

const 
    fs = require('fs'),
    Handlebars = require('handlebars'),
    engine = require('express-handlebars'),
    {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access'),
    handlebarsHelpers = require('handlebars-helpers')({
        handlebars: Handlebars
    }),
    helperMoment = require('helper-moment'),
    helpersList = Object.assign(
        {},
        handlebarsHelpers,
        { moment: helperMoment }
    ),
    log = require('logger'),
    UPLOADS = './assets/static/core/uploads',
    customLayout = 'views/layouts/' + process.env.NODE_ENV + '.handlebars'

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
        'default role': 'admin',
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
            handlebars: allowInsecurePrototypeAccess(Handlebars),
            helpers: helpersList,
            layoutsDir: 'views/layouts',
            partialsDir: 'views/partials',
            defaultLayout: fs.existsSync(customLayout) ? process.env.NODE_ENV + '.handlebars' : 'default.handlebars',
        }),
        'view engine': 'handlebars',

        'validator rules': 'config/validator.js',
        'access rules': 'config/rules.js',
        'headers rules': 'config/headers.js',
        'editor rules': 'config/editor.js',

        'trust proxy': true,
    },
    portal: {
        name: 'ITA',
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
