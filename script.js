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

// Input akun
const robloxUsernameInput = document.getElementById("robloxUsername");
const robloxPasswordInput = document.getElementById("robloxPassword");
const gmailInput = document.getElementById("gmailUser");
const gmailPasswordInput = document.getElementById("gmailPassword");

// Anti Gmail button (AMAN kalau belum ada)
const antiGmailBtn = document.getElementById("antiGmailBtn");

/* =========================
   DEFAULT STATE
========================= */
robuxSection.style.display = "block";
premiumSection.style.display = "none";
totalPriceEl.innerText = "Rp 0";

let selectedProduct = null;
let selectedPayment = null;
let antiGmailActive = false;

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
   ANTI GMAIL TOGGLE
========================= */
if (antiGmailBtn) {
  antiGmailBtn.addEventListener("click", () => {
    antiGmailActive = !antiGmailActive;

    if (antiGmailActive) {
      antiGmailBtn.classList.add("active");
      antiGmailBtn.innerText = "ANTI GMAIL AKTIF";

      gmailInput.value = "";
      gmailPasswordInput.value = "";
      gmailInput.disabled = true;
      gmailPasswordInput.disabled = true;
    } else {
      antiGmailBtn.classList.remove("active");
      antiGmailBtn.innerText = "ANTI GMAIL";

      gmailInput.disabled = false;
      gmailPasswordInput.disabled = false;
    }
  });
}

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

  const robloxUsername = robloxUsernameInput.value.trim();
  const robloxPassword = robloxPasswordInput.value.trim();

  if (!robloxUsername || !robloxPassword) {
    alert("Username & Password Roblox wajib diisi");
    return;
  }

  let gmailFinal = "";
  let gmailPassFinal = "";

  if (antiGmailActive) {
    gmailFinal = "Anti Gmail";
    gmailPassFinal = "Anti Password";
  } else {
    const gmail = gmailInput.value.trim();
    const gmailPass = gmailPasswordInput.value.trim();

    if (!gmail || !gmailPass) {
      alert("isi dulu gmail, jika anda tidak puya gmaail silahkan click untuk tidak menggunakan gmail terimakasih");
      return;
    }

    gmailFinal = gmail;
    gmailPassFinal = gmailPass;
  }

  const nomorWA = "6281809730331";
  const totalHarga = totalPriceEl.innerText;

  const pesan =
`Halo kak 👋

Saya ingin melakukan pemesanan:

📦 Produk :
${selectedProduct}

💳 Metode Pembayaran :
${selectedPayment}

👤 Username Roblox :
${robloxUsername}

🔐 Password Roblox :
${robloxPassword}

📧 Gmail :
${gmailFinal}

🔑 Password Gmail :
${gmailPassFinal}

💰 Total :
${totalHarga}

Mohon diproses ya kak 🙏
Terima kasih.`;

  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
});

/* =========================
   KONSULTASI → WHATSAPP
========================= */
consultBtn.addEventListener("click", () => {
  const nomorWA = "6281809730331";
  const pesan = "kak saya ingin konsultasi";

  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
});
