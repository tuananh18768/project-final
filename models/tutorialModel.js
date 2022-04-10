const mongoose = require('mongoose')
const { Schema } = mongoose;
const tutorialShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name!'],
        trim: true
    },
    description: {
        type: String,
    },
    linkName: {
        type: String,
    },
    avatar_couses: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    registerCourses: {
        type: Schema.Types.ObjectId,
        ref: 'RegisterCourses'
    },
    trainer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    result: [{
        type: String
    }],
    commnets: [{
        users: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        text: {
            type: String,
            trim: true,
        },
        name: {
            type: String
        },
        avatar: {
            type: String,
        },
        date: {
            type: Date,
            default: new Date()
        }
    }]
}, {
    timestamps: true,
})

const tutorialModel = mongoose.model("Tutorial", tutorialShema)

module.exports = tutorialModel