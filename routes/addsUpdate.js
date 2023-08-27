const router = require("express").Router();
// const passport = require('passport');
const Add = require("../models/Add.model")
const User = require("../models/User.model")


router.post('/des', async (req, res) => {
    //console.log("request for update", req.body)
    // const body = JSON.parse(req.body);
    await Add.updateOne({_id : req.body.id},{description : req.body.des})
    // await User.updateOne({googleId: body.soldTo}, {$push:{"bought": {addId: body.addId, price: body.soldAt}}})
    // //console.log("ads myadds:", adds)
    res.status(200).json({
        success: true,
        message: "successfull",
        // adsneeded: adds,
        //   cookies: req.cookies
    })
    
});
router.post('/image', async (req, res) => {
    //console.log("request for update", req.body)
    // const body = JSON.parse(req.body);
    await Add.updateOne({_id : req.body.id},{image: req.body.image})
    // await User.updateOne({googleId: body.soldTo}, {$push:{"bought": {addId: body.addId, price: body.soldAt}}})
    // //console.log("ads myadds:", adds)
    res.status(200).json({
        success: true,
        message: "successfull",
        // adsneeded: adds,
        //   cookies: req.cookies
    })
    
});
router.post('/price', async (req, res) => {
    //console.log("request for update", req.body)
    // const body = JSON.parse(req.body);
    await Add.updateOne({_id : req.body.id},{price: req.body.price, title: req.body.title})
    // await User.updateOne({googleId: body.soldTo}, {$push:{"bought": {addId: body.addId, price: body.soldAt}}})
    // //console.log("ads myadds:", adds)
    res.status(200).json({
        success: true,
        message: "successfull",
        // adsneeded: adds,
        //   cookies: req.cookies
    })
    
});


module.exports = router