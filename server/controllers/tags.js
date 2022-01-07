const TagModel = require('../models/tag');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocuments(req, res, TagModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentById(req, res, TagModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            res.status(400)
            res.json({errorMessage: "The tag name must not be empty"})
            return;
        }
        genericController.saveDocument(req, res, TagModel)
    },

    update: function (req, res) {
        genericController.updateDocument(req, res, TagModel)
    },

    remove: function (req, res) {
        genericController.deleteDocument(req, res, TagModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}