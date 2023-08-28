const router = require("express").Router();
// const passport = require('passport');
const Add = require("../models/Add.model");
const Conversation = require("../models/Conversation.model");
const Message = require("../models/Message.module");
const User = require("../models/User.model")

router.post('/post', (req, res) => {
    if (req.user) {
        //console.log("post success")
        new Add({
            createdbygoogleId: req.user.googleId,
            category: req.body.category,
            price: req.body.price,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
        }).save().then((newAdd) => {
            //console.log("created new add: ",newAdd);
        });
        res.status(200).json({
            success: true,
            message: "successfull",
            //   cookies: req.cookies
        });
    }
    else {
        //console.log("wrong")
    }

});
router.post('/favourite',   async (req, res) => {
    if (req.user && req.body) {
        //console.log("post favourite success")
        //console.log("post body",req.body)
        //console.log("post user", req.user.id)
        const currentUser = await User.findOne({googleId : req.user.googleId});
        const isfav = await currentUser.favourite.includes(req.body);
        if(isfav){
            await User.updateOne({googleId : currentUser.googleId}, {$pull:{"favourite":req.body}})
        }else {
            await User.updateOne({googleId : currentUser.googleId}, {$push:{"favourite":req.body}})
        }
        
        
        const currentAdd = await Add.findOne({_id : req.body});
        //console.log("current add",currentAdd)
        const isfavadd = await currentAdd.favourite.includes(req.user.googleId);
        if(isfavadd){
            await Add.updateOne({_id : currentAdd._id}, {$pull:{"favourite":req.user.googleId}})
            //console.log("inside if")
            
        }else {
            await Add.updateOne({_id : currentAdd._id}, {$push:{"favourite":req.user.googleId}})
            //console.log("inside else")
        }

        res.status(200).json({
            success: true,
            message: "successfull",
            updatedUser: await User.findOne({googleId : currentUser.googleId}),
            //   cookies: req.cookies
        });
    }
    else {
        //console.log("wrong")
    }      
});

router.get('/get/recommend', async (req, res) => {
    if(req.user) {

        //console.log("request for get ads", req.user.googleId)
        const adds = await Add.find({createdbygoogleId : {$not: {$regex:  req.user.googleId} }, sold: false} ).sort({createdAt: -1 }).limit(5);
        //console.log("ads found:", adds)
        res.status(200).json({
            success: true,
            message: "successfull",
            ads: adds,
            //   cookies: req.cookies
        })
    }else {
        const adds = await Add.find({sold: false} ).sort({createdAt: -1 }).limit(5);
        //console.log("ads found:", adds)
        res.status(200).json({
            success: true,
            message: "successfull",
            ads: adds,
            //   cookies: req.cookies
        })
    }

});


router.post('/conv', async (req, res) => {
    const body = JSON.parse(req.body);
    if(body){
        //console.log("request for get conv", body)
        const add = await Add.findOne({_id : body.addId});
    const user = await User.findOne({googleId : body.user_id})
    //console.log("details for conv :", add, user)
    res.status(200).json({
        Add : add,
        User : user,
    })
}

});
router.post('/conv/detail', async (req, res) => {
    const body = JSON.parse(req.body);
    if(body){

        //console.log("request for get conv", body)
        const add = await Add.findOne({_id : body.addId});
        const user = await User.findOne({googleId : body.user_id})
        //console.log("details for conv :", add, user)
        res.status(200).json({
            Add : add,
            User : user,
        })
    }
    
});


