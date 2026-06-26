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

  try {
    const order = await prisma.order.create({
      data: {
        name,
        address,
        subtotal: Number(subtotal),
        tax: Number(tax),
        discount: Number(discount),
        total: Number(total),
        items: {
          create: items.map((item) => ({
            name: item.name,
            options: item.options || null,
            price: Number(item.price),
            qty: Number(item.qty),
          })),
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
