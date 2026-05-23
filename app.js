/**
 * Delivery Express Selatpanjang - Main App
 * Version 2.0 - 2026
 * Fixed & Enhanced
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Website Delivery Express Selatpanjang siap!");
  loadBottomNav();
});

// ============================================
// HITUNG ONGKOS KIRIM
// ============================================

function hitungOngkir() {
  const distance = parseFloat(document.getElementById("distance")?.value) || 5;
  const pricePerKm = 5000;
  const baseFee = 10000;
  
  const total = baseFee + (distance * pricePerKm);
  
  const ongkir = document.getElementById("ongkir");
  if (ongkir) {
    ongkir.innerText = "Rp " + total.toLocaleString('id-ID');
  }
}

// ============================================
// AMBIL LOKASI GPS
// ============================================

function ambilLokasi() {
  if (!navigator.geolocation) {
    alert("Browser anda tidak mendukung Geolocation");
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      const alamat = document.getElementById("alamat");
      if (alamat) {
        alamat.value = `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`;
      }
    },
    (error) => {
      console.error("Error mengambil lokasi:", error);
      alert("Gagal mengambil lokasi. Pastikan izin lokasi sudah diberikan.");
    }
  );
}

// ============================================
// NOTIFIKASI KURIR
// ============================================

function notification() {
  const pesanNotif = `
  🚚 Kurir Sedang Menuju Lokasi Kamu
  Estimasi: 10-15 menit
  Nomor Kurir: +6283191008971
  `;
  alert(pesanNotif);
}

// ============================================
// HUBUNGI CUSTOMER SERVICE
// ============================================

function hubungiKami() {
  const waNumber = "6283191008971";
  const message = "Halo, saya ingin menghubungi Customer Service Delivery Express Selatpanjang";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(waUrl, '_blank');
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

function loadBottomNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.bottom-nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentPage) || 
        (currentPage === '' && link.getAttribute('href').includes('index'))) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// SERVICE WORKER REGISTRATION
// ============================================

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('✅ Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed:', err));
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff3b3b';
      isValid = false;
    } else {
      input.style.borderColor = '#22c55e';
    }
  });
  
  return isValid;
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

window.appFunctions = {
  hitungOngkir,
  ambilLokasi,
  notification,
  hubungiKami,
  validateForm
};
