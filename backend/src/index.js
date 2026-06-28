const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");

const menuRouter = require("./routes/menu");
const billingRouter = require("./routes/billing");
const ordersRouter = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
				callback(null, true);
				return;
			}
			callback(new Error("Not allowed by CORS"));
		},
	})
);
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use("/menu", menuRouter);
app.use("/", billingRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
