require('app-module-path').addPath(__dirname + '/helpers')

const translate = require('translations').translate

const config = require('config')
const capstone = require('capstonejs')

async function preTranslation(result) {
    var translated = false
    for (const pathName of Object.keys(result.schema.paths)) {
        if (pathName.endsWith('.pt')) {
            const originalText = result.get(pathName)
            const translationPath = pathName.slice(0, -3) + ".en"
            var translatedText = result.get(translationPath)
            if (originalText && !translatedText) {
                fieldType = 'html'
                translatedText = await translate(originalText)
                translated = true
                console.log(originalText, ' -> ',translatedText)
                result.set(translationPath, translatedText)
            }
        }
    }
    if (translated)
        result.save()
}

exports.menu = (language, callback) => {
    capstone.list('Menu').model.find({ main: true, enabled: true })
        .populate('category post')
        .populate({
            path: 'items',
            populate: [
                { path: 'category' },
                { path: 'post' },
                {
                    path: 'items',
                    populate: [
                        { path: 'category' },
                        { path: 'post' },
                        { path: 'items', populate: { path: 'post' } }
                    ]
                }
            ]
        })
        .sort({ sequence: 1 })
        .exec((err, result) => {
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
            callback(err, result)
        })
}

exports.initiatives = (category, language, callback) => {
    capstone.list('Menu').model.find({ main: false, enabled: true, category: category._id })
        .exec((err, result) => {
            if (result !== null)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.profiles = (query, language, callback) => {
    capstone.list('Profile').model.find(query)
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.profile = (query, language, callback) => {
    capstone.list('Profile').model.findOne(query)
        .limit(1)
        .populate('user')
        .exec(async (err, result) => {
            if (result) {
                result.setLanguage(language)
                await preTranslation(result)
            }
            callback(err, result)
        })
}

exports.contacts = (query, callback) => {
    capstone.list('Contact').model.find(query)
        .populate('profile')
        .exec((err, result) => {
            callback(err, result)
        })
}

exports.publications = (query, language, callback) => {
    capstone.list('Publication').model.find(query)
        .populate('authors')
        .sort({publishedDate: -1})
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.publication = (query, language, callback) => {
    capstone.list('Publication').model.findOne(query)
        .limit(1)
        .populate('authors')
        .populate('project')
        .populate('post')
        .exec((err, result) => {
            if (result)
                result.setLanguage(language)
            callback(err, result)
        })
}

exports.projects = (query, language, callback) => {
    capstone.list('Project').model.find(query)
        .limit(100)
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.project = (query, language, callback) => {
    capstone.list('Project').model.findOne(query)
        .limit(1)
        .populate({
            path: 'researchers',
            populate: {
                path: 'user',
                populate: {
                    path: 'posts',
                    model: 'Post',
                    match: { state: 'published' }
                }
            }
        })
        .exec((err, result) => {
            if (result)
                result.setLanguage(language)
            callback(err, result)
        })
}

exports.posts = (query, language, callback) => {
    var filter = query
    if (!filter)
        filter = config.cms.frontPageCategories
    capstone.list('Post').model.find(filter)
        .limit(100)
        .sort({ publishedDate: -1 })
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.distinctPosts = (distinct, query, callback) => {
    capstone.list('Post').model.distinct(distinct, query)
        .exec((err, result) => {
            callback(err, result)
        })
}

exports.post = (query, language, callback) => {
    capstone.list('Post').model.findOne(query)
        .sort({ publishedDate: -1 })
        .limit(1)
        .exec((err, result) => {
            if (result)
                result.setLanguage(language)
            callback(err, result)
        })
}

exports.category = (query, language, callback) => {
    capstone.list('Category').model.findOne(query)
        .exec((err, result) => {
            if (result)
                result.setLanguage(language)
            callback(err, result)
        })
}

exports.categories = (query, language, callback) => {
    capstone.list('Category').model.find(query)
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.archives = (filter, language, callback) => {
    capstone.list('Archive').model.find({ enabled: true, categories: { $in: filter } })
        .populate({
            path: 'categories createdBy '
        })
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.testimonials = (language, callback) => {
    capstone.list('Testimonial').model.find()
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.slider = (language, callback) => {
    capstone.list('Slider').model.find({ active: true })
        .populate({ path: 'post' })
        .sort({ sequence: 1 })
        .exec((err, result) => {
            if (result)
                result.forEach((record) => {
                    record.setLanguage(language)
                    if (result.post) {
                        record.post.setLanguage(language)
                    }
                })
            callback(err, result)
        })
}

exports.spotlight = (language, callback) => {
    capstone.list('Spotlight').model.findOne()
        .sort({ updatedAt: -1 })
        .limit(1)
        .exec((err, result) => {
            if (result)
                result.setLanguage(language)
            callback(err, result)
        })
}

exports.galleries = async (language, callback) => {
    try {
        const activeGalleries = await capstone.list('Gallery').model.find({ active: true })
        const galleriesWithPosts = await Promise.all(
            activeGalleries.map(async (gallery) => {
                const categoryIds = gallery.categories
                const posts = await capstone.list('Post').model.find({
                    'categories': { $in: categoryIds },
                    'state': 'published'
                })
                .sort({ publishedDate: -1 })
                gallery.posts = posts
                return gallery
            })
        )
        callback(null, galleriesWithPosts)
    } catch (err) {
        callback(err)
    }
}
