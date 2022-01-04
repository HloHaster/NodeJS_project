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
            return res.status(400).json({
                error: "The tag's name must not be empty"
            })
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