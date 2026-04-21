document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Delivery Express siap!");
});

function hitungOngkir() {
  const jarak = 5; // dummy (nanti bisa pakai GPS)
  const hargaPerKm = 5000;

  const total = jarak * hargaPerKm;

  document.getElementById("ongkir").innerText = "Rp " + total;
}

function hubungiKami() {
  alert("Silakan hubungi admin via WhatsApp!");
}
