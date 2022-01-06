const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        try {
            genericController.findAllDocuments(req, res, PostModel)
        } catch (e) {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    },

    findOne: function (req, res) {
        try {
            const {id} = req.params;
            genericController.findOneDocumentById(req, res, PostModel, id)
        } catch (e) {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    },

    create: function (req, res) {
        const {name, body} = req.body;
        if (isStrEmpty(name) || isStrEmpty(body)) {
            res.status(400)
            res.render('error.hbs', {title: 'error 400', errorMessage: "The post's name and body must not be empty"})
            return;
        }
        genericController.saveDocument(req, res, PostModel)
        // } catch (e) {
        //     res.status(500)
        //     res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        // }
    },

    update: async function (req, res) {
        try {
            const document = req.body
            const {id} = req.params;

            await genericController.updateDocument(req, res, PostModel, document, id)
            res.redirect('/')
        } catch (e) {
            res.status(404)
            res.render('error.hbs', {title: 'error 404', errorMessage: "There is no entity with such id"})
        }
    },

    remove: async function (req, res) {
        try {
            const {id} = req.params
            await genericController.deleteDocument(req, res, PostModel, id)
            res.redirect('/')
        } catch (e) {
            res.status(404)
            res.render('error.hbs', {title: 'error 404', errorMessage: "There is no entity with such id"})
        }
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}