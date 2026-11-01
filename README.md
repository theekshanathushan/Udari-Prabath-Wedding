# 💍 Udari & Prabath — Wedding Invitation Website

A mobile-first, luxury **Sri Lankan Heritage** digital wedding invitation card built with pure HTML5, CSS3, and vanilla JavaScript. 

Features an interactive royal envelope with wax seal unlock, live countdown timer, `.ics` & Google Calendar integration, ceremony itinerary, Google Maps directions, automated WhatsApp RSVP generator, and floating music controller.

---

## 🌟 Key Features

1. **Interactive Royal Envelope Unlock**:
   - Guests are greeted with an ornate maroon and gold envelope with a traditional lotus wax seal.
   - Touching the seal plays background music and smoothly unlocks the invitation page.
2. **Sri Lankan Heritage Aesthetic**:
   - Royal Maroon (`#520d1c`), Antique Gold (`#d4af37`), and Warm Ivory color palette.
   - Traditional Poruwa motifs, *Jaya Mangalam* blessings, and Kandyan-inspired borders.
3. **Save The Date & Live Countdown**:
   - Live Days, Hours, Minutes, and Seconds countdown down to the auspicious Poruwa time.
   - **Save to Calendar (.ics)** button for Apple / Outlook calendar + direct **Add to Google Calendar** link.
4. **Ceremony Itinerary & Dress Code**:
   - Auspicious Nekatha time highlight, Magul Bera welcome, Poruwa ceremony, tea/champagne toast, banquet, and dress code recommendations.
5. **Interactive WhatsApp RSVP**:
   - Guests enter their name, select attendance (*Joyfully Accept* or *Regretfully Decline*), specify guest count, and optional blessings.
   - Generates an instant, pre-filled WhatsApp message sent directly to the couple's WhatsApp number.
6. **Tap-to-Call & One-Tap Copy**:
   - Direct call, WhatsApp, and "Copy Phone Number" buttons with feedback toast.
7. **Mobile-First & Ultra-Fast**:
   - Zero heavy libraries or external JS frameworks (100% pure vanilla JS & CSS).
   - Sticky bottom navigation bar for effortless mobile browsing.
   - Pre-configured OpenGraph meta tags for rich previews on WhatsApp, Viber, and Facebook.

---

## 🚀 Quick Setup & Customization Guide

### 1. Update Wedding Details
Open `script.js` and edit the top configuration block:

```javascript
const WEDDING_CONFIG = {
  brideName: "Udari",
  groomName: "Prabath",
  weddingDateISO: "2026-12-12T08:30:00+05:30", // Change to exact wedding date and time
  eventTitle: "Wedding of Udari & Prabath",
  eventDescription: "Poruwa Ceremony & Wedding Reception of Udari & Prabath",
  venueName: "Cinnamon Grand Colombo (Grand Ballroom)",
  venueAddress: "77 Galle Road, Colombo 00300, Sri Lanka",
  venueMapsURL: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
  
  // Set the WhatsApp phone number (with Sri Lanka country code 94, without + or 0)
  rsvpWhatsAppNumber: "94771234567",
  
  // Family contact numbers
  contact1Phone: "+94 77 123 4567",
  contact2Phone: "+94 71 987 6543"
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

