const mongoose = require('mongoose')
const { Schema } = mongoose;
const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name!'],
        trim: true
    },
    manger_cate: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    timestamps: true,
})

const categoryModel = mongoose.model("Category", categoryShema)

module.exports = categoryModel