const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageDiscoveryShema = new mongoose.Schema({
    postDiscovery: {
        type: Schema.Types.ObjectId,
        ref: 'newPostDiscover'
    },
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
}, {
    timestamps: true
})


const userModel = mongoose.model('ImageDiscovery', imageDiscoveryShema)

module.exports = userModel