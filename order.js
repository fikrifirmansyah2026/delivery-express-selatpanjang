function kirimOrder() {
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const barang = document.getElementById("barang").value;
  const berat = document.getElementById("berat").value;

  if (!nama || !alamat || !barang || !berat) {
    alert("Harap isi semua data!");
    return;
  }

  const order = {
    nama,
    alamat,
    barang,
    berat,
    status: "Menunggu"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order berhasil dikirim!");
  window.location.href = "dashboard.html";
    }
