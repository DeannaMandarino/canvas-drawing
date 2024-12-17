// Select the canvas element and get its 2D context
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the full window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up the drawing styles for the context
ctx.strokeStyle = '#000000'; // Initial stroke color
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100; // Initial line width

// Initialize drawing state variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Draw function to handle the drawing logic
function draw(event) {
  if(!isDrawing) return; // exit if mouse is not pressed

  // Set stroke color dynamically based on hue
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // Begin a new path and draw from the last position to the current position
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // start from
  ctx.lineTo(event.offsetX, event.offsetY); // go to
  ctx.stroke();

  // Update the last known position
  lastX = event.offsetX;
  lastY = event.offsetY;

  // Increment hue for color variation, reset at 360
  hue = (hue + 1) % 360;

  // Dynamically adjust the line width
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 20) {
    direction = !direction;
  }

  // Increase or decrease the line width based on the direction
  ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth - 1;
}

// Event listeners for computers
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});
canvas.addEventListener('mousemove', draw); // Continuously draw while mouse is moving
canvas.addEventListener('mouseup', () => isDrawing = false); // Stop drawing when mouse is released
canvas.addEventListener('mouseout', () => isDrawing = false); // Stop drawing when mouse leaves canvas

// Event listeners for mobile devices
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault(); // Prevent scrolling or zooming during touch
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});
canvas.addEventListener('touchmove', (event) => {
  event.preventDefault(); // Prevent scrolling or zooming during touch
  draw(event);
});
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchcancel', () => isDrawing = false); // Stop drawing if touch is interrupted (e.g., notification)

// Resize canvas when the window is resized to keep it full-screen
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});