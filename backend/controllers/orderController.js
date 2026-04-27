const db = require("../db/db");

// CREATE ORDER
exports.createOrder = (req, res) => {
  const { name, food } = req.body;

  if (!name || !food) {
    return res.json({ message: "Data tidak lengkap" });
  }

  db.query(
    "INSERT INTO orders (name, food) VALUES (?, ?)",
    [name, food],
    (err) => {
      if (err) return res.json({ error: err });
      res.json({ message: "Order berhasil dibuat" });
    }
  );
};

// GET ALL ORDERS
exports.getOrders = (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};
