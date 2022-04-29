const mongoose = require("mongoose");
const { Schema } = mongoose;
const conversationShema = new mongoose.Schema({
    members: {
        type: Array,
    },
}, {
    timestamps: true,
});

const conversationModel = mongoose.model("Conversation", conversationShema);

module.exports = conversationModel;