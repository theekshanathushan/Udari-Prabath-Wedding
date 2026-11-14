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
  weddingDateISO: "2026-12-10T11:00:00+05:30", // Thursday, 10th December 2026, 11:00 AM
  weddingEndDateISO: "2026-12-10T16:15:00+05:30", // 04:15 PM
  eventTitle: "Udari & Prabath Wedding",
  eventDescription: "Wedding Celebration of Udari & Prabath at Ramira Reception Hall, Agalawaththa (11:00 AM – 04:15 PM • Poruwa Ceremony at 11:00 AM).",
  venueName: "Ramira Reception Hall",
  venueAddress: "No. 148, Yatiyana, Agalawaththa, Sri Lanka",
  venueMapsURL: "https://maps.app.goo.gl/ub2awTQqFTStJXy36",
  
  // WhatsApp RSVP Phone Number
  rsvpWhatsAppNumber: "94772921684",
  rsvpDeadline: "December 05, 2026",
  
  // Google Sheets Web App URL for automatic Excel RSVP Logging & Guest Count
  // (Paste your deployed Google Apps Script Web App URL here)
  googleSheetScriptURL: "https://script.google.com/macros/s/AKfycbx3h019e1vjlqC2Tdr4clVY5FB-BIEsfNMYy42opVrDfdX_puMKw6-Bisl7GyfqFfBhCw/exec",
  
  contacts: [
    { name: "Theekshana", phone: "077 292 1684", intl: "+94772921684" },
    { name: "Hasinthaka", phone: "070 155 1244", intl: "+94701551244" }
  ]
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
  openCurtainsBtn.addEventListener("touchend", (e) => {
    e.preventDefault();
    openRoyalCurtains();
  }, { passive: false });
}
if (audioToggleBtn) {
  audioToggleBtn.addEventListener("click", toggleAudio);
}

// ------------------------------------------------------------------------------
// 5B. COUPLE PHOTO KISS ANIMATION & INTERACTIVE BURST
// ------------------------------------------------------------------------------
function initCoupleKissAnimation() {
  const kissBox = document.getElementById("couple-kiss-box");
  const coupleImg = document.getElementById("couple-photo-img");
  if (!kissBox || !coupleImg) return;

  function triggerKissBurst(e) {
    // 1. Trigger instant romantic kiss pulse on the photo
    coupleImg.classList.remove("kiss-quick-pulse");
    void coupleImg.offsetWidth; // Force CSS reflow to re-trigger
    coupleImg.classList.add("kiss-quick-pulse");

    // 2. Play subtle love bell chime if audio context is running
    try {
      if (audioCtx && audioCtx.state === "running") {
        playBell(880);
        setTimeout(() => playBell(1174.66), 180);
      }
    } catch (_) {}

    // 3. Spawn celebratory burst of floating love emojis from kiss point
    const loveEmojis = ["💋", "💖", "💕", "✨", "❤️", "🥰", "💍", "🌹"];
    const rect = kissBox.getBoundingClientRect();
    const clickX = e && e.clientX ? e.clientX - rect.left : rect.width / 2;
    const clickY = e && e.clientY ? e.clientY - rect.top : rect.height * 0.42;

    const count = 8;
    for (let i = 0; i < count; i++) {
      const heartEl = document.createElement("span");
      heartEl.className = "interactive-burst-heart";
      heartEl.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      heartEl.style.left = `${clickX}px`;
      heartEl.style.top = `${clickY}px`;

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 50 + Math.random() * 55;
      heartEl.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
      heartEl.style.setProperty("--ty", `${Math.sin(angle) * dist - 35}px`);
      heartEl.style.setProperty("--rot", `${(Math.random() - 0.5) * 70}deg`);
      heartEl.style.animation = "burstFlyOut 1.1s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards";

      kissBox.appendChild(heartEl);
      setTimeout(() => heartEl.remove(), 1200);
    }
  }

  kissBox.addEventListener("click", triggerKissBurst);
  kissBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerKissBurst();
    }
  });
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
  const endDate = new Date(WEDDING_CONFIG.weddingEndDateISO);

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

