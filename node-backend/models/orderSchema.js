const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      rating: {
        stars: Number,
        count: Number,
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
    },
  ],
  status: {
    type: String,
    default: 'processing',  // Default order status
  },
  date: {
    type: Date,
    default: Date.now,  // Auto-set the order creation date
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  invoiceNumber: {
    type: Number,
    required: true,  // Invoice number field
  },
  receiptVoucher: {
    type: String,
    required: true,  // Receipt voucher field
  },
  location: {
    type: String,  // Delivery location
  },
});

module.exports = mongoose.model('Order', OrderSchema);
