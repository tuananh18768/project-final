const mongoose = require('mongoose');
const { Schema } = mongoose;
const discoveryShema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    likes_user: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
}, {
    timestamps: true
})


const discoveryModel = mongoose.model('Discovery', discoveryShema)

module.exports = discoveryModel