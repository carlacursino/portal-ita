require('dotenv').config()

const
    config = require('config')
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

const translate = async (text, target = 'en', source = 'pt', format = 'html') => {
    if (!text) return null
    if (!config.cms.translator) return null

    try {
        const response = await fetch(config.cms.translator, {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                source: source,
                target: target,
                format: format,
                api_key: ""
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Erro na API (${response.status}):`, errorBody);
            return null;
        }
        const data = await response.json();
        return data.translatedText;
    }
    catch (e) {
        console.error("Falha na conexão com LibreTranslate:", e);
        return null;
    }
}

module.exports = { pt, en, translate }
