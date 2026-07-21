// WEBCAM INITIALIZATION
const videoElement = document.getElementById("webcam");

async function initWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Camera access error:", error);
    alert("Please allow camera access to use SnapBooth!");
  }
}
window.addEventListener("DOMContentLoaded", initWebcam);

// FILTER & BRIGHTNESS CONTROLS
const image = videoElement;
const slider = document.getElementById("brightness-slider");
const valueText = document.getElementById("brightness-value");
const fill = document.querySelector(".slider-fill");
const thumb = document.querySelector(".slider-thumb");
const filterButtons = document.querySelectorAll(".filter-scroll .filter-thumb");

const activeFilters = {
  brightness: 0.5,
  grayscale: false,
  sepia: false,
  blur: false,
  invert: false,
  nightVision: false,
  ice: false,
};

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

// Slider Control
function updateSlider() {
  const value = slider.value;
  valueText.textContent = `${value}%`;
  fill.style.width = `${value}%`;
  thumb.style.left = `${value}%`;

  activeFilters.brightness = value / 70;
  applyAllFilters();
}
slider.addEventListener("input", updateSlider);

// Filter Button
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

// MIRROR TOGGLE
const mirrorButton = document.querySelector(".icon-btn");

mirrorButton.addEventListener("click", () => {
  mirrorButton.classList.toggle("active");
  if (mirrorButton.classList.contains("active")) {
    image.style.transform = "scaleX(1)"; // Unmirror if active
  } else {
    image.style.transform = "scaleX(-1)"; // Mirrored by default
  }
});

// SHUTTER CAPTURE
const photoBtn = document.getElementById("shutter");
const canvas = document.getElementById("canvas");
const photosContainer = document.getElementById("photos");
const galleryToggleBtn = document.getElementById("gallery"); // outer icon button
const closePhotosBtn = document.getElementById("close-photos");

photoBtn.addEventListener("click", function () {
  if (!canvas) return;

  canvas.width = videoElement.videoWidth || 640;
  canvas.height = videoElement.videoHeight || 480;

  const photoCtx = canvas.getContext("2d");
  photoCtx.save();

  const isFlipped =
    image.style.transform === "scaleX(-1)" || image.style.transform === "";
  if (isFlipped) {
    photoCtx.translate(canvas.width, 0);
    photoCtx.scale(-1, 1);
  }
  photoCtx.filter = image.style.filter || "none";

  photoCtx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  photoCtx.restore();

  // Generate the actual image data URL from the canvas (was missing before)
  const imageDataUrl = canvas.toDataURL("image/png");

  // Wrap each photo + its download button together
  const photoCard = document.createElement("div");
  photoCard.classList.add("gallery-card");

  const newImg = document.createElement("img");
  newImg.src = imageDataUrl;
  newImg.alt = "Captured Photo";
  newImg.classList.add("gallery-thumb");

  const downloadBtn = document.createElement("a");
  downloadBtn.classList.add("download-btn");
  downloadBtn.href = imageDataUrl;
  downloadBtn.download = `snapbooth-${Date.now()}.png`;
  downloadBtn.textContent = "⬇ Download";

  photoCard.appendChild(newImg);
  photoCard.appendChild(downloadBtn);
  photosContainer.appendChild(photoCard);
});

// GALLERY OPEN/CLOSE
// (renamed to avoid re-declaring the same variable name twice)
galleryToggleBtn.addEventListener("click", function (e) {
  if (e.target.closest("#photos")) return;
  photosContainer.classList.add("active");
});

closePhotosBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  photosContainer.classList.remove("active");
});