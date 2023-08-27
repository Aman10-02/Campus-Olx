const router = require("express").Router();
const Message = require("../models/Message.module");

//add

router.post("/post", async (req, res) => {
  //console.log("new msg", req.body)
  const newMessage = new Message(req.body);
  //console.log("new message created:", newMessage)
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.post("/get", async (req, res) => {
  //console.log("messages get", JSON.parse(req.body))
  try {
    const messages = await Message.find({
      conversationId: JSON.parse(req.body).conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;