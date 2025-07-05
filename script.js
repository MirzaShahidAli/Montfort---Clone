document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header[data-astro-cid-4wsjtibl]");
  if (!header) return;

  let lastScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (Math.abs(currentScroll - lastScroll) < 5) return;

    if (currentScroll > lastScroll) {
      header.classList.add("fade");
      header.classList.remove("top");
    } else {
      header.classList.remove("fade");
      header.classList.add("top");
    }

    lastScroll = currentScroll;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const speed = 0.2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add("visible");
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("down");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("down");
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});

document.addEventListener("DOMContentLoaded", () => {
  const layers = document.querySelectorAll(".parallax.layer");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed);
      const yPos = -(scrollY * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });
});
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("scene1-canvas");
const context = canvas.getContext("2d");

const frameCount = 710;
const currentFrame = (index) =>
  `/frames/scene1/scene${String(index).padStart(5, "0")}.webp`;

const images = [];
let loadedCount = 0;
let canvasSet = false;

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i + 1);
  images.push(img);
  img.onload = () => {
    loadedCount++;
    if (!canvasSet && img.width && img.height) {
      canvas.width = img.width;
      canvas.height = img.height;
      canvasSet = true;
      drawImage(0);
    }
  };
}

function drawImage(index) {
  const img = images[index];
  if (!img || !img.complete) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

gsap.to(
  { frame: 0 },
  {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: "#scene1",
      start: "top top",
      endTrigger: "footer",
      end: "top bottom",
      scrub: true,
      pin: true,
    },
    onUpdate: function () {
      const frameIndex = Math.round(this.targets()[0].frame);
      drawImage(frameIndex);
    },
  }
);

// // ✅ Lenis (unchanged)
// const lenis = new Lenis({
//   duration: 1.5,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   smooth: true,
// });
