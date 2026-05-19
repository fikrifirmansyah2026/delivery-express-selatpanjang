/* =========================================
   DELIVERY EXPRESS SELATPANJANG 2026
   ORDER SYSTEM
========================================= */

import {
database
}
from "./firebase-config.js";

import {
ref,
push,
set,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

/* =========================================
   ELEMENT
========================================= */

const orderForm =
document.getElementById("orderForm");

const submitButton =
document.querySelector(".btn");

/* =========================================
   WHATSAPP ADMIN
========================================= */

const ADMIN_WHATSAPP =
"6283191008971";

/* =========================================
   HARGA OTOMATIS
========================================= */

function getPrice(service){

switch(service){

case "Makanan":
return 15000;

case "Paket":
return 25000;

case "Belanja":
return 20000;

case "Express":
return 30000;

default:
return 15000;

}

}

/* =========================================
   GENERATE ORDER ID
========================================= */

function generateOrderId(){

const random =
Math.floor(Math.random() * 999999);

return "DX-" + random;

}

/* =========================================
   TOAST
========================================= */

function showToast(message){

const toast =
document.createElement("div");

toast.innerText = message;

toast.style.position = "fixed";
toast.style.bottom = "100px";
toast.style.left = "50%";
toast.style.transform =
"translateX(-50%)";

toast.style.background =
"#22c55e";

toast.style.color =
"white";

toast.style.padding =
"14px 20px";

toast.style.borderRadius =
"16px";

toast.style.fontSize =
"13px";

toast.style.fontWeight =
"600";

toast.style.zIndex =
"9999";

toast.style.boxShadow =
"0 10px 30px rgba(0,0,0,0.3)";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2500);

}

/* =========================================
   LOADING BUTTON
========================================= */

function setLoading(isLoading){

if(!submitButton) return;

if(isLoading){

submitButton.disabled = true;

submitButton.innerHTML =
"Memproses...";

submitButton.style.opacity =
"0.7";

}else{

submitButton.disabled = false;

submitButton.innerHTML =
"Kirim Order";

submitButton.style.opacity =
"1";

}

}

/* =========================================
   SUBMIT ORDER
========================================= */

if(orderForm){

orderForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

setLoading(true);

/* =========================
   GET VALUE
========================= */

const customer =
document.getElementById("customer").value.trim();

const phone =
document.getElementById("phone").value.trim();

const service =
document.getElementById("service").value;

const address =
document.getElementById("address").value.trim();

/* =========================
   VALIDATION
========================= */

if(
!customer ||
!phone ||
!service ||
!address
){

showToast(
"Lengkapi semua data"
);

setLoading(false);

return;

}

/* =========================
   ORDER DATA
========================= */

const orderId =
generateOrderId();

const orderPrice =
getPrice(service);

const orderData = {

orderId: orderId,

customer: customer,

phone: phone,

service: service,

address: address,

price: orderPrice,

status: "Pending",

createdAt:
new Date().toISOString(),

timestamp:
serverTimestamp()

};

/* =========================
   SAVE FIREBASE
========================= */

try{

const ordersRef =
ref(database,"orders");

const newOrder =
push(ordersRef);

await set(newOrder,orderData);

/* =========================
   SUCCESS
========================= */

showToast(
"Order berhasil dikirim"
);

/* =========================
   AUTO WHATSAPP
========================= */

const message =

`Halo Admin Delivery Express

Order Baru Masuk 🚀

ID Order:
${orderId}

Nama:
${customer}

WhatsApp:
${phone}

Layanan:
${service}

Alamat:
${address}

Harga:
Rp${orderPrice.toLocaleString("id-ID")}

Status:
Pending`;

const encodedMessage =
encodeURIComponent(message);

window.open(

`https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`,

"_blank"

);

/* =========================
   RESET FORM
========================= */

orderForm.reset();

}catch(error){

console.error(error);

showToast(
"Gagal mengirim order"
);

}

setLoading(false);

});

}

/* =========================================
   INSTALL PWA
========================================= */

let deferredPrompt;

window.addEventListener(
"beforeinstallprompt",
(e)=>{

e.preventDefault();

deferredPrompt = e;

console.log(
"PWA Install Ready"
);

});

/* =========================================
   ONLINE / OFFLINE STATUS
========================================= */

window.addEventListener(
"offline",
()=>{

showToast(
"Koneksi internet terputus"
);

});

window.addEventListener(
"online",
()=>{

showToast(
"Koneksi internet tersambung"
);

});

/* =========================================
   AUTO YEAR
========================================= */

console.log(
"🚀 Delivery Express 2026 Ready"
);
