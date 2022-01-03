const TagModel = require('../models/tag');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndResponse(req, res, TagModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentAndResponse(req, res, TagModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            return res.status(400).json({
                error: "The tag's name must not be empty"
            })
        }

        genericController.saveDocumentAndSendResponse(req, res, TagModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, TagModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, TagModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}