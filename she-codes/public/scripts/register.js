"use strict";

function showError(msg) {
  const el = document.getElementById("error-msg");
  el.textContent = "❌ " + msg;
  el.style.display = "block";
  document.getElementById("success-msg").style.display = "none";
}

function handleRegister() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const terms = document.getElementById("terms-check").checked;

  document.getElementById("error-msg").style.display = "none";
  document.getElementById("success-msg").style.display = "none";

  if (!fname || !lname || !username || !email || !password || !confirm) {
    return showError("Please fill in all fields.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return showError("Please enter a valid email address.");
  }
  if (password.length < 8) {
    return showError("Password must be at least 8 characters.");
  }
  if (password !== confirm) {
    return showError("Passwords do not match.");
  }
  if (!terms) {
    return showError("Please agree to the Terms of Service.");
  }

  const btn = document.querySelector(".register-btn");
  btn.textContent = "✓ Done!";
  btn.style.background = "#3a7a1a";
  btn.disabled = true;
  document.getElementById("success-msg").style.display = "block";
}
