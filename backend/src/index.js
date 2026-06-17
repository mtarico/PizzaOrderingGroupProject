require("dotenv").config();
const express = require("express");
const cors = require("cors");

const menuRouter = require("./routes/menu");
const billingRouter = require("./routes/billing");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use("/menu", menuRouter);
app.use("/", billingRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
