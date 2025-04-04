const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
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
  },
  category: String,
  description: Schema.Types.Mixed  // Allows both numbers and strings
});

// Define a schema for the parent document that contains the items array
const parentSchema = new mongoose.Schema({
  items: [itemSchema]  // Array of item objects
});

const Item = mongoose.model('Item', parentSchema);

module.exports = Item;
