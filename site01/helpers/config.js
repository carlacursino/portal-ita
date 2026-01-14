const _ = require('lodash')

require('dotenv').config()

const 
    defaults = require('../config/default.js')
    env = process.env.NODE_ENV === undefined ? 'local' : process.env.NODE_ENV
    access = require('../'.concat(defaults.cms['access rules']))
    validation = require('../'.concat(defaults.cms['validator rules']))
    editor = require('../'.concat(defaults.cms['editor rules']))
    headers = require('../'.concat(defaults.cms['headers rules']))
    smtp = {
        smtp: {
            user: process.env.SMTPUSR,
            password: process.env.SMTPPWD,
            server: process.env.SMTPSRV,
            port: process.env.SMTPPRT
        }
    }
    custom = require('../custom/'.concat(env).concat('.js'))
    config = _.merge({}, defaults, access, validation, editor, headers, smtp, custom)

config.env = env

module.exports = config

console.info(`Configuration "${env}" loaded`)
