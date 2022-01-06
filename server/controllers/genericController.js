let mongoose = require('mongoose')

let findAllDocuments = (req, res, documentModel) => {
    documentModel
        .find()
        .then(documents => {
            res.json(documents)
        })
        .catch(e => {
            res.status(500)
            res.json({errorMessage: "Internal Server Error"})
        })
}

let findOneDocumentById = (req, res, documentModel, id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findOne({"_id": id})
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({ errorMessage: "There is no entity with such id"})
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
        }).catch(e => {

    })
}

let updateDocument = async (req, res, documentModel, document, id) => {
    delete document.createdAt
    delete document.updatedAt

    return await documentModel.findByIdAndUpdate(id, document, {new: true})
}

let deleteDocument = (req, res, documentModel, id) => {
    return documentModel.findByIdAndDelete(id);
}


module.exports.findAllDocuments = findAllDocuments;
module.exports.findOneDocumentById = findOneDocumentById;
module.exports.saveDocument = saveDocument;
module.exports.updateDocument = updateDocument;
module.exports.deleteDocument = deleteDocument;

