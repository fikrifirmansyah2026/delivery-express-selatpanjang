<!DOCTYPE html>
<html>
<head>
  <title>Delivery Express Selatpanjang</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial;
      margin: 0;
      background: #f5f5f5;
      text-align: center;
    }

    header {
      background: #ff3b3b;
      color: white;
      padding: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    .container {
      padding: 20px;
    }

    .card {
      background: white;
      padding: 20px;
      margin: 15px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    button {
      background: #ff3b3b;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background: #e60000;
    }
  </style>
</head>

<body>

<header>
  🚚 Delivery Express Selatpanjang
</header>

<div class="container">

  <div class="card">
    <h3>Order Makanan</h3>
    <p>Pesan cepat langsung dari rumah</p>
    <button onclick="goOrder()">Pesan Sekarang</button>
  </div>

  <div class="card">
    <h3>Tracking</h3>
    <p>Cek status pesanan kamu</p>
    <button onclick="alert('Fitur coming soon')">Cek Tracking</button>
  </div>

</div>

<script>
function goOrder() {
  window.location.href = "order.html";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const orderRoutes = require("./routes/orderRoutes");
app.use("/", orderRoutes);

// TEST API
app.get("/", (req, res) => {
  res.json({ message: "🚀 API Delivery Express Aktif" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("🚀 Server jalan di port " + PORT);
});

</body>
</html>
