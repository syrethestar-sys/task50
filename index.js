// CAM LIVE
const videoElement = document.getElementById("webcam");

async function initWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Камер холбоход алдаа гарлаа:", error);
    alert("Аппыг ажиллуулахын тулд камерын зөвшөөрөл олгоно уу!");
  }
}
window.addEventListener("DOMContentLoaded", initWebcam);

const image = document.getElementById("webcam");

//FILTER
const slider = document.getElementById("brightness-slider");
const valueText = document.getElementById("brightness-value");
const fill = document.querySelector(".slider-fill");
const thumb = document.querySelector(".slider-thumb");

const filterButtons = document.querySelectorAll(".filter-scroll .filter-thumb");

const activeFilters = {
  brightness: 1,
  grayscale: false,
  sepia: false,
  blur: false,
  invert: false,
  nightVision: false,
  ice: false,
};
//WHICH FILTER
function applyAllFilters() {
  let filterString = `brightness(${activeFilters.brightness})`;

  if (activeFilters.grayscale) filterString += " grayscale(100%)";
  if (activeFilters.sepia) filterString += " sepia(80%)";
  if (activeFilters.blur) filterString += " blur(2px)";
  if (activeFilters.invert) filterString += " invert(1)";

  if (activeFilters.nightVision)
    filterString +=
      " hue-rotate(90deg) saturate(300%) contrast(120%) brightness(0.8) sepia(100%) hue-rotate(50deg)";

  if (activeFilters.ice)
    filterString += " hue-rotate(180deg) saturate(150%) contrast(110%)";

  image.style.filter = filterString;
}

// SLIDER CONTROL
function updateSlider() {
  const value = slider.value;
  valueText.textContent = `${value}%`;
  fill.style.width = `${value}%`;
  thumb.style.left = `${value}%`;

  activeFilters.brightness = value / 100;
  applyAllFilters();
}
slider.addEventListener("input", updateSlider);

// BUTTON CONTROL
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    const filterName = button
      .querySelector(".filter-thumb-name")
      .textContent.trim()
      .toLowerCase();
    const isActive = button.classList.contains("active");

    if (filterName === "grayscale") activeFilters.grayscale = isActive;
    if (filterName === "sepia") activeFilters.sepia = isActive;
    if (filterName === "blur") activeFilters.blur = isActive;
    if (filterName === "invert") activeFilters.invert = isActive;
    if (filterName === "night vision") activeFilters.nightVision = isActive;
    if (filterName === "ice") activeFilters.ice = isActive;

    applyAllFilters();
  });
});
updateSlider();
// //Filter grayscale
// const button = document.querySelector(".filter-thumb");

// button.addEventListener("click", () => {
//   button.classList.toggle("active");
//   if (button.classList.contains("active")) {
//     image.style.filter =
//       "grayscale(100%) blur(0.5px) brightness(100%) sepia(80%) hue-rotate(90deg)";
//   } else {
//     image.style.filter = "none";
//   }
// });

// //SLIDER
// const slider = document.getElementById("brightness-slider");
// const valueText = document.getElementById("brightness-value");
// const fill = document.querySelector(".slider-fill");
// const thumb = document.querySelector(".slider-thumb");

// function updateSlider() {
//   const value = slider.value;

//   valueText.textContent = `${value}%`;

//   fill.style.width = `${value}%`;

//   thumb.style.left = `${value}%`;
//   const brightnessValue = 0.3 + (value / 100) * 0.9;
//   image.style.filter = `brightness(${brightnessValue})`;
// }

// slider.addEventListener("input", updateSlider);

// updateSlider();
//MIRROR BUTTON
const mirrorButton = document.querySelector(".icon-btn");

mirrorButton.addEventListener("click", () => {
  mirrorButton.classList.toggle("active");
  if (mirrorButton.classList.contains("active")) {
    image.style.transform = "scaleX(-1)";
  } else {
    image.style.transform = "scaleX(1)";
  }
});
