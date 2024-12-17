const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(event) {
  if(!isDrawing) return; // stop the function from running when they are not moused down

  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // start from
  ctx.lineTo(event.offsetX, event.offsetY); // go to
  ctx.stroke();

  lastX = event.offsetX;
  lastY = event.offsetY;
}