"use strict";

const close3 = document.querySelector(".close-3");
const logo = document.querySelector(".logo");
const infoModal = document.querySelector("#infoModal");
const learnMore = document.querySelector("#learn-more");
const modalContent = document.querySelector(".modal-content");

if (!window.location.pathname.includes("landingPage.ejs")) {
  logo.addEventListener("click", () => {
    window.location.href = "/search";
  });
}

learnMore.addEventListener("click", (e) => {
  e.preventDefault();
  infoModal.style.display = "flex";
  close3.addEventListener("click", () => {
    infoModal.style.display = "none";
  });
});
