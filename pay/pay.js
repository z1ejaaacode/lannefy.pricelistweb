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
   TIMER 7 MENIT
========================= */
let time = 420;
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerEl.innerText = `${minutes}:${seconds}`;

  time--;

  if (time < 0) {
    clearInterval(countdown);
    timerEl.innerText = "Waktu Habis";

    localStorage.removeItem("orderData");
    alert("Waktu pembayaran habis!");
    window.location.href = "../index.html";
  }
}, 1000);

/* =========================
   CONFIRM BOX (40 DETIK)
========================= */
const confirmBox = document.getElementById("confirmBox");

setTimeout(() => {
  if (confirmBox) {
    confirmBox.style.display = "block";
    confirmBox.scrollIntoView({ behavior: "smooth" });
  }
}, 40000);

/* =========================
   POPUP
========================= */
const confirmAdminBtn = document.getElementById("confirmAdminBtn");
const popup = document.getElementById("popupConfirm");
const cancelBtn = document.getElementById("cancelConfirm");
const sendBtn = document.getElementById("sendWa");

if (confirmAdminBtn) {
  confirmAdminBtn.onclick = () => {
    popup.style.display = "flex";
  };
}

if (cancelBtn) {
  cancelBtn.onclick = () => {
    popup.style.display = "none";
  };
}

if (sendBtn) {
  sendBtn.onclick = () => {
    const text = `Halo Admin Lannefy,%0ASaya sudah melakukan pembayaran.%0A%0AData:%0AUsername: ${data?.username}%0ALayanan: ${data?.service}%0APesanan: ${data?.qty}%0ATotal: ${data?.total}%0A%0ATerima kasih.`;

    window.open(`https://wa.me/6283894934396?text=${text}`, "_blank");
  };
}

/* =========================
   COPY + TOAST
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