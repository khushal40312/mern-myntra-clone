const express = require('express');
const { getStoredItems } = require('../data/items');
const router = express.Router();

router.get('/', async (req, res) => {
    const storedItems = await getStoredItems();
   
    // Use environment variable for delay, default to 2000ms
    const delay = process.env.ITEM_FETCH_DELAY || 2000;
    await new Promise((resolve) => setTimeout(() => resolve(), delay));
    res.json({ items: storedItems });
});

module.exports = router;
