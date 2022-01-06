let mongoose = require('mongoose')

let findAllDocuments = (req, res, documentModel) => {
    documentModel
        .find()
        .then(documents => {
            console.log(documents)
            res.json(documents)
        })
        .catch(e => {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        })
}

let findOneDocumentById = (req, res, documentModel) => {
    const {id} = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findOne({"_id": id})
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}

let saveDocument = (req, res, documentModel) => {
    const doc = req.body

    delete doc.createdAt
    delete doc.updatedAt
    let document = new documentModel(doc)

    document.save()
        .then(document => {
            res.json(document)
        })
        .catch(e => {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        })
}

let updateDocument = (req, res, documentModel) => {
    const document = req.body
    const {id} = req.params;

    delete document.createdAt
    delete document.updatedAt

    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findByIdAndUpdate(id, document, {new: true})
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}

let deleteDocument = (req, res, documentModel) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findByIdAndDelete(id)
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}


module.exports.findAllDocuments = findAllDocuments;
module.exports.findOneDocumentById = findOneDocumentById;
module.exports.saveDocument = saveDocument;
module.exports.updateDocument = updateDocument;
module.exports.deleteDocument = deleteDocument;

