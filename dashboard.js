function tampilkanOrder() {
  const list = document.getElementById("listOrder");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  list.innerHTML = "";

  orders.forEach((order, index) => {
    list.innerHTML += `
      <div class="card">
        <p><b>Nama:</b> ${order.nama}</p>
        <p><b>Alamat:</b> ${order.alamat}</p>
        <p><b>Barang:</b> ${order.barang}</p>
        <p><b>Berat:</b> ${order.berat} kg</p>
        <p><b>Status:</b> ${order.status}</p>
      </div>
    `;
  });
}

tampilkanOrder();
