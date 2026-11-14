# 💍 Udari & Prabath — Wedding Invitation Website

A mobile-first, luxury **Sri Lankan Heritage** digital wedding invitation card built with pure HTML5, CSS3, and vanilla JavaScript. 

Features an interactive royal envelope with wax seal unlock, live countdown timer, `.ics` & Google Calendar integration, ceremony itinerary, Google Maps directions, automated WhatsApp RSVP generator, and floating music controller.

---

## 🌟 Key Features

1. **Interactive Royal Envelope Unlock & Red Curtains**:
   - Guests are greeted with an ornate curtain reveal and wax seal unlock.
   - Touching the seal plays background music and smoothly opens the royal scroll proclamation.
2. **Sri Lankan Heritage Aesthetic**:
   - Royal Maroon (`#520d1c`), Antique Gold (`#d4af37`), and Warm Ivory color palette.
   - Traditional Poruwa motifs, *Jaya Mangalam* blessings, and Kandyan-inspired borders.
3. **Save The Date & Live Countdown**:
   - Live Days, Hours, Minutes, and Seconds countdown down to the auspicious Poruwa time (10:00 AM, 10th December 2026).
   - **Save to Calendar (.ics)** button for Apple / Outlook calendar + direct **Add to Google Calendar** link.
4. **Direct Confirm RSVP (No WhatsApp Requirement)**:
   - Guests enter their name, select attendance (*Joyfully Accept* or *Regretfully Decline*), specify guest count, and optional blessings.
   - Submits directly on the card and shows a warm, romantic confirmation card.
5. **Private Security-PIN Admin Portal (`admin.html`)**:
   - Secret PIN-protected dashboard (Default PIN: `2026`).
   - Live counters: Total Confirmed Guests Count, Total Accepted, Total Declined.
   - Instant **1-Click "Download Excel (.csv)"** button with UTF-8 BOM encoding for Microsoft Excel.
   - Real-time guest search & filter.
   - Optional 1-minute Google Sheets Cloud Sync integration for cross-device updates.
6. **Tap-to-Call & One-Tap Copy**:
   - Direct call and "Copy Phone Number" buttons with feedback toast.
7. **Mobile-First & Ultra-Fast**:
   - Zero heavy libraries or external JS frameworks (100% pure vanilla JS & CSS).
   - Pre-configured OpenGraph meta tags for rich previews on WhatsApp, Viber, and Facebook.

---

## 🚀 Quick Setup & Customization Guide

### 1. Update Wedding Details
Open `script.js` and edit the top configuration block:

```javascript
const WEDDING_CONFIG = {
  brideName: "Udari",
  groomName: "Prabath",
  weddingDateISO: "2026-12-10T10:00:00+05:30",
  eventTitle: "Udari & Prabath Wedding Celebration",
  eventDescription: "Udari & Prabath Wedding Celebration at Ramira Reception Hall, Agalawaththa (Poruwa Ceremony: 10:00 AM)",
  venueName: "Ramira Reception Hall",
  venueAddress: "No. 148, Yatiyana, Agalawaththa, Sri Lanka",
  venueMapsURL: "https://maps.app.goo.gl/ub2awTQqFTStJXy36",
  
  // Set the WhatsApp phone number (with Sri Lanka country code 94, without + or 0)
  rsvpWhatsAppNumber: "94772921684",
  
  // Family contact numbers
  contact1Phone: "+94 77 292 1684",
  contact2Phone: "+94 70 155 1244"
};
```

Open `index.html` to customize parents' names, venue address, and story descriptions to your exact preferences.

### 2. Add Photos
Place your couple photos in `assets/images/`:
- `story-1.jpg`: How you met
- `story-2.jpg`: Dating journey
- `story-3.jpg`: The proposal / engagement
- `venue.jpg`: Venue / hall photo
- `og-preview.jpg`: WhatsApp share preview image (1200x630px)

### 3. Add Background Music (Optional)
Place any instrumental MP3 song inside `assets/audio/` and rename it to:
`wedding-song.mp3`

*(Note: If no audio file is provided, the card automatically plays a peaceful traditional chime melody using the browser's Web Audio API)*.

---

## 🌐 Deploy to GitHub Pages in 2 Minutes

Since your Git repository is already connected to `theekshanathushan/Udari-Prabath-Wedding`:

1. Commit and push the code:
   ```bash
   git add .
   git commit -m "Launch Udari & Prabath Wedding Invitation Card"
   git push -u origin main
   ```

2. Turn on GitHub Pages:
   - Go to your repository on GitHub: `https://github.com/theekshanathushan/Udari-Prabath-Wedding`
   - Click on **Settings** (top menu).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Branch**:
     - Select branch: `main`
     - Select folder: `/(root)`
     - Click **Save**.

3. In 1–2 minutes, your live website will be published at:
   **`https://theekshanathushan.github.io/Udari-Prabath-Wedding/`**

---

## 📱 Testing on Mobile
- Open `https://theekshanathushan.github.io/Udari-Prabath-Wedding/` on your mobile browser (Safari / Chrome).
- Send the link to yourself on WhatsApp to verify that the rich preview card (title, image, description) shows up!

