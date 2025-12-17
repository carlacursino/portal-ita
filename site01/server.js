#!/usr/bin/env node

require('app-module-path').addPath(__dirname + '/helpers')

const
    express = require('express'),
    appRoot = require('app-root-path'),
    path = require('path'),
    config = require('config'),
    expressWinston = require('express-winston'),
    applog = require('logger').applog,
    errlog = require('logger').errlog,
    capstone = require('capstonejs'),
    app = capstone.express()

process.on('SIGINT', function() {
    console.info('Server stop')
    process.exit()
})

console.info('Server setup')

capstone.init(config.cms)

app
    .set('trust proxy', true)
    .use(expressWinston.errorLogger({
        winstonInstance: errlog,
    }))

capstone.import(config.models)
capstone.set('nav', { users: ['users'] })
capstone.set('routes', require(path.join(__dirname, config.routes)))

warningMessages = [
    { code: 400, message: 'Requisição inválida!' },
    { code: 403, message: 'Acesso proibido!' },
    { code: 404, message: 'Página não encontrada!' },
    { code: 405, message: 'Método não permitido!' },
    { code: 408, message: 'Tempo de resposta excedido!' },
]

warningMessages.forEach(w => {
    capstone.set(w.code, (req, res) => {
        errlog.error(`Error ${w.code} - ${w.message}`)
        res.status(w.code)
        res.render('error.handlebars', { message: w.message })
    })
})

errorMessages = [
    { code: 500, message: 'Erro interno do servidor!' },
    { code: 502, message: 'Erro intermediando resposta da aplicação!' },
    { code: 503, message: 'Serviço indisponível!' },
    { code: 504, message: 'Tempo de espera da resposta da aplicação excedido!' },
]

errorMessages.forEach(e => {
    capstone.set(e.code, (error, req, res) => {
        errlog.error(`Error ${e.code} - ${e.message}`)
        res.status(e.code)
        res.render('error.handlebars', { title: e.message, error: error })
    })
})

capstone.start()


msg = `Server started, port: ${config.cms.port}, path: ${appRoot.path}, config: ${config.env}`
applog.info(msg)
console.info(msg)
