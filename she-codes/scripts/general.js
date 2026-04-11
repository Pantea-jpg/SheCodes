"use strict";

const loginButton = document.querySelector("#login");
const modal = document.getElementById("loginModal");
const close1 = document.querySelector(".close-1");
const close3 = document.querySelector(".close-3");
const logo = document.querySelector(".logo");
const loginModalButton = document.querySelector(".login-button");
const errormessage = document.querySelector("#error-success");
const infoModal = document.querySelector("#infoModal");
const learnMore = document.querySelector("#learn-more");

const usernameTest = "pantea@ap.be";
const passwordTest = "1234";

if (!window.location.pathname.includes("landingPage.html")) {
  logo.addEventListener("click", () => {
    window.location.href = "./searchPage.html";
  });
}

learnMore.addEventListener("click", (e) => {
  e.preventDefault();
  infoModal.style.display = "flex";
  close3.addEventListener("click", () => {
    infoModal.style.display = "none";
  });
});

loginButton.addEventListener("click", () => {
  errormessage.textContent = "";
  document.querySelector("#password").value = "";
  document.querySelector("#username").value = "";
  errormessage.className = "";
  modal.style.display = "flex";
});

loginModalButton.addEventListener("click", () => {
  const userName = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  errormessage.className = "";

  if (userName !== usernameTest || password !== passwordTest) {
    errormessage.classList.add("red");
    errormessage.textContent = "Uw gegevens klopt niet!";
  } else {
    errormessage.classList.add("green");
    errormessage.textContent = "Je hebt successful ingelogd!";
    setTimeout(() => {
      window.location.href = "./searchPage.html";
    }, 2000);
  }
});

close1.addEventListener("click", () => {
  modal.style.display = "none";
});
