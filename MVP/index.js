const mediaStream = document.getElementById("webcam");
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (Stream) {
    mediaStream.srcObject = Stream;
  })
  .catch(function (err) {
    console.log("No camera access dog");
  });

//filter
const normal = document.getElementById("normal");
const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const invert = document.getElementById("invert");
const blur = document.getElementById("blur");

//filter clicks
normal.addEventListener("click", function () {
  mediaStream.style.filter = "none";
});
grayscale.addEventListener("click", function () {
  mediaStream.style.filter = "grayscale(100%)";
});
sepia.addEventListener("click", function () {
  mediaStream.style.filter = "sepia(100%)";
});
invert.addEventListener("click", function () {
  mediaStream.style.filter = "invert(100%)";
});
blur.addEventListener("click", function () {
  mediaStream.style.filter = "blur(2px)";
});

//slider
const slider = document.getElementById("brightness");

slider.addEventListener("input", function () {
  const currentValue = slider.value;
  mediaStream.style.filter = `brightness(${currentValue}%)`;
  // ` ашиглах үед $ {},"Энэ дотор байгаа зүйлийг энгийн текст биш,
  // JavaScript-ийн код/хувьсагч гэж ойлгоод УТГЫГ НЬ ГАРГАЖ ИРЭЭРЭЙ!"

  // Компьютер: "Аан, ${ } дотор currentValue гэдэг нэртэй хувьсагч байна.
  // Түүний одоогийн утга нь 80 юм байна. Тэгэхээр үүнийг 80 гэдэг тоогоор нь сольчихъё!"
  // Үр дүн: "brightness(80%)" болж хувирна.

  // mediaStream.style.filter = "brightness("+currentValue+"%)"
  // mediaStream.style.filter = **"brightness("**  +   currentValue +   **"%)"**
});

//Snap
const snap = document.getElementById("snap");
const canvas = document.getElementById("canvas");

snap.addEventListener("click", function () {
  const photo = canvas.getContext("2d");

  photo.filter = mediaStream.style.filter || "none";
  photo.drawImage(mediaStream, 0, 0, canvas.width, canvas.height);
  const savedPhoto = canvas.toDataURL("image/png");
});

//Saved photos
canvas.toBlob(function (Blob) {
  const formData = new FormData();
  formData.append("gallery", Blob);
}, "image/png");


