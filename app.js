document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Delivery Express siap!");
});

function hitungOngkir() {
  const jarak = 5; // dummy (nanti bisa pakai GPS)
  const hargaPerKm = 5000;

  const total = jarak * hargaPerKm;

  document.getElementById("ongkir").innerText = "Rp " + total;
}

function ambilLokasi() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    document.getElementById("alamat").value =
      "Lat: " + lat + ", Lon: " + lon;
  });
}

function notification() {
alert("Kurir sedang menuju lokasi kamu 🚚");

function hubungiKami() {
  alert("Silakan hubungi admin via WhatsApp!");
}
