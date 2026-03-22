/* =========================
   AMBIL DATA DARI LOCALSTORAGE
========================= */
const data = JSON.parse(localStorage.getItem("orderData"));

if (data) {
  document.getElementById("rUser").innerText = data.username;
  document.getElementById("rService").innerText = data.service;
  document.getElementById("rQty").innerText = data.qty;
  document.getElementById("rTotal").innerText = data.total;
  document.getElementById("payAmount").innerText = data.total;
}

/* =========================
   TIMER REAL (ANTI RELOAD RESET)
========================= */
const timerEl = document.getElementById("timer");

let endTime = localStorage.getItem("paymentEndTime");

if (!endTime) {
  endTime = Date.now() + 7 * 60 * 1000;
  localStorage.setItem("paymentEndTime", endTime);
} else {
  endTime = parseInt(endTime);
}

const countdown = setInterval(() => {
  const now = Date.now();
  let remaining = Math.floor((endTime - now) / 1000);

  if (remaining <= 0) {
    clearInterval(countdown);
    timerEl.innerText = "Waktu Habis";

    // ⏳ DELAY 2 DETIK SEBELUM RESET
    setTimeout(() => {
      localStorage.removeItem("orderData");
      localStorage.removeItem("paymentEndTime");
      localStorage.removeItem("paymentStartTime");

      alert("Waktu pembayaran habis!");
      window.location.href = "../index.html";
    }, 2000);

    return;
  }

  let minutes = Math.floor(remaining / 60);
  let seconds = remaining % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerEl.innerText = `${minutes}:${seconds}`;
}, 1000);

/* =========================
   CONFIRM BOX (40 DETIK REAL)
========================= */
const confirmBox = document.getElementById("confirmBox");

let startTime = localStorage.getItem("paymentStartTime");

if (!startTime) {
  startTime = Date.now();
  localStorage.setItem("paymentStartTime", startTime);
} else {
  startTime = parseInt(startTime);
}

const checkConfirmBox = () => {
  const now = Date.now();
  const diff = now - startTime;

  if (diff >= 40000) {
    if (confirmBox) confirmBox.style.display = "block";
  } else {
    setTimeout(checkConfirmBox, 1000);
  }
};

checkConfirmBox();

/* =========================
   POPUP KONFIRMASI ADMIN
========================= */
const confirmAdminBtn = document.getElementById("confirmAdminBtn");
const popup = document.getElementById("popupConfirm");
const cancelBtn = document.getElementById("cancelConfirm");
const sendBtn = document.getElementById("sendWa");

if (confirmAdminBtn) {
  confirmAdminBtn.onclick = () => {
    if (popup) popup.style.display = "flex";
  };
}

if (cancelBtn) {
  cancelBtn.onclick = () => {
    if (popup) popup.style.display = "none";
  };
}

if (sendBtn) {
  sendBtn.onclick = () => {
    const text = `Halo Admin Lannefy,%0ASaya sudah melakukan pembayaran.%0A%0AData:%0AUsername: ${data?.username}%0ALayanan: ${data?.service}%0APesanan: ${data?.qty}%0ATotal: ${data?.total}%0A%0ATerima kasih.`;

    window.open(`https://wa.me/6283894934396?text=${text}`, "_blank");
  };
}

/* =========================
   COPY NOMOR + TOAST
========================= */
const copyBtn = document.getElementById("copyDana");
const toast = document.getElementById("toast");

if (copyBtn) {
  copyBtn.onclick = () => {
    const number = document.getElementById("danaNumber").innerText;

    navigator.clipboard.writeText(number).then(() => {
      if (toast) {
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      }
    });
  };
}