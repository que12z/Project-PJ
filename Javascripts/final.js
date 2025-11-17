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
      //deleteBtn = document.getElementById('delete')
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
  const rect = canvas.getBoundingClientRect(), scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
  const clientX = e.touches?.[0]?.clientX ?? e.clientX,
        clientY = e.touches?.[0]?.clientY ?? e.clientY;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

// drag and drop
function pointerDown(e) {
  const { x: mouseX, y: mouseY } = getPointerPos(e);
  for (let i = stickers.length - 1; i >= 0; i--) {
    const s = stickers[i];
    if (mouseX >= s.x && mouseX <= s.x + s.width && mouseY >= s.y && mouseY <= s.y + s.height) {
      selectedSticker = s;
      s.dragging = true;
      dragOffset.x = mouseX - s.x;
      dragOffset.y = mouseY - s.y;
      stickers.splice(i, 1);
      stickers.push(s);
      drawCanvas();
      e.preventDefault();
      break;
    }
  }
}
function pointerMove(e) {
  if (!selectedSticker?.dragging) return;
  const { x: mouseX, y: mouseY } = getPointerPos(e);
  selectedSticker.x = mouseX - dragOffset.x;
  selectedSticker.y = mouseY - dragOffset.y;
  drawCanvas();
  e.preventDefault();
}
function pointerUp() { if (selectedSticker) selectedSticker.dragging = false; selectedSticker = null; }

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

// stickers
const lukeImages = ['Assets/fish-photobooth/camerapage/stickers/l1.png','Assets/fish-photobooth/camerapage/stickers/l2.png',
                    'Assets/fish-photobooth/camerapage/stickers/l3.png','Assets/fish-photobooth/camerapage/stickers/l4.png',
                    'Assets/fish-photobooth/camerapage/stickers/l5.png','Assets/fish-photobooth/camerapage/stickers/l6.png'];
      labImages = ['Assets/fish-photobooth/camerapage/stickers/lab1.png','Assets/fish-photobooth/camerapage/stickers/lab2.png',
                  'Assets/fish-photobooth/camerapage/stickers/lab3.png','Assets/fish-photobooth/camerapage/stickers/lab4.png'], 
      starImages = ['Assets/fish-photobooth/camerapage/stickers/s1.png','Assets/fish-photobooth/camerapage/stickers/s2.png',
                    'Assets/fish-photobooth/camerapage/stickers/s3.png','Assets/fish-photobooth/camerapage/stickers/s4.png'],
      otherImages = ['Assets/fish-photobooth/camerapage/stickers/o1.png','Assets/fish-photobooth/camerapage/stickers/o2.png',
                    'Assets/fish-photobooth/camerapage/stickers/o3.png','Assets/fish-photobooth/camerapage/stickers/o4.png',
                    'Assets/fish-photobooth/camerapage/stickers/o5.png','Assets/fish-photobooth/camerapage/stickers/o6.png',
                    'Assets/fish-photobooth/camerapage/stickers/o7.png','Assets/fish-photobooth/camerapage/stickers/o8.png',
                    'Assets/fish-photobooth/camerapage/stickers/o9.png'],
      bubbleImages = ['Assets/fish-photobooth/camerapage/stickers/bubble1.png','Assets/fish-photobooth/camerapage/stickers/bubble2.png'];
let lukeIndex = 0, labIndex = 0, starIndex = 0, otherIndex = 0, bubbleIndex = 0;

addFishBtn.addEventListener('click', () => { addSticker(lukeImages[lukeIndex]); lukeIndex = (lukeIndex + 1) % lukeImages.length; });
addOctopusBtn.addEventListener('click', () => { addSticker(labImages[labIndex]); labIndex = (labIndex + 1) % labImages.length; });
addSeaweedBtn.addEventListener('click', () => { addSticker(starImages[starIndex]); starIndex = (starIndex + 1) % starImages.length; });
addAxBtn.addEventListener('click', () => { addSticker(otherImages[otherIndex]); otherIndex = (otherIndex + 1) % otherImages.length; });
addBubbleBtn.addEventListener('click', () => { addSticker(bubbleImages[bubbleIndex]); bubbleIndex = (bubbleIndex + 1) % bubbleImages.length; });

// delete
//deleteBtn.addEventListener('click', () => { stickers = []; drawCanvas(); });

// reset
resetBtn.addEventListener('click', () => { stickers = []; drawCanvas(); });

// download
downloadBtn.addEventListener('click', () => {
  canvas.toBlob(blob => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'fish-photobooth.png'; a.click(); }, 'image/png');
});

// home
homeBtn.addEventListener('click', () => window.location.href = 'index.html');

// logo
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  if (logo) logo.addEventListener('click', () => window.location.href = 'index.html');
});
