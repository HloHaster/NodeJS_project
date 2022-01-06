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
            res.status(400)
            res.json({errorMessage: "The post's name and body must not be empty"})
            return;
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