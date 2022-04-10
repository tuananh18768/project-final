const mongoose = require('mongoose');
const { Schema } = mongoose;
const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
    },
    tutorials: {
        type: Schema.Types.ObjectId,
        ref: 'Tutorial'
    },
    videoUrl: {
        type: String,
    },
    trainer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    userLearn: [{
        users: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    }]
}, {
    timestamps: true
})


const userModel = mongoose.model('Courses', userShema)

module.exports = userModel