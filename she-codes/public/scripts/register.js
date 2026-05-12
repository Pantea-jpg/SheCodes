"use strict";

function showError(input, msg) {
  input.classList.add("input-error");
  input.classList.remove("input-ok");

  let span = input.parentElement.querySelector(".field-error");
  if (!span) {
    span = document.createElement("span");
    span.className = "field-error";
    input.parentElement.appendChild(span);
  }
  span.textContent = msg;
}

function showOk(input) {
  input.classList.remove("input-error");
  input.classList.add("input-ok");

  const span = input.parentElement.querySelector(".field-error");
  if (span) span.textContent = "";
}

function clearState(input) {
  input.classList.remove("input-error", "input-ok");
  const span = input.parentElement.querySelector(".field-error");
  if (span) span.textContent = "";
}


const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const form = document.querySelector("form");


function validateFname() {
  if (!fname.value.trim()) {
    showError(fname, "Voornaam is verplicht.");
    return false;
  }
  showOk(fname);
  return true;
}

function validateLname() {
  if (!lname.value.trim()) {
    showError(lname, "Achternaam is verplicht.");
    return false;
  }
  showOk(lname);
  return true;
}

function validateUsername() {
  const v = username.value.trim();
  if (!v) {
    showError(username, "Gebruikersnaam is verplicht.");
    return false;
  }
  if (v.length < 3) {
    showError(username, "Minimaal 3 tekens.");
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(v)) {
    showError(username, "Alleen letters, cijfers en _.");
    return false;
  }
  showOk(username);
  return true;
}

function validateEmail() {
  const v = email.value.trim();
  if (!v) {
    showError(email, "E-mailadres is verplicht.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    showError(email, "Voer een geldig e-mailadres in.");
    return false;
  }
  showOk(email);
  return true;
}

function validatePassword() {
  const v = password.value;
  if (!v) {
    showError(password, "Wachtwoord is verplicht.");
    return false;
  }
  if (v.length < 8) {
    showError(password, "Minimaal 8 tekens vereist.");
    return false;
  }
  if (!/[A-Z]/.test(v)) {
    showError(password, "Minimaal één hoofdletter.");
    return false;
  }
  if (!/[0-9]/.test(v)) {
    showError(password, "Minimaal één cijfer.");
    return false;
  }
  showOk(password);
  if (confirm.value) validateConfirm();
  return true;
}

function validateConfirm() {
  if (!confirm.value) {
    showError(confirm, "Bevestig je wachtwoord.");
    return false;
  }
  if (confirm.value !== password.value) {
    showError(confirm, "Wachtwoorden komen niet overeen.");
    return false;
  }
  showOk(confirm);
  return true;
}


fname.addEventListener("blur", validateFname);
fname.addEventListener("input", () =>
  fname.value.trim() ? validateFname() : clearState(fname),
);

lname.addEventListener("blur", validateLname);
lname.addEventListener("input", () =>
  lname.value.trim() ? validateLname() : clearState(lname),
);

username.addEventListener("blur", validateUsername);
username.addEventListener("input", () =>
  username.value.trim() ? validateUsername() : clearState(username),
);

email.addEventListener("blur", validateEmail);
email.addEventListener("input", () =>
  email.value.trim() ? validateEmail() : clearState(email),
);

password.addEventListener("blur", validatePassword);
password.addEventListener("input", () =>
  password.value ? validatePassword() : clearState(password),
);

confirm.addEventListener("blur", validateConfirm);
confirm.addEventListener("input", () =>
  confirm.value ? validateConfirm() : clearState(confirm),
);


form.addEventListener("submit", function (e) {
  const valid =
    validateFname() &
    validateLname() &
    validateUsername() &
    validateEmail() &
    validatePassword() &
    validateConfirm();

  if (!valid) {
    e.preventDefault();
    const first = form.querySelector(".input-error");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
