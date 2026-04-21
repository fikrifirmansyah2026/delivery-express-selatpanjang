function loadAdmin() {
  const list = document.getElementById("adminList");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  list.innerHTML = "";

  if (orders.length === 0) {
    list.innerHTML = "<p>Tidak ada order</p>";
    return;
  }

  orders.forEach((order, index) => {
    list.innerHTML += `
      <div class="card">
        <p><b>Nama:</b> ${order.nama}</p>
        <p><b>Alamat:</b> ${order.alamat}</p>
        <p><b>Barang:</b> ${order.barang}</p>
        <p><b>Berat:</b> ${order.berat} kg</p>
        <p><b>Status:</b> ${order.status}</p>

        <select onchange="ubahStatus(${index}, this.value)">
          <option ${order.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
          <option ${order.status === 'Dijemput' ? 'selected' : ''}>Dijemput</option>
          <option ${order.status === 'Dalam Perjalanan' ? 'selected' : ''}>Dalam Perjalanan</option>
          <option ${order.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
        </select>

        <br><br>
        <button onclick="hapusOrder(${index})">Hapus</button>
      </div>
    `;
  });
}

function ubahStatus(index, statusBaru) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders[index].status = statusBaru;
  localStorage.setItem("orders", JSON.stringify(orders));
  loadAdmin();
}

function hapusOrder(index) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadAdmin();
}

loadAdmin();
