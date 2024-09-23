const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

module.exports = mongoose.model('Address', AddressSchema);
