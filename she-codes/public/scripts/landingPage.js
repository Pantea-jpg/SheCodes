"use strict";

const projectsMusicMatch = document.querySelector(".projects.musicMatch");
const close1 = document.querySelector(".close-1");
const close2 = document.querySelector(".close-2");
const projectA = document.querySelector(".projects.project-a");
const projectB = document.querySelector(".projects.project-b");
const accessDenied = document.querySelector(".access-denied");
const errormessage = document.querySelector("#error-success");

projectA.addEventListener("click", () => {
  accessDenied.style.display = "flex";
  close2.addEventListener("click", () => {
    accessDenied.style.display = "none";
  });
});

projectB.addEventListener("click", () => {
  accessDenied.style.display = "flex";
  close2.addEventListener("click", () => {
    accessDenied.style.display = "none";
  });
});
