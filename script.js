"use strict";

const copyrightEl = document.querySelector(".copyright");
const linkResume = document.querySelector(".resume--link");

// const aboutRightContainer = document.querySelector(".about--right-container");
// const aboutLeftContainer = document.querySelector(".about--left-container");
const aboutGrid = document.getElementById("about-grid");
const aboutCenterContainer = document.querySelector(".about--center-container");

const ABOUT_ME = [
  {
    icon: "home-outline",
    title: "Graduated High School",
    description: "Grew up in Eugene, OR. Graduated from Sheldon High School in 2016",
    date: "Jun '16",
  },
  {
    icon: "settings-outline",
    title: "Controls Engineering Intern",
    description: "Worked under a senior engineer for a small engineering firm, aiding in schematic design and PLC programming",
    date: "Jun '16",
  },
  {
    icon: "hardware-chip-outline",
    title: "Intern @ Intel",
    description: "Worked on a variety of projects ranging from hardware failure analysis to web application development",
    date: "Mar '19",
  },
  {
    icon: "school-outline",
    title: "OSU Grad",
    description: "3.95 GPA in Electrical & Computer Engineering (minor in Computer Science)",
    date: "Jun '20",
  },
  {
    icon: "flash-outline",
    title: "Intern @ SSOE",
    description: "Learned power distribution engineering in construction projects for large tech companies",
    date: "Jun '20",
  },
  {
    icon: "battery-charging-outline",
    title: "Electrical Engineer @ SSOE",
    description: "Worked on a variety of projects doing 3D modeling, lighting calcs, and electrical design",
    date: "Dec '20",
  },
  {
    icon: "desktop-outline",
    title: "Career Change - Web Dev",
    description: "Independently learned HTML, CSS, JavaScript, and React",
    date: "Jan '22",
  },
  {
    icon: "code-slash-outline",
    title: "Web Developer @ CSI",
    description: "Worked on two web applications using technologies like React, Laravel, MySQL, and Docker",
    date: "May '22",
  },
  {
    icon: "paper-plane-outline",
    title: "Onward & Upward",
    description: "Looking for that next opportunity for growth and development",
    date: "Present",
  }
]

const WINDOW_MIN_WIDTH = 600;

function generateCopyright() {
  const date = new Date();
  const year = date.getFullYear();

  const copyrightMessage = `\&copy; ${year} by Isaac Grossberg. All rights reserved.`;
  copyrightEl.innerHTML = copyrightMessage;
}
generateCopyright();

// Window load
window.addEventListener("load", function () {
  // Adjust resume link for mobile view
  linkResume.addEventListener("click", function (e) {
    if (window.innerWidth < WINDOW_MIN_WIDTH) {
      e.preventDefault();
      window.location.href = "./docs/Grossberg-resume-03-22.pdf";
    }
  });

  buildAboutMe();

  const evenBoxes = this.document.querySelectorAll(".about--box:nth-child(even)");
  const oddBoxes = this.document.querySelectorAll(".about--box:nth-child(odd)");

  evenBoxes.forEach((box) => {
    respondToVisibility(box, (visible) => {
      if (visible) {
        box.classList.add("no-translate");
      } else {
        box.classList.remove("no-translate");
      }
    });
  });

  oddBoxes.forEach((box) => {
    respondToVisibility(box, (visible) => {
      if (visible) {
        box.classList.add("no-translate");
      } else {
        box.classList.remove("no-translate");
      }
    });
  });

});

function buildAboutMe() {
  // Build out each section
  ABOUT_ME.forEach((section, idx) => {

    /** Build side elements **/
    const aboutBox = document.createElement("div");
    aboutBox.className = "about--box";

    const aboutIcon = document.createElement("ion-icon");
    aboutIcon.className = "about--icon";
    aboutIcon.name = section.icon;

    const aboutText = document.createElement("div");
    aboutText.className = "about--text";

    const aboutTextMain = document.createElement("h3");
    aboutTextMain.className = "about--text-main";
    aboutTextMain.innerHTML = section.title;

    const aboutTextSub = document.createElement("p");
    aboutTextSub.className = "about--text-sub";
    aboutTextSub.innerHTML = section.description;

    const mobileDate = document.createElement("p");
    mobileDate.innerText = section.date;
    mobileDate.className = "mobile-date";

    /** Combine side elements **/
    aboutBox.appendChild(aboutIcon);
    aboutBox.appendChild(aboutText);
    aboutText.appendChild(mobileDate);
    aboutText.appendChild(aboutTextMain);
    aboutText.appendChild(aboutTextSub);

    /** Build timeline elements **/
    const aboutTimelineText = document.createElement("div");
    aboutTimelineText.className = "about--timeline-text";

    const aboutTimelineTextP = document.createElement("p");
    aboutTimelineTextP.innerText = section.date;

    const aboutTimelineTextDiv = document.createElement("div");

    /** Combine timeline elements **/
    aboutTimelineText.appendChild(aboutTimelineTextP);
    aboutTimelineText.appendChild(aboutTimelineTextDiv);

    /** Add everything to the DOM **/
    aboutGrid.appendChild(aboutBox);
    aboutCenterContainer.appendChild(aboutTimelineText);

  });
}

// TODO: Fix this so it slides in on element visibility
function respondToVisibility(element, callback) {
  var options = {
    root: document.documentElement,
  };

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log(entry);
      // callback if element is visible
      callback(entry.isIntersecting);
    });
  }, options);

  observer.observe(element);
}