// ------------------------------------------------------------------------------
// DIRECT CONFIRM RSVP SUBMISSION (NO WHATSAPP REQUIRED)
// ------------------------------------------------------------------------------
window.submitRSVPForm = function () {
  const nameInput = document.getElementById("guest-name");
  const guestName = (nameInput ? nameInput.value : "").trim();
  const attendanceInput = document.querySelector("input[name='attendance']:checked");
  const selectedAttendance = attendanceInput ? attendanceInput.value : "Joyfully Accept";
  const guestCountInput = document.getElementById("guest-count");
  const guestCountVal = guestCountInput ? guestCountInput.value : "1";
  const messageInput = document.getElementById("guest-message");
  const guestMessage = (messageInput ? messageInput.value : "").trim();
  const submitBtn = document.getElementById("rsvp-submit-btn");

  if (!guestName) {
    if (typeof showToast === "function") {
      showToast("Please enter your name to confirm.");
    } else {
      alert("Please enter your name.");
    }
    if (nameInput) nameInput.focus();
    return;
  }

  // Visual button loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳</span> Confirming...`;
  }

  const numericGuests = selectedAttendance === "Joyfully Accept" ? (parseInt(guestCountVal, 10) || 1) : 0;
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const rsvpData = {
    id: "rsvp_" + Date.now(),
    timestamp: formattedTime,
    name: guestName,
    attendance: selectedAttendance,
    guests: numericGuests,
    message: guestMessage || "-"
  };

  // 1. Save locally to localStorage for instant Admin Portal viewing
  try {
    const stored = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
    stored.unshift(rsvpData);
    localStorage.setItem("wedding_rsvps", JSON.stringify(stored));
  } catch (e) {
    console.warn("Local storage write error:", e);
  }

  // 2. Sync to Private Google Sheet (if configured)
  const sheetUrl = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.googleSheetScriptURL) 
    ? WEDDING_CONFIG.googleSheetScriptURL 
    : (localStorage.getItem("wedding_sheet_url") || "");

  if (sheetUrl) {
    try {
      fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(rsvpData)
      }).catch(err => console.log("Google Sheets post notice:", err));
    } catch (err) {
      console.log("Sheet post error:", err);
    }
  }

  // 3. Show Success Card on Invitation (No WhatsApp redirect!)
  setTimeout(() => {
    const formEl = document.getElementById("rsvp-form");
    const successBox = document.getElementById("rsvp-success-box");
    const guestNameEl = document.getElementById("success-guest-name");
    const descText = document.getElementById("success-desc-text");

    if (formEl) formEl.style.display = "none";
    if (guestNameEl) guestNameEl.textContent = guestName;

    if (descText) {
      if (selectedAttendance === "Joyfully Accept") {
        descText.textContent = `Your attendance for ${numericGuests} guest${numericGuests > 1 ? "s" : ""} has been joyfully recorded!`;
      } else {
        descText.textContent = "Your response has been received with warm gratitude.";
      }
    }

    if (successBox) successBox.style.display = "block";
    if (typeof showToast === "function") {
      showToast("RSVP Confirmed! Thank you!");
    }
  }, 400);
};

window.resetRSVPForm = function () {
  const formEl = document.getElementById("rsvp-form");
  const successBox = document.getElementById("rsvp-success-box");
  const submitBtn = document.getElementById("rsvp-submit-btn");
  const guestCountInput = document.getElementById("guest-count");
  const guestCountGroup = document.getElementById("guest-count-group");

  if (formEl) {
    formEl.reset();
    formEl.style.display = "block";
  }
  if (successBox) successBox.style.display = "none";
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>💌</span> Confirm RSVP`;
  }
  if (guestCountInput) guestCountInput.value = "2";
  if (guestCountGroup) guestCountGroup.style.opacity = "1";

  const radioCards = document.querySelectorAll(".attendance-btn-row .radio-pill");
  radioCards.forEach((c, idx) => {
    if (idx === 0) c.classList.add("active");
    else c.classList.remove("active");
  });
};

// Backwards-compatible alias in case of external call
window.sendWhatsAppRSVP = window.submitRSVPForm;

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
  initCoupleKissAnimation();
});
