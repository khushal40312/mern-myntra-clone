const express = require('express');
const router = express.Router();
const Item = require('../models/itemIdSchema');
const fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator');
const CartID = require('../models/cardId');
const mongoose = require('mongoose');
const Parent = require('../models/itemIdSchema');
const stripe = require("stripe")(process.env.STRIPE_SECRET);  // Securely load API key
require('dotenv').config();  // Ensure dotenv is used to load env variables
// const ItemCollection = require('../models/ItemCollection');
// for home component
router.get('/allitems', async (req, res) => {
  try {
    const items = await Item.find({});
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    res.json(items);
    // console.log(items)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//ADD items in cart for a corresponding user
router.post('/addusercartItems', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the request
    const userId = req.user.id;

    // Extract the array of items from the request body
    const items = req.body;

    // Create an array to hold the newly created cart items
    const newCartItems = items.map(item => ({
      user: userId,
      id: item.id,
      image: item.image,
      company: item.company,
      item_name: item.item_name,
      original_price: item.original_price,
      current_price: item.current_price,
      discount_percentage: item.discount_percentage,
      return_period: item.return_period,
      delivery_date: item.delivery_date,
      rating: item.rating
    }));

    // Save all the new cart items to the database
    const savedCartItems = await CartID.insertMany(newCartItems);

    // Respond with the saved cart items
    res.json(savedCartItems);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

//fetch items of a user
router.get('/fetchallusercartItems', fetchuser, async (req, res) => {
  try {
    const item = await CartID.find({ user: req.user.id });
    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


router.delete('/deleteitem/:id', fetchuser, async (req, res) => {
  try {
    // Find the item in the cart by matching the 'id' field from the request parameter
    let cart = await CartID.findOne({ id: req.params.id });

    if (!cart) {
      return res.status(404).send("Item not found");
    }

    // Allow deletion only if the user owns this item
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the item
    await CartID.deleteOne({ id: req.params.id });

    res.json({ "Success": "Item has been deleted", cart: cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


//


// Route to add a new item to the existing items array
router.post('/admin', async (req, res) => {
  try {
    // The document's _id where the item should be added
    const documentId = new mongoose.Types.ObjectId('66cc16bb1f05b2349b26af5c');

    const updatedDocument = await Item.updateOne(
      { _id: documentId },
      { $push: { items: req.body } }  // Push the new item to the items array
    );

    if (updatedDocument.modifiedCount > 0) {
      res.status(200).json({ message: 'Item added successfully' });
    } else {
      res.status(404).json({ message: 'Document not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
});

router.delete('/deleteadmin/:id', async (req, res) => {
  try {
    const itemId = req.params.id; // The item id to be deleted
    const documentId = new mongoose.Types.ObjectId('66cc16bb1f05b2349b26af5c'); // The document's _id where the item should be removed

    const updatedDocument = await Item.updateOne(
      { _id: documentId },
      { $pull: { items: { id: itemId } } }  // Remove the item with the given id from the items array
    );

    if (updatedDocument.modifiedCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { product } = req.body;  // 'product' is an array of items from the client

    // Map the products array to generate line items for Stripe
    const lineItems = product.map((productItem) => {
      // Debugging image issue: Ensure that productItem.image is a valid URL
  

      return {
        price_data: {
          currency: "inr",  // Change to Indian Rupees
          product_data: {
            name: productItem.item_name,
            images: [productItem.image],  // Ensure this is a full URL
          },
          unit_amount: Math.round(productItem.current_price * 100),  // Convert to paise (smallest currency unit)
        },
        quantity: 1,  // Can be adjusted based on actual quantity
      };
    });
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.SUCCESS_URL || "http://localhost:5173/success",  // Use env variable for success URL
      cancel_url: process.env.CANCEL_URL || "http://localhost:5173/cancel",    // Use env variable for cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

  module.exports = router;