const _ = require('lodash')

require('dotenv').config()

const 
    defaults = require('../config/default.js')
    env = process.env.NODE_ENV === undefined ? 'prod' : process.env.NODE_ENV
    access = require('../'.concat(defaults.cms['access rules']))
    validation = require('../'.concat(defaults.cms['validator rules']))
    editor = require('../'.concat(defaults.cms['editor rules']))
    headers = require('../'.concat(defaults.cms['headers rules']))
    smtp = {
        smtp: {
            user: process.env.SMTPUSR,
            password: process.env.SMTPPWD,
            server: process.env.SMTPSRV
        }
    }
    custom = require('../config/custom/'.concat(env).concat('.js'))
    config = _.merge({}, defaults, access, validation, editor, headers, smtp, custom)

config.env = env

console.info(`Reading configuration "${env}"`)

module.exports = config