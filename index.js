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

const image = document.getElementById('webcam'); 
const button = document.querySelector('.filter-thumb');

button.addEventListener('click', () => {

    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        image.style.filter = "grayscale(100%) blur(0.5px) brightness(100%) sepia(80%) hue-rotate(90deg)";
    } else {
        image.style.filter = "none";
    }
});
const mirrorButton = document.querySelector(".icon-btn")

mirrorButton.addEventListener('click', () => {

    mirrorButton.classList.toggle('active');
    if(mirrorButton.classList.contains('active')) {
        image.style.transform = "scaleX(-1)"
    }else {
        image.style.transform = "scaleX(1)"
    }
})