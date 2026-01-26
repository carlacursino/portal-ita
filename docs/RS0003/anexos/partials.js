require('app-module-path').addPath(__dirname + '/helpers')

const _ = require('lodash')
config = require('config')
const capstone = require('capstonejs')

exports.menu = (language, callback) => {
    capstone.list('Menu').model.find({ main: true, enabled: true })
        .populate({
            path: 'items category post',
            populate: {
                path: 'items category post',
                populate: {
                    path: 'items category post',
                    populate: { path: 'post' },
                }
            }
        })
        .sort({ sequence: 1 })
        .exec()
        .then((result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                    record.items.forEach((item) => {
                        item.setLanguage(language)
                        item.items.forEach((subItem) => {
                            subItem.setLanguage(language)
                            subItem.items.forEach((subSubItem) => {
                                subSubItem.setLanguage(language)
                            })
                        })
                    })
                })
            callback(null, result)
        })
        .catch((err) => {
            callback(err)
        })
}

exports.posts = (query, language, callback) => {
    var filter = query
    if (config.cms.frontPageCategories)
        filter = _.merge(filter, config.cms.frontPageCategories)
    capstone.list('Post').model.find(filter)
        .limit(100)
        .sort({ publishedDate: -1 })
        .exec()
        .then((result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(null, result)
        })
        .catch((err) => {
            callback(err)
        })
}

exports.distinctPosts = (distinct, query, callback) => {
    capstone.list('Post').model.distinct(distinct, query)
        .exec()
        .then((result) => {
            callback(null, result)
        })
        .catch((err) => {
            callback(err)
        })
}

exports.post = (query, language, callback) => {
    capstone.list('Post').model.findOne(query)
        .sort({ publishedDate: -1 })
        .limit(1)
        .exec()
        .then((result) => {
            if (result)
                result.setLanguage(language)
            callback(null, result)
        })
        .catch((err) => {
            callback(err)
        })
}

exports.category = (query, language, callback) => {
    capstone.list('Category').model.findOne(query)
    .exec()
    .then((result) => {
        if (result)
            result.setLanguage(language)
        callback(null, result)
    })
    .catch((err) => {
        callback(err)
    })
}
