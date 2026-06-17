const express = require("express");

const router = express.Router();
const TAX_RATE = 0.08;

// POST /calculate
// Body: { items: [{ id, name, price, qty }] }
router.post("/calculate", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const qty = parseInt(item.qty, 10);
    if (isNaN(price) || isNaN(qty) || qty < 1) {
      throw new Error(`Invalid item: ${JSON.stringify(item)}`);
    }
    return sum + price * qty;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  res.json({
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  });
});

module.exports = router;
