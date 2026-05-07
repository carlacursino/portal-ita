require('app-module-path').addPath(__dirname + '/helpers')

const translate = require('translations').translate

const config = require('config')
const capstone = require('capstonejs')

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
                result.forEach(async (record) => {
                    record.setLanguage(language)
                    record.items.forEach(async (item) => {
                        item.setLanguage(language)
                        item.items.forEach(async (subItem) => {
                            subItem.setLanguage(language)
                            subItem.items.forEach(async (subSubItem) => {
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
                result.forEach(async (record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.profiles = (query, language, callback) => {
    capstone.list('Profile').model.find(query)
        .exec((err, result) => {
            if (result)
                result.forEach(async (record) => {
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
                result.forEach(async (record) => {
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
        .exec(async (err, result) => {
            if (result) {
                result.setLanguage(language)
            }
            callback(err, result)
        })
}

exports.projects = (query, language, callback) => {
    capstone.list('Project').model.find(query)
        .limit(100)
        .exec((err, result) => {
            if (result)
                result.forEach(async (record) => {
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
        .exec(async (err, result) => {
            if (result) {
                result.setLanguage(language)
            }
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
                result.forEach(async (record) => {
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
        .exec(async (err, result) => {
            if (result){
                result.setLanguage(language)
            }
            callback(err, result)
        })
}

exports.category = (query, language, callback) => {
    capstone.list('Category').model.findOne(query)
        .exec(async (err, result) => {
            if (result) {
                result.setLanguage(language)
            }
            callback(err, result)
        })
}

exports.categories = (query, language, callback) => {
    capstone.list('Category').model.find(query)
        .exec((err, result) => {
            if (result)
                result.forEach(async (record) => {
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
                result.forEach(async (record) => {
                    record.setLanguage(language)
                })
            callback(err, result)
        })
}

exports.testimonials = (language, callback) => {
    capstone.list('Testimonial').model.find()
        .exec((err, result) => {
            if (result)
                result.forEach(async (record) => {
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
                result.forEach(async (record) => {
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
        .exec(async (err, result) => {
            if (result) {
                result.setLanguage(language)
            }
            callback(err, result)
        })
}

exports.galleries = async (language, callback) => {
    try {
        const activeGalleries = await capstone.list('Gallery').model.find({ active: true }).sort({ sequence: 1 })
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
