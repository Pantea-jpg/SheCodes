const menu = document.getElementById("sideMenu");
const toggle = document.getElementById("menuToggle");
const closeBtn = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

const open = () => {
  menu.classList.add("open");
  overlay.classList.add("show");
};

const close = () => {
  menu.classList.remove("open");
  overlay.classList.remove("show");
};

toggle.addEventListener("click", open);
closeBtn.addEventListener("click", close);
overlay.addEventListener("click", close);
