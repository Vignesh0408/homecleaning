# 🧼 Solo Maid / Home-Cleaning Marketing Website Template (v2 U.S. Edition Guide)

This repository contains a high-class, responsive, secure, and mobile-first marketing website template designed for independent domestic help professionals and home-cleaning services in the U.S. market.

---

## 🚀 How to Reuse This Template for a New U.S. Client

Follow these 3 simple steps to customize the site for a new client:

### 1. Color Palette Customization (`assets/css/styles.css`)
Open `assets/css/styles.css`. At the very top in `:root`, swap the CSS custom properties to match any of the 3 pre-tested color palettes:

#### Option A: "Fresh & Trusted" (Default Active)
```css
:root {
  --bg-main: #F7F9F7;
  --text-main: #1E2A24;
  --accent-primary: #1F9D6B;       /* Emerald Green */
  --accent-secondary: #FFB020;     /* Sunflower Yellow */
  --accent-highlight: #FF6F59;     /* Warm Coral */
}
```

#### Option B: "Sunlit Home"
```css
:root {
  --bg-main: #FFF8F0;
  --text-main: #2B2420;
  --accent-primary: #FF6B4A;       /* Warm Coral */
  --accent-secondary: #1B7A72;     /* Deep Teal */
  --accent-highlight: #FFC24B;     /* Highlight Gold */
}
```

#### Option C: "Cozy Confidence"
```css
:root {
  --bg-main: #FBF3E7;
  --text-main: #3A2A2E;
  --accent-primary: #E8604C;       /* Terracotta Rose */
  --accent-secondary: #0F6E6A;     /* Deep Teal */
  --accent-highlight: #F7C948;     /* Buttery Yellow */
}
```

---

### 2. Client Placeholder Data (`index.html`)
Open `index.html` and replace the client details:

| Field | Active U.S. Value | Replacement Notes |
| :--- | :--- | :--- |
| **Business Name** | `CleanSpark Home Care` | Swappable client name / agency |
| **Client Name** | `Sarah Jenkins` | Headshot alt tag & bio |
| **Phone Number** | `(512) 555-0199` | Update `tel:+15125550199` links & display |
| **Text SMS** | `sms:+15125550199` | Replaces WhatsApp for U.S. market |
| **City / State** | `Austin, TX` | Update city & ZIP codes in `#area` & JSON-LD |
| **Trust Badge** | `Insured, Bonded & Background-Checked` | Standard U.S. trust copy |
| **Pricing ($ USD)** | `$120`, `$220`, `$290` | Transparent starting rates |

---

### 3. Replace Images & Videos (`assets/images/` & `assets/video/`)
- `assets/images/hero-cleaner.jpg`: Professional headshot / cleaner in U.S. home interior *(Flagged: needs client's real photo)*.
- `assets/images/kitchen-clean.jpg`: Kitchen before/after photo.
- `assets/images/bathroom-clean.jpg`: Bathroom before/after photo.
- `assets/images/cleaning-action.jpg`: Cleaning action detail photo.
- `assets/video/cleaning-demo.mp4`: Short 15–40 sec work video clip.

---

## 🔒 Security & Standards Built-In (2026 Baseline)
- **Content-Security-Policy (CSP)** meta tag & headers configured in `_headers` and `netlify.toml`.
- **Honeypot Anti-Spam** protection included on callback form (`#website_url`).
- **Input Sanitization** in `assets/js/main.js` preventing XSS vulnerabilities.
- **WCAG 2.2 AA Accessibility**: Full keyboard support, skip link, 44px+ tap targets, high contrast ratios.
- **Structured Data**: Schema.org `HouseCleaning` JSON-LD formatted for U.S. address structure.
