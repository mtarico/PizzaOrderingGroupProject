const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token || token !== `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: `${ADMIN_USERNAME}:${ADMIN_PASSWORD}` });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

router.get("/admin/me", authMiddleware, (req, res) => {
  res.json({ username: ADMIN_USERNAME });
});

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
    console.error("Failed to fetch menu", err);
    res.status(500).json({ error: err.message || "Failed to fetch menu" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { category, name, description, price, image } = req.body || {};

  if (!category || !name || !description || price === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const item = await prisma.menuItem.create({
      data: {
        category,
        name,
        description,
        price: Number(price),
        image: image || null,
      },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { category, name, description, price, image } = req.body || {};

  try {
    const item = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: {
        category,
        name,
        description,
        price: Number(price),
        image: image || null,
      },
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.menuItem.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

module.exports = router;
