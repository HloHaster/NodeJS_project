const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocuments(req, res, PostModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentById(req, res, PostModel)
    },

    create: function (req, res) {
        const {name, body} = req.body;
        if (isStrEmpty(name) || isStrEmpty(body)) {
            res.status(400)
            res.json({errorMessage: "The post's name and body must not be empty"})
            return;
        }
        genericController.saveDocument(req, res, PostModel)
    },

    update: function (req, res) {
        genericController.updateDocument(req, res, PostModel)
    },

    remove: function (req, res) {
        genericController.deleteDocument(req, res, PostModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}