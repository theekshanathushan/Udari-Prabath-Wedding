/**
 * ==============================================================================
 * UDARI & PRABATH — WEDDING INVITATION CARD
 * Side Navigation Drawer, Curtain Reveal, Falling Petals & Snow, Audio & RSVP
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. WEDDING DETAILS CONFIGURATION
// ------------------------------------------------------------------------------
const WEDDING_CONFIG = {
  brideName: "Udari",
  groomName: "Prabath",
  weddingDateISO: "2026-12-12T08:30:00+05:30", // Saturday, 12th December 2026
  eventTitle: "Wedding of Udari & Prabath",
  eventDescription: "Poruwa Ceremony & Reception of Udari & Prabath at Cinnamon Grand Colombo.",
  venueName: "Cinnamon Grand Colombo (Grand Ballroom / Oak Room)",
  venueAddress: "77 Galle Road, Colombo 00300, Sri Lanka",
  venueMapsURL: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
  
  // WhatsApp RSVP Phone Number
  rsvpWhatsAppNumber: "94771234567",
  
  contact1Phone: "+94 77 123 4567",
  contact2Phone: "+94 71 987 6543"
};

// ------------------------------------------------------------------------------
// 2. DOM ELEMENTS
// ------------------------------------------------------------------------------
const curtainOverlay = document.getElementById("curtain-overlay");
const openCurtainsBtn = document.getElementById("open-curtains-btn");
const weddingAudio = document.getElementById("wedding-audio");
const audioToggleBtn = document.getElementById("audio-toggle-btn");
const heartIcon = document.getElementById("heart-icon");
const toastElement = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
const canvas = document.getElementById("snow-petal-canvas");
const weddingCard = document.getElementById("wedding-card");

// Side Navigation Drawer Elements
const topBarMenuBtn = document.getElementById("top-bar-menu-btn");
const sideNavDrawer = document.getElementById("side-nav-drawer");
const sideDrawerBackdrop = document.getElementById("side-drawer-backdrop");
const drawerCloseBtn = document.getElementById("drawer-close-btn");
const drawerItems = document.querySelectorAll(".drawer-item");

// Lock scroll initially
document.body.classList.add("locked");

// ------------------------------------------------------------------------------
// 3. SIDE NAVIGATION DRAWER (Slide-out menu like Reference Photo 1)
// ------------------------------------------------------------------------------
function initSideNavDrawer() {
  function openDrawer() {
    if (sideNavDrawer && sideDrawerBackdrop) {
      sideNavDrawer.classList.add("open");
      sideDrawerBackdrop.classList.add("open");
    }
  }

  function closeDrawer() {
    if (sideNavDrawer && sideDrawerBackdrop) {
      sideNavDrawer.classList.remove("open");
      sideDrawerBackdrop.classList.remove("open");
    }
  }

  if (topBarMenuBtn) {
    topBarMenuBtn.addEventListener("click", openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }

  if (sideDrawerBackdrop) {
    sideDrawerBackdrop.addEventListener("click", closeDrawer);
  }

  drawerItems.forEach(item => {
    item.addEventListener("click", (e) => {
      drawerItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const targetId = item.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetEl = document.querySelector(targetId);
        if (targetEl && weddingCard) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      closeDrawer();
    });
  });
}

// ------------------------------------------------------------------------------
// 4. FALLING WHITE FLOWER PETALS & SNOW CANVAS ENGINE
// ------------------------------------------------------------------------------
let ctx = null;
let particles = [];
let burstParticles = [];
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function initSnowPetalCanvas() {
  if (!canvas) return;
  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particleCount = 85;
  for (let i = 0; i < particleCount; i++) {
    particles.push(createWhitePetalOrSnow());
  }

  // Interactive touch trail across full screen
  window.addEventListener("pointermove", (e) => {
    if (Math.random() > 0.55) {
      particles.push({
        type: Math.random() > 0.45 ? "petal" : "snow",
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2.5,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 1.5,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.04,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 3,
        alpha: 1,
        isInteractive: true
      });
    }
  });

  requestAnimationFrame(renderCanvasLoop);
}

function createWhitePetalOrSnow() {
  const isPetal = Math.random() > 0.45;
  return {
    type: isPetal ? "petal" : "snow",
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: isPetal ? Math.random() * 5.5 + 4 : Math.random() * 3 + 1.2,
    speedY: isPetal ? Math.random() * 1.1 + 0.6 : Math.random() * 0.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.6,
    sway: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.02 + 0.015,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 2,
    alpha: Math.random() * 0.65 + 0.35
  };
}

function triggerCurtainOpeningShower(originX, originY) {
  const count = 75;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 2.5;
    burstParticles.push({
      type: Math.random() > 0.4 ? "petal" : "snow",
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 6 + 3,
      alpha: 1,
      gravity: 0.16,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10
    });
  }
}

function renderCanvasLoop() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 1. Render continuous falling white petals and snow
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.sway += p.swaySpeed;
    p.x += p.speedX + Math.sin(p.sway) * 0.7;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;

    if (p.isInteractive) {
      p.alpha -= 0.018;
    }

    if (p.y > canvasHeight || p.alpha <= 0) {
      if (p.isInteractive) {
        particles.splice(i, 1);
        i--;
        continue;
      }
      p.y = -15;
      p.x = Math.random() * canvasWidth;
      p.alpha = Math.random() * 0.65 + 0.35;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

    if (p.type === "petal") {
      drawWhitePetal(ctx, p.x, p.y, p.size, p.rotation);
    } else {
      drawFrostSnowflake(ctx, p.x, p.y, p.size);
    }
    ctx.restore();
  }

  // 2. Render shower burst
  for (let i = 0; i < burstParticles.length; i++) {
    const bp = burstParticles[i];
    bp.x += bp.vx;
    bp.y += bp.vy;
    bp.vy += bp.gravity;
    bp.alpha -= 0.015;
    bp.rotation += bp.rotSpeed;

    if (bp.alpha <= 0) {
      burstParticles.splice(i, 1);
      i--;
      continue;
    }

    ctx.save();
    ctx.globalAlpha = bp.alpha;
    if (bp.type === "petal") {
      drawWhitePetal(ctx, bp.x, bp.y, bp.size, bp.rotation);
    } else {
      drawFrostSnowflake(ctx, bp.x, bp.y, bp.size);
    }
    ctx.restore();
  }

  requestAnimationFrame(renderCanvasLoop);
}

function drawWhitePetal(ctx, x, y, size, rotation) {
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);

  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.shadowColor = "rgba(255, 215, 0, 0.4)";
  ctx.shadowBlur = 4;

  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.9, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 240, 210, 0.6)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.7);
  ctx.lineTo(0, size * 0.7);
  ctx.stroke();
}

function drawFrostSnowflake(ctx, x, y, size) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
  ctx.shadowBlur = 5;

  if (size > 2.2) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI) / 3;
      ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      ctx.lineTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size);
    }
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ------------------------------------------------------------------------------
// 5. ROYAL CURTAIN REVEAL & AUDIO
// ------------------------------------------------------------------------------
let isCurtainOpened = false;
let isAudioPlaying = false;
let audioCtx = null;
let chimeInterval = null;

function startFestiveBells() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    const notes = [293.66, 369.99, 440.00, 587.33, 739.99, 880.00];
    let noteIdx = 0;

    function playBell(freq) {
      if (!audioCtx || audioCtx.state === "suspended") return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);
    }

    chimeInterval = setInterval(() => {
      if (isAudioPlaying) {
        playBell(notes[noteIdx % notes.length]);
        noteIdx = (noteIdx + 1) % notes.length;
      }
    }, 1100);
  } catch (e) {
    console.log("Audio not supported");
  }
}

function openRoyalCurtains() {
  if (isCurtainOpened) return;
  isCurtainOpened = true;

  const rect = openCurtainsBtn ? openCurtainsBtn.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  triggerCurtainOpeningShower(originX, originY);

  curtainOverlay.classList.add("curtains-open");
  if (curtainOverlay) {
    curtainOverlay.style.pointerEvents = "none";
  }
  document.body.classList.remove("locked");
  playAudio();
}

// Forward mouse wheel scrolling from anywhere on screen to the central card
window.addEventListener("wheel", (e) => {
  if (weddingCard && !weddingCard.contains(e.target)) {
    weddingCard.scrollTop += e.deltaY;
  }
}, { passive: true });

function playAudio() {
  weddingAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioUI(true);
  }).catch(() => {
    startFestiveBells();
    isAudioPlaying = true;
    updateAudioUI(true);
  });
}

function pauseAudio() {
  weddingAudio.pause();
  isAudioPlaying = false;
  if (audioCtx && audioCtx.state === "running") {
    audioCtx.suspend();
  }
  updateAudioUI(false);
}

function toggleAudio() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
      isAudioPlaying = true;
      updateAudioUI(true);
    } else {
      playAudio();
    }
  }
}

function updateAudioUI(isPlaying) {
  if (heartIcon) {
    if (isPlaying) {
      heartIcon.style.color = "#c41e3a";
      heartIcon.textContent = "♥";
    } else {
      heartIcon.style.color = "#888888";
      heartIcon.textContent = "♡";
    }
  }
}

if (openCurtainsBtn) {
  openCurtainsBtn.addEventListener("click", openRoyalCurtains);
}
if (audioToggleBtn) {
  audioToggleBtn.addEventListener("click", toggleAudio);
}

// ------------------------------------------------------------------------------
// 6. LIVE COUNTDOWN TIMER (DECEMBER 2026)
// ------------------------------------------------------------------------------
function initCountdown() {
  const targetTime = new Date(WEDDING_CONFIG.weddingDateISO).getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      const heading = document.querySelector(".countdown-tag");
      if (heading) heading.textContent = "TODAY IS OUR WEDDING DAY! 💍✨";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ------------------------------------------------------------------------------
// 7. CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
// ------------------------------------------------------------------------------
function setupCalendarButtons() {
  const btnIcs = document.getElementById("btn-add-calendar");
  const btnGoogle = document.getElementById("btn-google-calendar");

  const startDate = new Date(WEDDING_CONFIG.weddingDateISO);
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);

  function formatDateToICS(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  }

  if (btnGoogle) {
    const googleStart = formatDateToICS(startDate);
    const googleEnd = formatDateToICS(endDate);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      WEDDING_CONFIG.eventTitle
    )}&dates=${googleStart}/${googleEnd}&details=${encodeURIComponent(
      WEDDING_CONFIG.eventDescription
    )}&location=${encodeURIComponent(
      WEDDING_CONFIG.venueName + ", " + WEDDING_CONFIG.venueAddress
    )}`;
    btnGoogle.href = gCalUrl;
  }

  if (btnIcs) {
    btnIcs.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Udari & Prabath December Wedding//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:wedding-${startDate.getTime()}@udariprabath.com`,
        `DTSTAMP:${formatDateToICS(new Date())}`,
        `DTSTART:${formatDateToICS(startDate)}`,
        `DTEND:${formatDateToICS(endDate)}`,
        `SUMMARY:${WEDDING_CONFIG.eventTitle}`,
        `DESCRIPTION:${WEDDING_CONFIG.eventDescription}`,
        `LOCATION:${WEDDING_CONFIG.venueName}, ${WEDDING_CONFIG.venueAddress}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "Udari-Prabath-December-Wedding.ics");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);

      showToast("Calendar event saved! 📅");
    });
  }
}

// ------------------------------------------------------------------------------
// 8. INTERACTIVE RSVP FORM & WHATSAPP
// ------------------------------------------------------------------------------
function setupRSVPForm() {
  const radioCards = document.querySelectorAll(".attendance-btn-row .radio-pill");
  const guestCountInput = document.getElementById("guest-count");
  const btnMinus = document.getElementById("stepper-minus");
  const btnPlus = document.getElementById("stepper-plus");
  const guestCountGroup = document.getElementById("guest-count-group");

  radioCards.forEach(card => {
    card.addEventListener("click", () => {
      radioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const radio = card.querySelector("input[type='radio']");
      if (radio) {
        radio.checked = true;
        if (radio.value === "Regretfully Decline") {
          guestCountGroup.style.opacity = "0.35";
        } else {
          guestCountGroup.style.opacity = "1";
        }
      }
    });
  });

  if (btnMinus && btnPlus && guestCountInput) {
    btnMinus.addEventListener("click", () => {
      let current = parseInt(guestCountInput.value, 10) || 1;
      if (current > 1) {
        guestCountInput.value = current - 1;
      }
    });

    btnPlus.addEventListener("click", () => {
      let current = parseInt(guestCountInput.value, 10) || 1;
      if (current < 10) {
        guestCountInput.value = current + 1;
      }
    });
  }
}

window.sendWhatsAppRSVP = function () {
  const guestName = document.getElementById("guest-name").value.trim();
  const selectedAttendance = document.querySelector("input[name='attendance']:checked").value;
  const guestCount = document.getElementById("guest-count").value;
  const guestMessage = document.getElementById("guest-message").value.trim();

  if (!guestName) {
    alert("Please enter your name.");
    return;
  }

  let textMessage = `🌹 *DECEMBER WEDDING RSVP: UDARI & PRABATH* 🌹\n\n`;
  textMessage += `👤 *Guest Name:* ${guestName}\n`;
  textMessage += `💌 *Attendance:* ${selectedAttendance}\n`;

  if (selectedAttendance === "Joyfully Accept") {
    textMessage += `👥 *Number of Guests:* ${guestCount}\n`;
  }

  if (guestMessage) {
    textMessage += `💬 *Warm Wishes:* ${guestMessage}\n`;
  }

  textMessage += `\n_Sent via Udari & Prabath's December Wedding Card_ 💍✨`;

  const encodedUrl = `https://wa.me/${WEDDING_CONFIG.rsvpWhatsAppNumber}?text=${encodeURIComponent(textMessage)}`;
  window.open(encodedUrl, "_blank");
};

// ------------------------------------------------------------------------------
// 9. CLIPBOARD HELPER & TOAST NOTIFICATION
// ------------------------------------------------------------------------------
window.copyContact = function (text, btnElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied: ${text} ✨`);
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
};

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`Copied: ${text} ✨`);
  } catch (err) {
    showToast("Unable to copy to clipboard.");
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  if (!toastElement || !toastText) return;
  toastText.textContent = message;
  toastElement.classList.add("show");
  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2600);
}

// ------------------------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initSideNavDrawer();
  initSnowPetalCanvas();
  initCountdown();
  setupCalendarButtons();
  setupRSVPForm();
});
