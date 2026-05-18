const express = require("express");
const axios = require("axios");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// Internal Docker URLs
const CART_URL = "http://cart:3000";
const PAYMENT_URL = "http://payment:3000";
const NOTIFICATION_URL = "http://notification:3000";

const pool = new Pool({
  host: "order-db",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "order_db"
});

app.get("/health", (_, res) => res.json({ status: "ok", service: "order" }));

app.post("/orders", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = jwt.verify(token, JWT_SECRET);
  
  try {
    const cart = await axios.get(`${CART_URL}/cart`, { headers: { "x-user-id": user.id } });
    const amount = cart.data.items.reduce((s, i) => s + i.price * i.quantity, 0);
    
    const payment = await axios.post(`${PAYMENT_URL}/pay`, { amount });
    
    const { rows } = await pool.query(
      "INSERT INTO orders(user_id, total_amount, status) VALUES($1, $2, $3) RETURNING id",
      [user.id, amount, payment.data.status === "SUCCESS" ? "PAID" : "FAILED"]
    );

    await axios.delete(`${CART_URL}/cart/clear`, { headers: { "x-user-id": user.id } });
    await axios.post(`${NOTIFICATION_URL}/notify`, { to: user.email, message: "Order Placed!" });

    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Order running on port ${PORT}`));