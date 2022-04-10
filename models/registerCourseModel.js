const mongoose = require('mongoose');
const { Schema } = mongoose;
const userShema = new mongoose.Schema({
    users: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    courses: {
        type: Schema.Types.ObjectId,
        ref: 'Tutorial'
    },

}, {
    timestamps: true
})


const userModel = mongoose.model('RegisterCourses', userShema)

module.exports = userModel