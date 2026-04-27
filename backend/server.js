const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// =====================
// MYSQL CONNECTION
// =====================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "delivery_express",
});

db.connect((err) => {
  if (err) {
    console.log("❌ MySQL gagal konek", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// =====================
// TEST SERVER
// =====================
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend + MySQL Aktif" });
});

// =====================
// REGISTER
// =====================
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) return res.json(err);

      res.json({
        message: "User berhasil dibuat",
        id: result.insertId,
      });
    }
  );
});

// =====================
// LOGIN
// =====================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (result.length === 0) {
        return res.status(401).json({ message: "Login gagal" });
      }

      res.json({ message: "Login sukses", user: result[0] });
    }
  );
});

// =====================
// CREATE ORDER
// =====================
app.post("/order", (req, res) => {
  const { user_email, alamat, barang } = req.body;

  db.query(
    "INSERT INTO orders (user_email, alamat, barang) VALUES (?, ?, ?)",
    [user_email, alamat, barang],
    (err, result) => {
      res.json({
        message: "Order dibuat",
        id: result.insertId,
      });
    }
  );
});

// =====================
// GET ORDERS
// =====================
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    res.json(result);
  });
});

// =====================
// UPDATE STATUS
// =====================
app.put("/order/:id", (req, res) => {
  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    (err) => {
      res.json({ message: "Status diupdate" });
    }
  );
});

// =====================
// START SERVER
// =====================
app.listen(3000, () => {
  console.log("🚀 Server + MySQL jalan di http://localhost:3000");
});
