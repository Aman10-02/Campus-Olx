const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addSchema = new Schema({
    createdbygoogleId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        
    }, //profile.__json.sub
    price: {
        type: Number,
        required: true,
    },  //profile.__json.name
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    favourite: {
        type: Array,//user._id
    },
    interestedBuyer: {
        type: Array, //[{ user_id: userid, priceoffered : price}]
    },
    sold: {
        type: Boolean,
        default: false,
    },
    soldTo: {
        type: String,
    },
    soldAt: {
        type: Number,
    }
});

const Add = mongoose.model('add', addSchema);

module.exports = Add;