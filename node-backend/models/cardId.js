const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    id: String,
    image: String,
    company: String,
    item_name: String,
    original_price: Number,
    current_price: Number,
    discount_percentage: Number,
    return_period: Number,
    delivery_date: String,
    rating: {
        stars: Number,
        count: Number
    }
});

const CartID = mongoose.model('Cart', cartSchema);
module.exports = CartID;
