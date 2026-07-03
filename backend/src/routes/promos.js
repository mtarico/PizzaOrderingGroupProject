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

// GET /promos — public, active promos only
router.get("/", async (req, res) => {
  try {
    const promos = await prisma.promo.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch promos" });
  }
});

// GET /promos/all — admin, includes inactive
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const promos = await prisma.promo.findMany({ orderBy: { id: "asc" } });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch promos" });
  }
});

// POST /promos
router.post("/", authMiddleware, async (req, res) => {
  const { label, description, badge, discountType, discountValue } = req.body || {};
  if (!label || !description || !badge || !discountType) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const promo = await prisma.promo.create({
      data: { label, description, badge, discountType, discountValue: Number(discountValue) || 0, active: true },
    });
    res.status(201).json(promo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create promo" });
  }
});

// PUT /promos/:id
router.put("/:id", authMiddleware, async (req, res) => {
  const { label, description, badge, discountType, discountValue, active } = req.body || {};
  try {
    const promo = await prisma.promo.update({
      where: { id: Number(req.params.id) },
      data: { label, description, badge, discountType, discountValue: Number(discountValue) || 0, active: active ?? true },
    });
    res.json(promo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update promo" });
  }
});

// DELETE /promos/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.promo.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete promo" });
  }
});

module.exports = router;
