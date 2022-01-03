let findAllDocumentsAndResponse = async (req, res, documentModel) => {
    return await documentModel.find()
}

let findOneDocumentAndResponse = (req, res, documentModel) => {
    const {id} = req.params;
    documentModel
        .findOne({"_id": id})
        .then((document) => {
            res.json(document)
            res.end
        })
        .catch((e) => {
            console.log(e)
            res.status(404).json({error: 'There is no entity with such id'})
        })
}

let saveDocumentAndSendResponse = (req, res, documentModel) => {
    const doc = req.body

    delete doc.createdAt
    delete doc.updatedAt
    let document = new documentModel(doc)

    document
        .save()
        .then((savedDocument) => {
            res.json(savedDocument);
            res.end();
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
}

let updateDocumentAndSendResponse = (req, res, documentModel) => {
    const document = req.body

    if (!document._id) {
        res.status(404).json({error: 'There is no entity with such id'})
    }

    delete document.createdAt
    delete document.updatedAt

    documentModel.findByIdAndUpdate(document._id, document, {new: true})
        .then((updatedDocument) => {
            res.json(updatedDocument)
            res.end
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
}

let deleteDocumentAndSendResponse = (req, res, documentModel) => {
    const {id} = req.params
    if (!id) {
        res.status(404).json({error: 'There is no entity with such id'})
    }
    documentModel.findByIdAndDelete(id)
        .then((deletedDocument) => {
            res.json(deletedDocument)
            res.end
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
}


module.exports.findAllDocumentsAndResponse = findAllDocumentsAndResponse;
module.exports.findOneDocumentAndResponse = findOneDocumentAndResponse;
module.exports.saveDocumentAndSendResponse = saveDocumentAndSendResponse;
module.exports.updateDocumentAndSendResponse = updateDocumentAndSendResponse;
module.exports.deleteDocumentAndSendResponse = deleteDocumentAndSendResponse;

