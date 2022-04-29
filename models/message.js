const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageShema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
    timestamps: true,
});

const messageModel = mongoose.model("Message", messageShema);

module.exports = messageModel;