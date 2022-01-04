const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports = {
    find: async function (req, res) {
        try {
            let posts = await genericController.findAllDocuments(req, res, PostModel)
            const havePosts = !!posts.length;
            res.render('index', {havePosts, posts, title: "Home"})
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', message: "Unexpected error occurred on the server"})
        }
    },

    findOne: async function (req, res) {
        try {
            const {id} = req.params;
            let post = await genericController.findOneDocumentById(req, res, PostModel, id)
            const havePost = !!post;
            res.render('post', {title: 'post ${id}', post, havePost}) // todo: post id in title
        } catch (e) {
            res.status(404)
            res.render('error.hbs', {title: 'error 404', message: "There is no entity with such id"})
        }
    },

    create: async function (req, res) {
        try {
            const {name, body} = req.body;
            if (isStrEmpty(name) || isStrEmpty(body)) {
                res.status(400)
                res.render('error.hbs', {title: 'error 400', message: "The post's name and body must not be empty"})
            }
            await genericController.saveDocument(req, res, PostModel)
            res.redirect('/')
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', message: "Unexpected error occurred on the server"})
        }
    },

    update: async function (req, res) {
        try {
            const document = req.body
            const {id} = req.params;

            await genericController.updateDocument(req, res, PostModel, document, id)
            res.redirect('/')
        } catch (e) {
            res.status(404)
            res.render('error.hbs', {title: 'error 404', message: "There is no entity with such id"})
        }
    },

    remove: async function (req, res) {
        try {
            const {id} = req.params
            await genericController.deleteDocument(req, res, PostModel, id)
            res.redirect('/')
        } catch (e) {
            res.status(404)
            res.render('error.hbs', {title: 'error 404', message: "There is no entity with such id"})
        }
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}