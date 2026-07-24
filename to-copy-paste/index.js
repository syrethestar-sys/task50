// The 20-minute core (MVP)
// Live webcam preview on the page
// A row of filter buttons (grayscale, sepia, blur, invert, etc.)
// that instantly change how the preview looks
// At least one slider (e.g. brightness) for an adjustable filter
// A "snap" button that saves the current filtered frame as an image

//getting video
const videoElement = document.getElementById("webcam");
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    videoElement.srcObject = stream;
  })
  .catch(function (err) {
    console.log("No camera access dumbass");
  });

//
const normal = document.getElementById("normal");
const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const invert = document.getElementById("invert");
const blur = document.getElementById("blur");
const slider = document.getElementById("brightness");
const snap = document.getElementById("snap");
const canvas = document.getElementById("canvas");
const gallery = document.getElementById("gallery");

let currentFilter = "none";

//filter clicks
normal.addEventListener("click", function () {
  currentFilter = "none";
  applyFilter();
});
grayscale.addEventListener("click", function () {
  currentFilter = "grayscale(100%)";
  applyFilter();
});
sepia.addEventListener("click", function () {
  currentFilter = "sepia(100%)";
  applyFilter();
});
invert.addEventListener("click", function () {
  currentFilter = "invert(100%)";
  applyFilter();
});
blur.addEventListener("click", function () {//* *//


});

//slider
slider.addEventListener("input", function () {
  applyFilter();
});

//applying filter
function applyFilter() {//* *//
  





  // ` ашиглах үед $ {},"Энэ дотор байгаа зүйлийг энгийн текст биш,
  // JavaScript-ийн код/хувьсагч гэж ойлгоод УТГЫГ НЬ ГАРГАЖ ИРЭЭРЭЙ!"

  // Компьютер: "Аан, ${ } дотор brightnessValue гэдэг нэртэй хувьсагч байна.
  // Түүний одоогийн утга нь 80 юм байна. Тэгэхээр үүнийг 80 гэдэг тоогоор нь сольчихъё!"
  // Үр дүн: "brightness(80%)" болж хувирна.

  // videoElement.style.filter = "brightness("+currentValue+"%)"
  // videoElement.style.filter = **"brightness("**  +   currentValue +   **"%)"**
}

//Snap button & Saved photos
snap.addEventListener("click", function () { //* *//
  







});