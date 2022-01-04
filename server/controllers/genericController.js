let findAllDocuments = async (req, res, documentModel) => {
    return await documentModel.find()
}

let findOneDocumentById = async (req, res, documentModel, id) => {
    return await documentModel.findOne({"_id": id})
}

let saveDocument = async (req, res, documentModel) => {
    const doc = req.body

    delete doc.createdAt
    delete doc.updatedAt
    let document = new documentModel(doc)

    return await document.save()
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

