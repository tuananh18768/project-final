const mongoose = require('mongoose')
const { Schema } = mongoose;
const categoryShema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    comment_text: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    courses_id: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    }
}, {
    timestamps: true,
})

const categoryModel = mongoose.model("Comments", categoryShema)

module.exports = categoryModel