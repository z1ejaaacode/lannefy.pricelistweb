/* =========================
   SIDEBAR SYSTEM
========================= */
const btn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

btn.onclick = () => {
  sidebar.classList.add("show");
  overlay.classList.add("show");
  btn.classList.add("active");
  document.body.classList.add("lock");
  document.body.classList.add("blur");
};

overlay.onclick = () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
  btn.classList.remove("active");
  document.body.classList.remove("lock");
  document.body.classList.remove("blur");
};

sidebar.onclick = (e) => { e.stopPropagation(); };

const menuLinks = document.querySelectorAll(".menu a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    btn.classList.remove("active");
    document.body.classList.remove("lock");
    document.body.classList.remove("blur");
  });
});

/* =========================
   PRICE SYSTEM
========================= */
const optionBtn = document.getElementById("optionBtn");
const optionList = document.getElementById("optionList");
const optionItems = document.querySelectorAll(".option-item");
const priceContents = document.querySelectorAll(".price-content");
const selectedText = document.getElementById("selectedOption");

if (optionBtn) {
  optionBtn.onclick = () => {
    optionList.style.display =
      optionList.style.display === "block" ? "none" : "block";
  };
}

optionItems.forEach(item => {
  item.onclick = () => {
    const target = item.getAttribute("data-target");
    if (selectedText) selectedText.innerText = item.innerText;
    optionList.style.display = "none";
    priceContents.forEach(pc => pc.style.display = "none");
    const selected = document.getElementById(target);
    if (selected) selected.style.display = "block";
  };
});

const priceItems = document.querySelectorAll(".price-item");
priceItems.forEach(item => {
  item.onclick = () => {
    priceItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  };
});

/* =========================
   ORDER SYSTEM
========================= */
const orderBtn = document.getElementById("orderBtn");
const popup = document.getElementById("popup");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

const usernameInput = document.getElementById("username");
const detailUser = document.getElementById("detailUser");
const detailService = document.getElementById("detailService");
const detailPrice = document.getElementById("detailPrice");
const detailPayment = document.getElementById("detailPayment");
const detailTotal = document.getElementById("detailTotal");

// =========================
// Metode Pembayaran
// =========================
let selectedPayment = "Dana";

const paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    selectedPayment = radio.value;
  });
});

// =========================
// OPEN POPUP
// =========================
orderBtn.onclick = () => {
  const username = usernameInput.value;
  const selectedOption = selectedText.innerText;
  const activePrice = document.querySelector(".price-item.active");

  if (!username || selectedOption === "Pilih Layanan" || !activePrice) {
    alert("Lengkapi data dulu!");
    return;
  }

  const qty = activePrice.children[0].innerText;
  const price = activePrice.children[1].innerText;

  // isi data utama
  detailUser.innerText = username;
  detailService.innerText = selectedOption;
  detailPrice.innerText = qty;

  // payment
  const selectedRadio = document.querySelector('input[name="payment"]:checked');

  if (selectedRadio) {
    const logo = selectedRadio.dataset.logo;
    const name = selectedRadio.value;

    detailPayment.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;justify-content:flex-end;">
        <img src="${logo}" style="width:20px;height:20px;object-fit:contain;">
        <span>${name}</span>
      </div>
    `;
  } else {
    detailPayment.innerText = "-";
  }

  detailTotal.innerText = price;

  popup.style.display = "flex";
  document.body.classList.add("lock");
  document.body.classList.add("blur");
};

// =========================
// CANCEL
// =========================
cancelBtn.onclick = () => {
  popup.style.display = "none";
  document.body.classList.remove("lock");
  document.body.classList.remove("blur");
};

// =========================
// CONFIRM + LOCAL STORAGE (FIX UTAMA)
// =========================
confirmBtn.onclick = () => {
  document.body.classList.remove("lock");
  document.body.classList.remove("blur");

  // ambil data dari popup
  const username = detailUser.innerText;
  const service = detailService.innerText;
  const qty = detailPrice.innerText;
  const total = detailTotal.innerText;

  // simpan ke localStorage
  const orderData = {
    username: username,
    service: service,
    qty: qty,
    total: total
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  // redirect
  if (selectedPayment === "Dana") window.location.href = "pay/paydana.html";
  else if (selectedPayment === "Gopay") window.location.href = "pay/paygopay.html";
  else if (selectedPayment === "Qris") window.location.href = "pay/payqr.html";
};

/* =========================
   REKOMENDASI CLICK
========================= */
const recomItems = document.querySelectorAll(".recom-item");

recomItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target");

    // set text
    if (selectedText) {
      selectedText.innerText = item.innerText;
    }

    // buka price list sesuai target
    priceContents.forEach(pc => pc.style.display = "none");

    const selected = document.getElementById(target);
    if (selected) selected.style.display = "block";

    // auto scroll ke price
    document.getElementById("price").scrollIntoView({
      behavior: "smooth"
    });
  });
});