const CategoryModel = require('../models/category');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndResponse(req, res, CategoryModel)
    },

    findOne: function (req, res) {
        genericController.FindOneDocumentAndResponse(req, res, CategoryModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            return res.status(400).json({
                error: "The category's name must not be empty"
            })
        }

        genericController.saveDocumentAndSendResponse(req, res, CategoryModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, CategoryModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, CategoryModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}