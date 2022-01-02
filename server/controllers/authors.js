const AuthorModel = require('../models/author');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndResponse(req, res, AuthorModel)
    },

    findOne: function (req, res) {
        genericController.FindOneDocumentAndResponse(req, res, AuthorModel)
    },

    create: function (req, res) {
        const {name, email} = req.body;
        if (isStrEmpty(name) || isStrEmpty(email)) {
            return res.status(400).json({
                error: "The author's name and email must not be empty"
            })
        }

        if (!isEmailValid(email)) {
            return res.status(400).json({
                error: "The author's email is incorrect"
            })
        }

        genericController.saveDocumentAndSendResponse(req, res, AuthorModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, AuthorModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, AuthorModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}

function isEmailValid(email) {
    return emailRegex.test(email);
}

let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;