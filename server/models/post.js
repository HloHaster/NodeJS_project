const mongoose = require('mongoose');

const Schema = mongoose.Schema

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        excerpt: String,
        // categories: {
        //     type: [mongoose.Types.ObjectId], // SchemaType doesn't actually create MongoDB ObjectIds, it is just a configuration for a path in a schema.
        //     ref: 'Category',
        //     required: true,
        // },
        // author: {
        //     type: [mongoose.Types.ObjectId],
        //     ref: 'author',
        //     required: true,
        // },
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps:{ currentTime: () => new Date(Date.now()+3*60*60*1000)}
    }
);

module.exports = mongoose.model('Post', schema)



