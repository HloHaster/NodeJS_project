let saveObjAndSendResponse = ((req, res, obj) => {
    obj
        .save()
        .then((savedObj) => {
            res.json(savedObj);
            res.end();
        })
        .catch((error) => {
            res.status(400).json({ error: error.message })
        })
})

module.exports.saveObjAndSendResponse = saveObjAndSendResponse
