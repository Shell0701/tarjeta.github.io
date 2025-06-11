const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let img = new Image();
img.src = "imagen-para-raspar.png"; // Reemplaza con tu imagen

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function clearCircle(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  clearCircle(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    clearCircle(e.offsetX, e.offsetY);
  }
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  clearCircle(x, y);
});
canvas.addEventListener("touchend", () => isDrawing = false);
