/* =========================================
   DELIVERY EXPRESS SELATPANJANG 2026
   FIREBASE CONFIG
========================================= */

/* =========================================
   IMPORT FIREBASE
========================================= */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getDatabase }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getStorage }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

/* =========================================
   FIREBASE CONFIG
========================================= */
/*
   GANTI SEMUA DATA DI BAWAH
   DENGAN CONFIG FIREBASE KAMU
*/

const firebaseConfig = {

apiKey: "ISI_API_KEY",

authDomain:
"delivery-express-2026.firebaseapp.com",

databaseURL:
"https://delivery-express-2026-default-rtdb.firebaseio.com",

projectId:
"delivery-express-2026",

storageBucket:
"delivery-express-2026.appspot.com",

messagingSenderId:
"123456789",

appId:
"1:123456789:web:abcdef123456"

};

/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app =
initializeApp(firebaseConfig);

/* =========================================
   DATABASE
========================================= */

const database =
getDatabase(app);

/* =========================================
   AUTH
========================================= */

const auth =
getAuth(app);

/* =========================================
   STORAGE
========================================= */

const storage =
getStorage(app);

/* =========================================
   EXPORT
========================================= */

export {

app,
database,
auth,
storage

};

/* =========================================
   FIREBASE STATUS
========================================= */

console.log(
"🔥 Firebase 2026 Connected Successfully"
);
