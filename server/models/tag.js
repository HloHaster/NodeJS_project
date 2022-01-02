const mongoose = require('mongoose');

const Schema = mongoose.Schema

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        createdAt: Date,
        updatedAt: Date
    },
    {timestamps: new Date()} // todo: разобраться со временем
);

module.exports = mongoose.model('Post', schema)