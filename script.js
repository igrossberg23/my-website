"use strict";

const copyrightEl = document.querySelector(".copyright");
const linkResume = document.querySelector(".resume--link");

const WINDOW_MIN_WIDTH = 600;

function generateCopyright() {
  const date = new Date();
  const year = date.getFullYear();

  const copyrightMessage = `\&copy; ${year} by Isaac Grossberg. All rights reserved.`;
  copyrightEl.innerHTML = copyrightMessage;
}
generateCopyright();

linkResume.addEventListener("click", function (e) {
  if (window.innerWidth < WINDOW_MIN_WIDTH) {
    e.preventDefault();
    window.location.href = "./docs/Grossberg-resume-03-22.pdf";
  }
});
