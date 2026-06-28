const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /orders
router.post("/", async (req, res) => {
  const { name, address, subtotal, tax, discount, total, items } = req.body || {};

  if (!name || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const parsedSubtotal = Number(subtotal);
  const parsedTax = Number(tax);
  const parsedDiscount = Number(discount);
  const parsedTotal = Number(total);

  if (![parsedSubtotal, parsedTax, parsedDiscount, parsedTotal].every(Number.isFinite)) {
    return res.status(400).json({ error: "Invalid totals in order payload" });
  }

  const normalizedItems = items.map((item) => ({
    name: item.name,
    options: item.options || null,
    price: Number(item.price),
    qty: Number(item.qty),
  }));

  const hasInvalidItem = normalizedItems.some(
    (item) =>
      !item.name ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      !Number.isInteger(item.qty) ||
      item.qty < 1
  );

  if (hasInvalidItem) {
    return res.status(400).json({ error: "Invalid items in order payload" });
  }

  try {
    const order = await prisma.order.create({
      data: {
        name,
        address,
        subtotal: parsedSubtotal,
        tax: parsedTax,
        discount: parsedDiscount,
        total: parsedTotal,
        items: {
          create: normalizedItems,
        },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to create order", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
