const AuthorModel = require('../models/author');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocuments(req, res, AuthorModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentById(req, res, AuthorModel)
    },

    create: function (req, res) {
        const {name, email} = req.body;
        if (isStrEmpty(name) || isStrEmpty(email)) {
            res.status(400)
            res.json({errorMessage: "The post's name and body must not be empty"})
            return;
        }
        genericController.saveDocument(req, res, AuthorModel)
    },

    update: function (req, res) {
        genericController.updateDocument(req, res, AuthorModel)
    },

    remove: function (req, res) {
        genericController.deleteDocument(req, res, AuthorModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}