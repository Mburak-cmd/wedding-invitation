const weddingDate = new Date("2026-09-19T19:00:00+03:00").getTime();


const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");


function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;


  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }


  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);


  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}


setInterval(updateCountdown, 1000);
updateCountdown();


const scratchCanvas = document.getElementById("scratchCanvas");


if (scratchCanvas) {
  const ctx = scratchCanvas.getContext("2d");
  const card = document.getElementById("scratchCard");


  let isScratching = false;
  let confettiTriggered = false;


  function resizeScratch() {
    const rect = card.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;


    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;


    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";


    const gradient = ctx.createLinearGradient(
  0,
  0,
  rect.width,
  0
);
{
const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);


gradient.addColorStop(0, "#8f6b29");
gradient.addColorStop(0.25, "#b58f47");
gradient.addColorStop(0.50, "#cfa95c");
gradient.addColorStop(0.75, "#b58f47");
gradient.addColorStop(1, "#8f6b29");


ctx.fillStyle = gradient;
ctx.fillRect(0, 0, rect.width, rect.height);


ctx.fillStyle = "rgba(255,255,255,0.95)";
ctx.font = "600 13px Inter";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("TARİHİ KEŞFET", rect.width / 2, rect.height / 2);
ctx.strokeStyle = "rgba(255,255,255,0.12)";
ctx.lineWidth = 2;


for (let y = 4; y < rect.height; y += 8) {
  ctx.beginPath();


  for (let x = 0; x <= rect.width; x += 6) {
    ctx.lineTo(
      x,
      y + Math.sin(x * 0.08) * 3
    );
  }


  ctx.stroke();
}
}
  }
 


  resizeScratch();
  window.addEventListener("resize", resizeScratch);


  function getPosition(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;


    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }


  function checkScratchCompletion() {
    if (confettiTriggered) return;


    const imageData = ctx.getImageData(
      0,
      0,
      scratchCanvas.width,
      scratchCanvas.height
    );


    let transparentPixels = 0;


    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) {
        transparentPixels++;
      }
    }


    const percentage =
      transparentPixels / (scratchCanvas.width * scratchCanvas.height);


    if (percentage >= 0.50) {
  confettiTriggered = true;


  launchConfetti();


  setTimeout(() => {
    if (countdownArea) {
      countdownArea.classList.add("show");
    }
  }, 100);




  const countdownArea = document.getElementById("countdownArea");


  setTimeout(() => {
    countdownArea.classList.remove("hidden");
    countdownArea.classList.add("show");
  }, 800);
    }
  }


  function launchConfetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);


    for (let i = 0; i < 90; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";


      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDelay = Math.random() * 0.25 + "s";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.background = Math.random() > 0.55 ? "#c8a45d" : "#e6c983";


      container.appendChild(piece);
    }


    setTimeout(() => {
      container.remove();
    }, 2800);
  }


  function scratch(e) {
    if (!isScratching) return;


    e.preventDefault();


    const pos = getPosition(e);


    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
    ctx.fill();


    checkScratchCompletion();
  }


  scratchCanvas.addEventListener("mousedown", (e) => {
    isScratching = true;
    scratch(e);
  });


  scratchCanvas.addEventListener("mouseup", () => {
    isScratching = false;
  });


  scratchCanvas.addEventListener("mouseleave", () => {
    isScratching = false;
  });


  scratchCanvas.addEventListener("mousemove", scratch);


  scratchCanvas.addEventListener("touchstart", (e) => {
    isScratching = true;
    scratch(e);
  });


  scratchCanvas.addEventListener("touchmove", scratch);


  scratchCanvas.addEventListener("touchend", () => {
    isScratching = false;
  });
}


const photos = [
  "assets/photo-1.jpg",
  "assets/photo-2.jpg",
  "assets/photo-3.jpg",
  "assets/photo-4.jpg"
];


let currentPhoto = 0;


const photoSlider = document.getElementById("photoSlider");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");


function showPhoto(index) {
  photoSlider.style.opacity = "0";


  setTimeout(() => {
    photoSlider.src = photos[index];
    photoSlider.style.opacity = "1";
  }, 180);
}


if (photoSlider && prevPhoto && nextPhoto) {
  photoSlider.style.transition = "opacity 0.3s ease";


  prevPhoto.addEventListener("click", () => {
    currentPhoto = currentPhoto === 0 ? photos.length - 1 : currentPhoto - 1;
    showPhoto(currentPhoto);
  });


  nextPhoto.addEventListener("click", () => {
    currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
    showPhoto(currentPhoto);
  });


  setInterval(() => {
    currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
    showPhoto(currentPhoto);
  }, 8000);
}


const venuePhotos = [
  "assets/otel1.webp",
  "assets/otel2.avif",
  "assets/otel3.avif",
  "assets/otel4.webp",
  "assets/otel5.webp",
  "assets/otel6.webp"
];


let currentVenue = 0;


const venueSlider = document.getElementById("venueSlider");
const prevVenue = document.getElementById("prevVenue");
const nextVenue = document.getElementById("nextVenue");


function showVenue(index) {
  venueSlider.style.opacity = "0";


  setTimeout(() => {
    venueSlider.src = venuePhotos[index];
    venueSlider.style.opacity = "1";
  }, 180);
}


if (venueSlider && prevVenue && nextVenue) {
  venueSlider.style.transition = "opacity 0.3s ease";


  prevVenue.addEventListener("click", () => {
    currentVenue = currentVenue === 0 ? venuePhotos.length - 1 : currentVenue - 1;
    showVenue(currentVenue);
  });


  nextVenue.addEventListener("click", () => {
    currentVenue = currentVenue === venuePhotos.length - 1 ? 0 : currentVenue + 1;
    showVenue(currentVenue);
  });


  setInterval(() => {
    currentVenue = currentVenue === venuePhotos.length - 1 ? 0 : currentVenue + 1;
    showVenue(currentVenue);
  }, 8000);
}


const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.16 }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});


const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");


let isPlaying = false;


musicButton.addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      await music.play();
      isPlaying = true;
      musicButton.textContent = "Müziği Kapat";
    } else {
      music.pause();
      isPlaying = false;
      musicButton.textContent = "Müziği Aç";
    }
  } catch (error) {
    musicButton.textContent = "Müzik Açılamadı";
  }
});
function slowScrollTo(targetY, duration = 2600) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();


  function ease(t) {
    return t * t * (3 - 2 * t);
  }


  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = ease(progress);


    window.scrollTo(0, startY + distance * eased);


    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }


  requestAnimationFrame(animate);
}


const openButton = document.querySelector(".hero-actions .primary-button");


if (openButton) {
  openButton.addEventListener("click", function (e) {
    e.preventDefault();


    const target = document.getElementById("details");
    slowScrollTo(target.offsetTop, 2600);
  });
}
const countdownArea = document.getElementById("countdownArea");

document.getElementById("rsvpBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const target = document.getElementById("rsvp");
  const targetPosition = target.offsetTop - 20;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  const duration = 1800; // 1200 = normal, 1800 = daha yavaş, 2200 = çok yavaş
  let start = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!start) start = currentTime;

    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(
      0,
      startPosition + distance * easeInOutCubic(progress)
    );

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
});