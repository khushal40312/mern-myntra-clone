const express = require('express');
const router = express.Router();
const Item = require('../models/itemIdSchema');
const Order = require('../models/orderSchema');
const fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator');
const CartID = require('../models/cardId');
const mongoose = require('mongoose');
const Parent = require('../models/itemIdSchema');
const Address = require('../models/AddressSchema');
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
    // Find the item in the cart by matching both the 'id' and the user
    let cart = await CartID.findOne({ id: req.params.id, user: req.user.id });

    if (!cart) {
      return res.status(404).send("Item not found");
    }

    // Delete the item
    await CartID.deleteOne({ id: req.params.id, user: req.user.id });

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

const generateInvoiceNumber = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
};

const generateReceiptVoucher = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${Math.floor(10 + Math.random() * 90)}${characters.charAt(Math.floor(Math.random() * characters.length))}-${result}`;
};

router.post('/createOrder', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.id;

    // Extract the array of items from the request body
    const items = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided or the data format is incorrect. Expecting an array of items." });
    }

    // Fetch the user's saved address
    const userAddress = await Address.findOne({ user: userId });

    if (!userAddress) {
      return res.status(400).json({ error: "Address not found, please save the address first" });
    }

    // Generate invoice number and receipt voucher
    const invoiceNumber = generateInvoiceNumber();
    const receiptVoucher = generateReceiptVoucher();

    // Create a new order with default status as "processing"
    const newOrder = new Order({
      user: userId,
      items,  // Save the array of items directly
      status: "processing",  // Default status
      address: userAddress._id, // Link the user's saved address
      invoiceNumber,  // Save generated invoice number
      receiptVoucher  // Save generated receipt voucher
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to create order");
  }
});


router.post('/saveAddress', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.id;

    // Extract address details from the request body
    const { name, mobile, pincode, address, locality, city, state } = req.body;

    if (!name || !mobile || !pincode || !address || !locality || !city || !state) {
      return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Check if the user already has an address, if so, update it
    let existingAddress = await Address.findOne({ user: userId });

    if (existingAddress) {
      // Update the existing address
      existingAddress.name = name;
      existingAddress.mobile = mobile;
      existingAddress.pincode = pincode;
      existingAddress.address = address;
      existingAddress.locality = locality;
      existingAddress.city = city;
      existingAddress.state = state;

      const updatedAddress = await existingAddress.save();
      return res.status(200).json(updatedAddress);
    }

    // Create a new address for the user
    const newAddress = new Address({
      user: userId,
      name,
      mobile,
      pincode,
      address,
      locality,
      city,
      state,
    });

    const savedAddress = await newAddress.save();

    // Respond with the saved address
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to save address");
  }
});
// Route to get the address of the authenticated user
router.get('/getAddress', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.id;

    // Find the address for the user
    const userAddress = await Address.findOne({ user: userId });

    // Check if address exists
    if (!userAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Respond with the user's address
    res.status(200).json(userAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to fetch address");
  }
});
router.delete('/deleteAddress', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.id;

    // Find the address for the user and delete it
    const deletedAddress = await Address.findOneAndDelete({ user: userId });

    // If no address is found, return a 404 response
    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to delete address");
  }
});
// Route to fetch all orders for the authenticated user
router.get('/trackOrder', fetchuser, async (req, res) => {
  try {
    // Extract user ID from the token (handled by fetchuser middleware)
    const userId = req.user.id;

    // Fetch all orders for this user
    const userOrders = await Order.find({ user: userId });

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    // Send the user's order details as the response
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching order details");
  }
});
router.post('/create-checkout-session', async (req, res) => {
  const { product } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: product.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.item_name,  // Use item_name based on the screenshot
        },
        unit_amount: item.current_price * 100,  // Stripe expects the price in paise for INR
      },
      quantity: 1,
    })),
    mode: 'payment',
    success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CANCEL_URL}`,
  });

  res.json({ id: session.id });
});
router.get('/confirm-payment/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const { products } = req.body;  // Accept products in request body

  try {
    // Fetch the session details from Stripe using the session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Payment is confirmed, return the payment status and the products
      res.json({
        paymentStatus: 'paid',
        products: products || [] // Return the products from the request body
      });
    } else {
      // Payment failed or is incomplete
      res.json({ paymentStatus: 'unpaid' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching session data' });
  }
});


// Admin API to update the status of an order
router.put('/admin/updateOrderStatus/:orderId', fetchuser, async (req, res) => {
  try {
    // Extract the orderId from the request parameters
    const { orderId } = req.params;

    // Extract the new status and location (optional) from the request body
    const { status, location } = req.body;

    // If the status is "Out for Delivery", ensure location is provided
    if (status === 'Out for Delivery' && !location) {
      return res.status(400).json({ message: 'Location is required when the status is "Out for Delivery".' });
    }

    // Find the order by its ID and update the status and location (if provided)
    const updateFields = { status };
    if (location) {
      updateFields.location = location;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateFields,  // Update the status and location if applicable
      { new: true }  // Return the updated order
    );

    // If the order is not found, return a 404 error
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the updated order details
    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});
// Route to fetch all addresses (admin or authorized access)
router.get('/getAllAddresses', fetchuser, async (req, res) => {
  try {
    // Fetch all addresses from the database
    const allAddresses = await Address.find({});

    // Check if any addresses exist
    if (!allAddresses || allAddresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    // Respond with all addresses
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error("Error fetching all addresses:", error.message);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});
router.delete('/deleteOrder/:orderId', fetchuser, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.id;

    // Extract the orderId from the request parameters
    const { orderId } = req.params;

    // Find the order by the given orderId and userId
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found or does not belong to the user." });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    // Respond with success message
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to delete order");
  }
});
// Fetch all orders (admin or authorized access)
router.get('/allOrders', fetchuser, async (req, res) => {
  try {
    // Check if the user has admin privileges, implement admin check logic here if required
    // For example:
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    // Fetch all orders from the database
    const allOrders = await Order.find({});

    // If no orders are found
    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Return all orders in the response
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
