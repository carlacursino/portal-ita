require('dotenv').config()

const
    fs = require('fs')
    _ = require('lodash')

const
    env = process.env.NODE_ENV === undefined ? 'prod' : process.env.NODE_ENV
    pt_custom = (fs.existsSync('../translations/'.concat(env).concat('/').concat('pt.js'))) ? require('../translations/'.concat(env).concat('/').concat('pt.js')) : {}
    pt_common = require('../translations/pt.js')
    pt = _.merge({}, pt_common, pt_custom)
    en_custom = (fs.existsSync('../translations/'.concat(env).concat('/').concat('en.js'))) ? require('../translations/'.concat(env).concat('/').concat('en.js')) : {}
    en_common = require('../translations/en.js')
    en = _.merge({}, en_common, en_custom)

module.exports = { pt, en }
