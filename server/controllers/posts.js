const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports.create = function (req, res) {
    const { name, body } = req.body;
    if (isStrEmpty(name) || isStrEmpty(body))  {
        return res.status(400).json({
            error: "The post's name and body must not be empty"
        })
    }

    const post = new PostModel(req.body)
    genericController.saveObjAndSendResponse(req, res, post)
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}