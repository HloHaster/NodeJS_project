const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports = {
    find: async function (req, res) {
        try {
            let posts = await genericController.findAllDocumentsAndResponse(req, res, PostModel)
            const havePosts = !!posts.length;
            res.render('index', {havePosts, posts, title: "Home"})
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', message: "Unexpected error occurred on the server"})
        }
    },

    findOne: function (req, res) {
        genericController.findOneDocumentAndResponse(req, res, PostModel)
    },

    create: function (req, res) {
        const {name, body} = req.body;
        if (isStrEmpty(name) || isStrEmpty(body)) {
            return res.status(400).json({
                error: "The post's name and body must not be empty"
            })
        }

        genericController.saveDocumentAndSendResponse(req, res, PostModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, PostModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, PostModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}