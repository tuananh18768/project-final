const router = require("express").Router();
const Conversation = require("../models/conversation");

//new conversation
router.post("/", async(req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversations = await newConversation.save();
        res.status(200).json(savedConversations);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});
//get conversation of a user

router.get("/:userId", async(req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

router.get("/find/:firstUserId/:secondUserId", async(req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

module.exports = router;