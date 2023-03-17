const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    }, //profile.__json.sub
    username: {
        type: String,
        required: true,
    },  //profile.__json.name
    image: {
        type: String,
        // required: true,
    },
    favourite: {
        type: Array,//add._id
    },
    interestedAdd: {
        type: Array, //{addId: currentAdd._id, priceOffered: msg }
    },
    bought: {
        type: Array, //{addId:   , price:     }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;