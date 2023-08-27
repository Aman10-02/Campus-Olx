const router = require("express").Router();
// const passport = require('passport');
const User = require("../models/User.model");
const Add = require("../models/Add.model")
const Conversation = require("../models/Conversation.model")

router.post('/getdetail', async (req,res) => {
    if(req.body){
        //console.log("req.ody", req.body)
        const requireduser = await User.findOne( { googleId : req.body } );
        //console.log("getdetail/user",requireduser)
        res.status(200).json({
            success: true,
            message: "successfull",
            user: requireduser,
            //   cookies: req.cookies
        });
    }
    else{
        //console.log("failed")
    }
});


router.post('/delete', async (req, res) => {
    //console.log("request for delete", req.body)
    // const body = JSON.parse(req.body);
    await User.deleteOne({googleId: req.body})
    await Add.deleteMany({createdbygoogleId : req.body})
    await Conversation.deleteMany({members: { $in : req.body}})
    
    // await User.updateOne({googleId: body.soldTo}, {$push:{"bought": {addId: body.addId, price: body.soldAt}}})
    // //console.log("ads myadds:", adds)
    res.status(200).json({
        success: true,
        message: "successfull",
        // adsneeded: adds,
        //   cookies: req.cookies
    })
    
});

module.exports = router;