router.post('/post/offer', async (req, res) => {
    const body = req.body;
        // //console.log("request for get /post/offer", body);
        await User.updateOne({googleId : req.body.userId}, {$pull:{"interestedAdd": {addId: req.body.addId}}})
        await User.updateOne({googleId : req.body.userId}, {$push:{"interestedAdd":req.body.interestedAdd}})
        
        
        await Add.updateOne({_id : req.body.addId}, {$pull:{"interestedBuyer": {userGoogleId: req.body.userId}}})
        await Add.updateOne({_id : req.body.addId}, {$push:{"interestedBuyer":req.body.interestedBuyer}})
        
        res.status(200).json({
            success: true,
            message: "successfull"
        })
        // const currentAdd = await Add.findOne({_id : req.body});
        // //console.log("current add",currentAdd)
        // const isfavadd = await currentAdd.favourite.includes(req.user.googleId);
        // if(isfavadd){
            //     await Add.updateOne({_id : currentAdd._id}, {$pull:{"favourite":req.user.googleId}})
            //     //console.log("inside if")
            
            // }else {
                //     await Add.updateOne({_id : currentAdd._id}, {$push:{"favourite":req.user.googleId}})
                //     //console.log("inside else")
                // }
                
                // res.status(200).json({
                    //     success: true,
            //     message: "successfull",
            //     updatedUser: await User.findOne({googleId : currentUser.googleId}),
            //     //   cookies: req.cookies
            // });
            
        });
        
        
        router.get('/myads', async (req, res) => {
            //console.log("request for get myads", req.user.googleId)
            const adds = await Add.find({createdbygoogleId : req.user.googleId, sold: false});
            const soldadds = await Add.find({createdbygoogleId : req.user.googleId, sold: true});
            const bought = await Add.find({soldTo: req.user.googleId});
            //console.log("ads myadds:", adds)
            res.status(200).json({
                success: true,
                message: "successfull",
                adsneeded: adds,
                soldAdds: soldadds,
                bought: bought,
                //   cookies: req.cookies
            })
        
        });
        
        router.get('/myads/favourite', async (req, res) => {
            //console.log("request for get myads favourite", req.user.googleId)
            const adds = await Add.find({favourite:{ $in : req.user.googleId }, sold: false});
            const soldadds = await Add.find({createdbygoogleId: req.user.googleId, favourite:{ $in : req.user.googleId }, sold: true});
            const bought = await Add.find({favourite:{ $in : req.user.googleId }, soldTo: req.user.googleId });
            
        //console.log("ads myadds:", adds)
        res.status(200).json({
            success: true,
            message: "successfull",
            adsneeded: adds,
            soldAdds: soldadds,
            bought : bought,
            //   cookies: req.cookies
        })
        
    });
    
    
    
    
    router.post('/seller', async (req,res) => {
        if(req.body){
            const searchId = JSON.parse(req.body).googleId;
            //console.log("/seller",JSON.parse(req.body).googleId);
            const requiredAdds = await Add.find( {createdbygoogleId: searchId, sold: false} );
            const soldadds = await Add.find({createdbygoogleId: searchId, sold: true});
            //console.log("required ads", requiredAdds)
            res.status(200).json({
                success: true,
                message: "successfull",
                sellerAdds: requiredAdds,
                soldadds: soldadds,
                //   cookies: req.cookies
            });
        }
        else{
            //console.log("failed")
        }
    });
    
    
    router.post('/search', async (req,res) => {
        if(req.body){
            const searchId = req.body;
            //console.log("/search",req.body);
            const regex = new RegExp(searchId, 'i');
            const requiredAdds = await Add.find( { 
            $or: [
                { category: regex },
                { title: regex }
              ],
               sold: false 
            } );
            //console.log("required ads search", requiredAdds)
            
            requiredAdds.length !== 0 ?
            (res.status(200).json({
                success: true,
                message: "successfull",
                searchedAdds: requiredAdds,
                //   cookies: req.cookies
            })) : (
                res.status(200).json({
                    success: false,
                    message: "not found",
                    searchedAdds: requiredAdds,
                    //   cookies: req.cookies
                }))
    }
    else{
        //console.log("failed")
    }
});



router.post('/sold', async (req, res) => {
    //console.log("request for sold", JSON.parse(req.body))
    const body = JSON.parse(req.body);
    await Add.updateOne({_id : body.addId}, { sold: true, soldAt: body.soldAt, soldTo: body.soldTo})
    await User.updateOne({googleId: body.soldTo}, {$push:{"bought": {addId: body.addId, price: body.soldAt}}})
    // //console.log("ads myadds:", adds)
    res.status(200).json({
        success: true,
        message: "successfull",
        // adsneeded: adds,
        //   cookies: req.cookies
    })
    
});



router.post('/delete', async (req, res) => {
    //console.log("request for delete", req.body)
    // const body = JSON.parse(req.body);
    await Add.deleteOne({_id : req.body})
    await Conversation.deleteMany({addId : req.body})
    
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