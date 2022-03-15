"use strict";

const copyrightEl = document.querySelector(".copyright");

function generateCopyright() {
  const date = new Date();
  const year = date.getFullYear();

  const copyrightMessage = `\&copy; ${year} by Isaac Grossberg. All rights reserved.`;
  copyrightEl.innerHTML = copyrightMessage;
}
generateCopyright();
