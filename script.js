/**
 * ==============================================================================
 * UDARI & PRABATH WEDDING INVITATION — JAVASCRIPT LOGIC
 * Mobile-First, Vanilla JS, Zero Dependencies
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. WEDDING DETAILS CONFIGURATION (Easy to customize in one place!)
// ------------------------------------------------------------------------------
const WEDDING_CONFIG = {
  brideName: "Udari",
  groomName: "Prabath",
  weddingDateISO: "2026-12-12T08:30:00+05:30", // YYYY-MM-DDTHH:mm:ss+Timezone (Auspicious Poruwa Date)
  eventTitle: "Wedding of Udari & Prabath",
  eventDescription: "Poruwa Ceremony & Wedding Reception of Udari & Prabath at Cinnamon Grand Colombo.",
  venueName: "Cinnamon Grand Colombo (Grand Ballroom / Oak Room)",
  venueAddress: "77 Galle Road, Colombo 00300, Sri Lanka",
  venueMapsURL: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
  
  // RSVP WhatsApp Number (Use international format WITHOUT + or spaces, e.g. 94771234567)
  rsvpWhatsAppNumber: "94771234567",
  
  // Contacts
  contact1Phone: "+94 77 123 4567",
  contact2Phone: "+94 71 987 6543"
};

// ------------------------------------------------------------------------------
// 2. DOM ELEMENTS
// ------------------------------------------------------------------------------
const unlockOverlay = document.getElementById("unlock-overlay");
const openInvitationBtn = document.getElementById("open-invitation-btn");
const weddingAudio = document.getElementById("wedding-audio");
const audioControlWrapper = document.getElementById("audio-control-wrapper");
const audioBtn = document.getElementById("audio-btn");
const audioPlayIcon = document.querySelector(".audio-icon-play");
const audioMuteIcon = document.querySelector(".audio-icon-mute");
const toastElement = document.getElementById("toast");
const toastText = document.getElementById("toast-text");

// Lock scrolling initially
document.body.classList.add("locked");

// ------------------------------------------------------------------------------
// 3. INTERACTIVE UNLOCK SCREEN & AUDIO START
// ------------------------------------------------------------------------------
let isUnlocked = false;
let isAudioPlaying = false;
let webAudioSynthActive = false;
let audioCtx = null;
let melodyInterval = null;

// Gentle Web Audio API synthesizer fallback (Sri Lankan traditional celebratory chimes)
// Plays automatically if the user hasn't added an MP3 file yet!
function startWebAudioChimes() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Pentatonic celebratory scale
    let noteIdx = 0;

    function playNote(freq) {
      if (!audioCtx || audioCtx.state === "suspended") return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.0);
    }

    melodyInterval = setInterval(() => {
      if (isAudioPlaying) {
        playNote(notes[noteIdx % notes.length]);
        noteIdx = (noteIdx + 1) % notes.length;
      }
    }, 1200);

    webAudioSynthActive = true;
  } catch (e) {
    console.log("Web Audio not supported or blocked");
  }
}

function unlockInvitation() {
  if (isUnlocked) return;
  isUnlocked = true;

  // Animate and hide overlay
  unlockOverlay.classList.add("opened");
  document.body.classList.remove("locked");

  // Attempt to play audio
  playAudio();
}

function playAudio() {
  weddingAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioUI(true);
  }).catch(() => {
    // If MP3 file not found or autoplay denied, activate synthetic chime fallback
    startWebAudioChimes();
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
// 4. LIVE COUNTDOWN TIMER
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
      const heading = document.querySelector(".countdown-heading");
      if (heading) heading.textContent = "TODAY IS OUR WEDDING DAY!";
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
// 5. CALENDAR INTEGRATION (.ICS DOWNLOAD & GOOGLE CALENDAR)
// ------------------------------------------------------------------------------
function setupCalendarButtons() {
  const btnIcs = document.getElementById("btn-add-calendar");
  const btnGoogle = document.getElementById("btn-google-calendar");

  const startDate = new Date(WEDDING_CONFIG.weddingDateISO);
  // Assume a 6 hour duration for Poruwa + Reception
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);

  function formatDateToICS(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  }

  // 1. Google Calendar Link
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

  // 2. Downloadable .ICS File for Apple, Outlook, Android
  if (btnIcs) {
    btnIcs.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Udari & Prabath Wedding//EN",
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
      tempLink.setAttribute("download", "Udari-Prabath-Wedding.ics");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);

      showToast("Calendar event (.ics) downloaded!");
    });
  }
}

// ------------------------------------------------------------------------------
// 6. INTERACTIVE RSVP FORM & WHATSAPP GENERATOR
// ------------------------------------------------------------------------------
function setupRSVPForm() {
  const radioCards = document.querySelectorAll(".attendance-radio-group .radio-card");
  const guestCountInput = document.getElementById("guest-count");
  const btnMinus = document.getElementById("stepper-minus");
  const btnPlus = document.getElementById("stepper-plus");
  const guestCountGroup = document.getElementById("guest-count-group");

  // Radio selection styling
  radioCards.forEach(card => {
    card.addEventListener("click", () => {
      radioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const radio = card.querySelector("input[type='radio']");
      if (radio) {
        radio.checked = true;
        // If declining, optionally hide guest count
        if (radio.value === "Regretfully Decline") {
          guestCountGroup.style.opacity = "0.4";
        } else {
          guestCountGroup.style.opacity = "1";
        }
      }
    });
  });

  // Stepper controls
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

// WhatsApp RSVP Dispatcher
window.sendWhatsAppRSVP = function () {
  const guestName = document.getElementById("guest-name").value.trim();
  const selectedAttendance = document.querySelector("input[name='attendance']:checked").value;
  const guestCount = document.getElementById("guest-count").value;
  const guestMessage = document.getElementById("guest-message").value.trim();

  if (!guestName) {
    alert("Please enter your name.");
    return;
  }

  let textMessage = `*WEDDING RSVP: UDARI & PRABATH*\n\n`;
  textMessage += `👤 *Name:* ${guestName}\n`;
  textMessage += `💌 *Attendance:* ${selectedAttendance}\n`;
  
  if (selectedAttendance === "Joyfully Accept") {
    textMessage += `👥 *Number of Guests:* ${guestCount}\n`;
  }

  if (guestMessage) {
    textMessage += `💬 *Wishes / Note:* ${guestMessage}\n`;
  }

  textMessage += `\n_Sent via Udari & Prabath's Wedding Invitation Website_`;

  const encodedUrl = `https://wa.me/${WEDDING_CONFIG.rsvpWhatsAppNumber}?text=${encodeURIComponent(textMessage)}`;
  window.open(encodedUrl, "_blank");
};

// ------------------------------------------------------------------------------
// 7. COPY TO CLIPBOARD HELPER & TOAST NOTIFICATION
// ------------------------------------------------------------------------------
window.copyContact = function (text, btnElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied: ${text}`);
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
    showToast(`Copied: ${text}`);
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
// 8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
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
// 9. ACTIVE MOBILE NAVIGATION HIGHLIGHTER
// ------------------------------------------------------------------------------
function initMobileNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".mobile-bottom-nav .nav-item");

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 200;

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
// INITIALIZE ON DOM READY
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  setupCalendarButtons();
  setupRSVPForm();
  initScrollReveal();
  initMobileNav();
});
