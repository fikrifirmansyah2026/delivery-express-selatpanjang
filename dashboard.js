/* =========================
   DELIVERY EXPRESS 2026
   DASHBOARD JS
========================= */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getDatabase,
ref,
onValue,
update,
remove
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

apiKey: "ISI_API_KEY",
authDomain: "ISI_AUTH_DOMAIN",
databaseURL: "ISI_DATABASE_URL",
projectId: "ISI_PROJECT_ID",
storageBucket: "ISI_STORAGE_BUCKET",
messagingSenderId: "ISI_SENDER_ID",
appId: "ISI_APP_ID"

};

/* =========================
   INITIALIZE FIREBASE
========================= */

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

/* =========================
   ELEMENT
========================= */

const tbody = document.querySelector("tbody");

const searchInput = document.querySelector(".search");

/* =========================
   STATUS CLASS
========================= */

function getStatusClass(status){

switch(status){

case "Pending":
return "pending";

case "Process":
return "process";

case "Done":
return "done";

default:
return "pending";

}

}

/* =========================
   RENDER TABLE
========================= */

function renderOrders(data){

if(!tbody) return;

tbody.innerHTML = "";

if(!data){

tbody.innerHTML = `
<tr>
<td colspan="6"
style="text-align:center;padding:30px;color:#94a3b8;">
Belum ada order
</td>
</tr>
`;

return;

}

Object.keys(data).forEach((key)=>{

const order = data[key];

tbody.innerHTML += `

<tr>

<td>${key}</td>

<td>${order.customer || "-"}</td>

<td>${order.service || "-"}</td>

<td>
<span class="status ${getStatusClass(order.status)}">
${order.status || "Pending"}
</span>
</td>

<td>
Rp${Number(order.price || 0).toLocaleString("id-ID")}
</td>

<td>

<button class="btn"
onclick="updateOrderStatus('${key}','Process')">

Process

</button>

<button class="btn"
onclick="updateOrderStatus('${key}','Done')">

Done

</button>

<button class="btn"
onclick="deleteOrder('${key}')">

Hapus

</button>

</td>

</tr>

`;

});

}

/* =========================
   REALTIME LISTENER
========================= */

const ordersRef = ref(db,"orders");

onValue(ordersRef,(snapshot)=>{

const data = snapshot.val();

renderOrders(data);

updateStats(data);

});

/* =========================
   UPDATE STATUS
========================= */

window.updateOrderStatus = function(id,status){

update(ref(db,`orders/${id}`),{

status: status

})
.then(()=>{

showToast(`Order ${id} diupdate`);

})
.catch((err)=>{

console.error(err);

});

};

/* =========================
   DELETE ORDER
========================= */

window.deleteOrder = function(id){

const confirmDelete =
confirm(`Hapus order ${id}?`);

if(!confirmDelete) return;

remove(ref(db,`orders/${id}`))

.then(()=>{

showToast(`Order ${id} dihapus`);

})
.catch((err)=>{

console.error(err);

});

};

/* =========================
   SEARCH ORDER
========================= */

if(searchInput){

searchInput.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

onValue(ordersRef,(snapshot)=>{

const data = snapshot.val() || {};

const filtered = {};

Object.keys(data).forEach((key)=>{

const order = data[key];

if(

key.toLowerCase().includes(value) ||

(order.customer || "")
.toLowerCase()
.includes(value) ||

(order.service || "")
.toLowerCase()
.includes(value)

){

filtered[key] = order;

}

});

renderOrders(filtered);

},{onlyOnce:true});

});

}

/* =========================
   UPDATE STATS
========================= */

function updateStats(data){

const cards =
document.querySelectorAll(".card h2");

if(!cards.length) return;

const totalOrders =
data ? Object.keys(data).length : 0;

let processCount = 0;

let doneCount = 0;

if(data){

Object.values(data).forEach((order)=>{

if(order.status === "Process")
processCount++;

if(order.status === "Done")
doneCount++;

});

}

cards[0].innerText = totalOrders;

cards[1].innerText = processCount;

cards[2].innerText =
`${doneCount}%`;

cards[3].innerText =
"24/7";

}

/* =========================
   TOAST
========================= */

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

toast.style.color = "white";

toast.style.padding =
"14px 18px";

toast.style.borderRadius =
"16px";

toast.style.fontSize =
"13px";

toast.style.zIndex =
"9999";

toast.style.boxShadow =
"0 10px 25px rgba(0,0,0,0.3)";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2500);

}

/* =========================
   AUTO REFRESH TITLE
========================= */

setInterval(()=>{

document.title =
`Dashboard • ${new Date().toLocaleTimeString()}`;

},1000);
