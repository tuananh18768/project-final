const mongoose = require('mongoose');
const { Schema } = mongoose;
const newPostDiscoverShema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    discovery: {
        type: Schema.Types.ObjectId,
        ref: 'Discovery'
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    imagePost: [{
        fileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileSize: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true
})


const userModel = mongoose.model('newPostDiscover', newPostDiscoverShema)

module.exports = userModel