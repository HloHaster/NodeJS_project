const CategoryModel = require('../models/category');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocuments(req, res, CategoryModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentById(req, res, CategoryModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            return res.status(400).json({
                error: "The category's name must not be empty"
            })
        }

        genericController.saveDocument(req, res, CategoryModel)
    },

    update: function (req, res) {
        genericController.updateDocument(req, res, CategoryModel)
    },

    remove: function (req, res) {
        genericController.deleteDocument(req, res, CategoryModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}