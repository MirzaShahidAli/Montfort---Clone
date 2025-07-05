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

const totalFrames = 710;
const scene1Img = document.getElementById("scene1-frame");

const getFramePath = (index) =>
  `/frames/scene1/scene${String(index).padStart(5, "0")}.webp`;

// 🧠 Only preload the first 20 frames for faster startup
for (let i = 1; i <= 710; i++) {
  const img = new Image();
  img.src = getFramePath(i);
}

// 🧠 Use requestAnimationFrame and throttle updates
let lastFrameIndex = -1;

function updateFrame(frameIndex) {
  if (frameIndex !== lastFrameIndex) {
    scene1Img.src = getFramePath(frameIndex);
    lastFrameIndex = frameIndex;
  }
}

gsap.to(
  { frame: 1 },
  {
    frame: totalFrames,
    ease: "none",
    scrollTrigger: {
      trigger: "#scene1",
      scrub: true,
      start: "top top",
      endTrigger: "footer",
      end: "top bottom",
      pin: true,
      anticipatePin: 1,
    },
    onUpdate: function () {
      const frameIndex = Math.round(this.targets()[0].frame);
      requestAnimationFrame(() => updateFrame(frameIndex));
    },
  }
);

// // ✅ Lenis (unchanged)
// const lenis = new Lenis({
//   duration: 1.5,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   smooth: true,
// });
