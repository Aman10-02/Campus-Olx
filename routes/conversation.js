const router = require("express").Router();
const Conversation = require("../models/Conversation.model");

//new conv

router.post("/", async (req, res) => {
    //console.log("inside conver",JSON.parse(req.body));
    const body = JSON.parse(req.body)
    const conversation = await Conversation.findOne({
        members: { $all: [body.senderId, body.receiverId] },
        addId: body.addId,
      });
    if(conversation){
        //console.log("available");
        res.status(200).json(conversation);
        
    }else{
        //console.log("new conve")
        const newConversation = new Conversation({
            members: [body.senderId, body.receiverId],
            addId: body.addId,
        });
        try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
        } catch (err) {
        res.status(500).json(err);
        }
    }    
});

router.get("/get", async (req, res) => {
    //console.log("inside conver-get",req.user);
    const conversation = await Conversation.find({
        members: { $in: [req.user.googleId] },
    }).sort( { '_id': -1 } );
    try {
        //console.log("available");
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
