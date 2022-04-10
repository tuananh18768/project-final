const mongoose = require('mongoose');
const { Schema } = mongoose;
const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    role: {
        type: Number,
        default: 2, // 0 = user, 1 = admin, 2 = trainer
    },
    avatar: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Son_Tung_M-TP_1_%282017%29.png/1200px-Son_Tung_M-TP_1_%282017%29.png",
    },
    experience: {
        type: String,
    },
    skills: {
        type: String,
    },
    graduate: {
        type: String,
    },
    cousers: [{
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    }]
}, {
    timestamps: true
})


const userModel = mongoose.model('Trainer', userShema)

module.exports = userModel