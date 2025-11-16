// connect to bubble container
const bubbleContainer = document.querySelector(".bubble-container");

// get images
const bubbleImages = [
  "Assets/fish-photobooth/camerapage/bubbles/5.png",
  "Assets/fish-photobooth/camerapage/bubbles/1.png",
  "../Assets/fish-photobooth/camerapage/bubbles/2.png",
  "../Assets/fish-photobooth/camerapage/bubbles/3.png",
  "../Assets/fish-photobooth/camerapage/bubbles/6.png",
  "../Assets/fish-photobooth/camerapage/bubbles/4.png"
];

// create bubble
const createBubble = () => {
  const bubble = document.createElement("img");
  bubble.src = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
  bubble.classList.add("bubble");

  // random position, size, duration
  bubble.style.left = Math.random() * 100 + "vw";
  const size = 40 + Math.random() * 20;
  bubble.style.width = size + "px";
  const duration = 12 + Math.random() * 8;
  bubble.style.animationDuration = duration + "s";

  // random final opacity
  bubble.addEventListener("animationend", () => bubble.style.opacity = 0.2 + Math.random() * 0.8);

  bubbleContainer.appendChild(bubble);

  // remove after animation
  setTimeout(() => bubble.remove(), duration * 1000);
};

// generate bubbles continuously
setInterval(createBubble, 400);
