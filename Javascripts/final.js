// constants
const WIDTH = 1176, HEIGHT = 1470;

// dom elements
const canvas = document.getElementById('finalCanvas'),
      ctx = canvas.getContext('2d'),
      addFishBtn = document.getElementById('addFish'),
      addOctopusBtn = document.getElementById('addOctopus'),
      addSeaweedBtn = document.getElementById('addSeaweed'),
      addAxBtn = document.getElementById('addAx'),
      addBubbleBtn = document.getElementById('addBubble'),
      downloadBtn = document.getElementById('downloadBtn'),
      homeBtn = document.getElementById('homeBtn'),
      resetBtn = document.getElementById('reset');

// sticker state
let stickers = [], dragOffset = { x: 0, y: 0 }, selectedSticker = null;

// load photo
const finalImage = new Image(), dataURL = localStorage.getItem('photoStrip');
if (dataURL) {
  finalImage.src = dataURL;
  finalImage.onload = drawCanvas;
  localStorage.removeItem('photoStrip');
} else alert("No photo found!");

// draw canvas
function drawCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(finalImage, 0, 0, WIDTH, HEIGHT);
  stickers.forEach(s => ctx.drawImage(s.img, s.x, s.y, s.width, s.height));
}

// add sticker
function addSticker(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    stickers.push({
      img,
      x: WIDTH / 2 - img.width / 6,
      y: HEIGHT / 2 - img.height / 6,
      width: img.width / 2.5,
      height: img.height / 2.5,
      dragging: false
    });
    drawCanvas();
  };
}

// pointer position
function getPointerPos(e) {
  const rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
  const clientX = e.touches?.[0]?.clientX ?? e.clientX,
        clientY = e.touches?.[0]?.clientY ?? e.clientY;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

// -------------------- POINTER EVENTS --------------------

// pointerDown — EXTENDED DRAG AREA
function pointerDown(e) {
  const { x: mouseX, y: mouseY } = getPointerPos(e);

  const padding = 20; // <<< extra clickable area around sticker

  for (let i = stickers.length - 1; i >= 0; i--) {
    const s = stickers[i];
    if (
      mouseX >= s.x - padding &&
      mouseX <= s.x + s.width + padding &&
      mouseY >= s.y - padding &&
      mouseY <= s.y + s.height + padding
    ) {
      selectedSticker = s;
      s.dragging = true;
      dragOffset.x = mouseX - s.x;
      dragOffset.y = mouseY - s.y;

      // bring sticker to top
      stickers.splice(i, 1);
      stickers.push(s);

      drawCanvas();
      e.preventDefault();
      break;
    }
  }
}

// pointerMove
function pointerMove(e) {
  if (!selectedSticker?.dragging) return;
  const { x: mouseX, y: mouseY } = getPointerPos(e);
  selectedSticker.x = mouseX - dragOffset.x;
  selectedSticker.y = mouseY - dragOffset.y;
  drawCanvas();
  e.preventDefault();
}

// pointerUp — SOFT THRESHOLD REMOVAL
function pointerUp() {
  if (selectedSticker) {
    const s = selectedSticker;

    const threshold = 500; // <<< soft threshold in pixels
    const centerX = s.x + s.width / 2;
    const centerY = s.y + s.height / 2;

    if (
      centerX < -threshold || centerX > WIDTH + threshold ||
      centerY < -threshold || centerY > HEIGHT + threshold
    ) {
      const index = stickers.indexOf(s);
      if (index > -1) stickers.splice(index, 1);
    }

    s.dragging = false;
  }
  selectedSticker = null;
  drawCanvas();
}

// mouse events
canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
canvas.addEventListener('mouseleave', pointerUp);

// touch events
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchmove', pointerMove);
canvas.addEventListener('touchend', pointerUp);
canvas.addEventListener('touchcancel', pointerUp);

// -------------------- STICKERS --------------------
addFishBtn.addEventListener('click', () => addSticker('Assets/fish-photobooth/camerapage/stickers/qok.png'));
addOctopusBtn.addEventListener('click', () => addSticker('Assets/fish-photobooth/camerapage/stickers/que.png'));
addSeaweedBtn.addEventListener('click', () => addSticker('Assets/fish-photobooth/camerapage/stickers/nug.png'));

// multi sticker pack
const axImages = ['Assets/fish-photobooth/camerapage/stickers/s1/1.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/2.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/3.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/4.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/5.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/6.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/7.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/8.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/9.png',
                  'Assets/fish-photobooth/camerapage/stickers/s1/10.png'], 
      bubbleImages = ['Assets/fish-photobooth/camerapage/stickers/s2/1.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/2.png', 
                      'Assets/fish-photobooth/camerapage/stickers/s2/3.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/4.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/5.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/6.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/7.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/8.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/9.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/10.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/11.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/12.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/13.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/14.png',
                      'Assets/fish-photobooth/camerapage/stickers/s2/15.png'];
let axIndex = 0, bubbleIndex = 0;

addAxBtn.addEventListener('click', () => {addSticker(axImages[axIndex]); axIndex = (axIndex + 1) % axImages.length; });
addBubbleBtn.addEventListener('click', () => {addSticker(bubbleImages[bubbleIndex]); bubbleIndex = (bubbleIndex + 1) % bubbleImages.length; });

// reset
resetBtn.addEventListener('click', () => { stickers = []; drawCanvas(); });

// download
downloadBtn.addEventListener('click', () => {
  canvas.toBlob(blob => { 
    const a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob); 
    a.download = 'fish-photobooth.png'; 
    a.click(); 
  }, 'image/png');
});

// home
homeBtn.addEventListener('click', () => window.location.href = 'index.html');

// logo
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  if (logo) logo.addEventListener('click', () => window.location.href = 'index.html');
});
