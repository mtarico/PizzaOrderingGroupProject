const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /menu  — optionally filter by ?category=pizza
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const items = await prisma.menuItem.findMany({
      where: category ? { category } : undefined,
      orderBy: { category: "asc" },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

module.exports = router;
