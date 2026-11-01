/**
 * ==============================================================================
 * UDARI & PRABATH — A DECEMBER ROYAL WEDDING (FESTIVE ROMANCE THEME)
 * Interactive Particle Engine, Live Countdown, Calendar & WhatsApp RSVP
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. WEDDING DETAILS CONFIGURATION
// ------------------------------------------------------------------------------
const WEDDING_CONFIG = {
  brideName: "Udari",
  groomName: "Prabath",
  weddingDateISO: "2026-12-12T08:30:00+05:30", // Auspicious December Wedding
  eventTitle: "December Wedding of Udari & Prabath",
  eventDescription: "Poruwa Ceremony & Grand Reception of Udari & Prabath at Cinnamon Grand Colombo.",
  venueName: "Cinnamon Grand Colombo (Grand Ballroom / Oak Room)",
  venueAddress: "77 Galle Road, Colombo 00300, Sri Lanka",
  venueMapsURL: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
  
  // RSVP WhatsApp Number (Sri Lanka: 94 + 9 digits, e.g. 94771234567)
  rsvpWhatsAppNumber: "94771234567",
  
  contact1Phone: "+94 77 123 4567",
  contact2Phone: "+94 71 987 6543"
};

// ------------------------------------------------------------------------------
// 2. DOM ELEMENTS
// ------------------------------------------------------------------------------
const unlockOverlay = document.getElementById("unlock-overlay");
const openInvitationBtn = document.getElementById("open-invitation-btn");
const weddingAudio = document.getElementById("wedding-audio");
const audioBtn = document.getElementById("audio-btn");
const audioPlayIcon = document.querySelector(".audio-icon-play");
const audioMuteIcon = document.querySelector(".audio-icon-mute");
const toastElement = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
const canvas = document.getElementById("magic-canvas");

// Lock scrolling initially
document.body.classList.add("locked");

// ------------------------------------------------------------------------------
// 3. LIVE FESTIVE CANVAS PARTICLE ENGINE (Golden Starlight, Snowflakes & Bokeh)
// ------------------------------------------------------------------------------
let ctx = null;
let particles = [];
let confettiBurst = [];
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function initCanvasEngine() {
  if (!canvas) return;
  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create initial starlight & snowflake particles
  const particleCount = window.innerWidth < 600 ? 45 : 85;
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }

  // Touch / cursor sparkle interaction
  window.addEventListener("pointermove", (e) => {
    if (Math.random() > 0.6) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        alpha: 1,
        color: Math.random() > 0.5 ? "#ffd700" : "#ffffff",
        twinkle: Math.random() * 0.08 + 0.02,
        isInteractive: true
      });
    }
  });

  requestAnimationFrame(animateCanvas);
}

function createParticle() {
  const types = ["star", "snowflake", "bokeh", "goldDust"];
  const type = types[Math.floor(Math.random() * types.length)];
  return {
    type: type,
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: type === "bokeh" ? Math.random() * 7 + 4 : Math.random() * 2.8 + 1,
    speedY: Math.random() * 0.8 + 0.3,
    speedX: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.008,
    color: Math.random() > 0.6 ? "#ffd700" : (Math.random() > 0.5 ? "#ff4d6d" : "#ffffff")
  };
}

function triggerCelebratoryBurst(originX, originY) {
  const burstCount = 70;
  for (let i = 0; i < burstCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3;
    confettiBurst.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 5 + 2,
      color: ["#ffd700", "#ff2a55", "#00e676", "#ffffff", "#ffea79"][Math.floor(Math.random() * 5)],
      alpha: 1,
      gravity: 0.22,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12
    });
  }
}

function animateCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 1. Draw continuous background sparkles & snowflakes
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.y += p.speedY;
    p.x += p.speedX;
    p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.015;

    if (p.isInteractive) {
      p.alpha -= 0.02;
    }

    if (p.y > canvasHeight || p.alpha <= 0) {
      if (p.isInteractive) {
        particles.splice(i, 1);
        i--;
        continue;
      }
      p.y = -10;
      p.x = Math.random() * canvasWidth;
      p.alpha = Math.random() * 0.8 + 0.2;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle = p.color;

    if (p.type === "star") {
      drawStar(ctx, p.x, p.y, 4, p.size * 1.8, p.size * 0.8);
    } else if (p.type === "snowflake") {
      drawSnowflake(ctx, p.x, p.y, p.size * 1.5);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 2. Draw explosive opening confetti / celebratory burst
  for (let i = 0; i < confettiBurst.length; i++) {
    const c = confettiBurst[i];
    c.x += c.vx;
    c.y += c.vy;
    c.vy += c.gravity;
    c.alpha -= 0.014;
    c.rotation += c.rotSpeed;

    if (c.alpha <= 0) {
      confettiBurst.splice(i, 1);
      i--;
      continue;
    }

    ctx.save();
    ctx.globalAlpha = c.alpha;
    ctx.fillStyle = c.color;
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.4);
    ctx.restore();
  }

  requestAnimationFrame(animateCanvas);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawSnowflake(ctx, x, y, size) {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI) / 3;
    ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    ctx.lineTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size);
  }
  ctx.stroke();
}

// ------------------------------------------------------------------------------
// 4. UNLOCK SCREEN & FESTIVE CELEBRATORY AUDIO
// ------------------------------------------------------------------------------
let isUnlocked = false;
let isAudioPlaying = false;
let audioCtx = null;
let chimeInterval = null;

// Romantic December Festive Chime Synthesizer (Fallback if no MP3 uploaded)
function startFestiveChimes() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    // Festive wedding bell harmony (D major romantic celebratory progression)
    const notes = [293.66, 369.99, 440.00, 587.33, 739.99, 880.00];
    let noteIdx = 0;

    function ringBell(freq) {
      if (!audioCtx || audioCtx.state === "suspended") return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.4);
    }

    chimeInterval = setInterval(() => {
      if (isAudioPlaying) {
        ringBell(notes[noteIdx % notes.length]);
        noteIdx = (noteIdx + 1) % notes.length;
      }
    }, 1100);
  } catch (e) {
    console.log("Audio not supported");
  }
}

function unlockInvitation(e) {
  if (isUnlocked) return;
  isUnlocked = true;

  // Trigger burst at button position
  const rect = openInvitationBtn ? openInvitationBtn.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  triggerCelebratoryBurst(originX, originY);

  // Animate unlock overlay
  unlockOverlay.classList.add("opened");
  document.body.classList.remove("locked");

  playAudio();
}

function playAudio() {
  weddingAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioUI(true);
  }).catch(() => {
    // If MP3 not yet provided, play festive chime harmony
    startFestiveChimes();
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
  if (isPlaying) {
    audioBtn.classList.add("audio-playing");
    audioPlayIcon.classList.remove("hidden");
    audioMuteIcon.classList.add("hidden");
  } else {
    audioBtn.classList.remove("audio-playing");
    audioPlayIcon.classList.add("hidden");
    audioMuteIcon.classList.remove("hidden");
  }
}

if (openInvitationBtn) {
  openInvitationBtn.addEventListener("click", unlockInvitation);
}
if (audioBtn) {
  audioBtn.addEventListener("click", toggleAudio);
}

// ------------------------------------------------------------------------------
// 5. LIVE COUNTDOWN TIMER (DECEMBER 2026)
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
      const heading = document.querySelector(".countdown-festive-title");
      if (heading) heading.textContent = "TODAY IS OUR WEDDING DAY! ✨💍";
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
// 6. CALENDAR INTEGRATION (.ICS DOWNLOAD & GOOGLE CALENDAR)
// ------------------------------------------------------------------------------
function setupCalendarButtons() {
  const btnIcs = document.getElementById("btn-add-calendar");
  const btnGoogle = document.getElementById("btn-google-calendar");

  const startDate = new Date(WEDDING_CONFIG.weddingDateISO);
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours celebration

  function formatDateToICS(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  }

  // 1. Google Calendar
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

  // 2. Downloadable .ICS File
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
// 7. INTERACTIVE RSVP FORM & DIRECT WHATSAPP SENDER
// ------------------------------------------------------------------------------
function setupRSVPForm() {
  const radioOptions = document.querySelectorAll(".attendance-options-grid .festive-radio-option");
  const guestCountInput = document.getElementById("guest-count");
  const btnMinus = document.getElementById("stepper-minus");
  const btnPlus = document.getElementById("stepper-plus");
  const guestCountRow = document.getElementById("guest-count-row");

  radioOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      radioOptions.forEach(r => r.classList.remove("active"));
      opt.classList.add("active");

      const radio = opt.querySelector("input[type='radio']");
      if (radio) {
        radio.checked = true;
        if (radio.value === "Regretfully Decline") {
          guestCountRow.style.opacity = "0.35";
        } else {
          guestCountRow.style.opacity = "1";
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

  let textMessage = `✨ *DECEMBER WEDDING RSVP: UDARI & PRABATH* ✨\n\n`;
  textMessage += `👤 *Guest Name:* ${guestName}\n`;
  textMessage += `💌 *Attendance:* ${selectedAttendance}\n`;

  if (selectedAttendance === "Joyfully Accept") {
    textMessage += `👥 *Number of Guests:* ${guestCount}\n`;
  }

  if (guestMessage) {
    textMessage += `💬 *Warm Wishes:* ${guestMessage}\n`;
  }

  textMessage += `\n_Sent via Udari & Prabath's December Wedding Website_ 🎄💍`;

  const encodedUrl = `https://wa.me/${WEDDING_CONFIG.rsvpWhatsAppNumber}?text=${encodeURIComponent(textMessage)}`;
  window.open(encodedUrl, "_blank");
};

// ------------------------------------------------------------------------------
// 8. CLIPBOARD HELPER & TOAST ALERT
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
// 9. SCROLL REVEAL (IntersectionObserver)
// ------------------------------------------------------------------------------
function initScrollReveal() {
  const fadeElements = document.querySelectorAll(".fade-in");
  
  if (!("IntersectionObserver" in window)) {
    fadeElements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ------------------------------------------------------------------------------
// 10. ACTIVE MOBILE BOTTOM NAV
// ------------------------------------------------------------------------------
function initMobileNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".mobile-bottom-nav .nav-item");

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, { passive: true });
}

// ------------------------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCanvasEngine();
  initCountdown();
  setupCalendarButtons();
  setupRSVPForm();
  initScrollReveal();
  initMobileNav();
});
