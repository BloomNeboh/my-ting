# Eliud — Personal Portfolio

A modern, responsive portfolio for Eliud — Tourism Marketing Manager & Web Developer. Built with a dark futuristic aesthetic, neon accents, glassmorphism cards, smooth scroll animations, and a light/dark theme switcher with a ripple effect.

## Preview
- Open `index.html` directly in a browser, or use a static server (recommended) for correct caching and paths.

## Tech Stack

### Languages / Core

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E)

### UI/UX Techniques

![Glassmorphism](https://img.shields.io/badge/Glassmorphism-0b0f14?labelColor=0b0f14&color=4cc9ff)
![Neon%20Glow](https://img.shields.io/badge/Neon%20Glow-00f5a0?labelColor=0b0f14&color=00f5a0)
![Responsive](https://img.shields.io/badge/Responsive-Design-0b0f14?logo=responsive&logoColor=white&color=ff46c6)
![Light/Dark](https://img.shields.io/badge/Light/Dark-Theme-0b0f14?color=ff8a00)

### Browser APIs

![IntersectionObserver](https://img.shields.io/badge/IntersectionObserver-API-0b0f14?color=4cc9ff)
![CSS%20Variables](https://img.shields.io/badge/CSS-Variables-0b0f14?color=72ddff)
![Web%20Animations](https://img.shields.io/badge/CSS-Keyframes-0b0f14?color=ff46c6)

## Features
- Dark futuristic UI with neon accents (blue/green/orange/pink)
- Glassmorphism cards with hover neon borders
- Light & Dark theme with animated sun/moon toggle
- Ripple wave animation on theme switch
- Scroll-triggered fade-in animations
- Smooth scrolling navigation
- Responsive across mobile, tablet, and desktop
- Icons-only Contact section with glow hover
- Coffee Chat footer CTA (WhatsApp + cal.com)

## Project Structure

## Getting Started

### 1) Install/Place Assets
- Add your images to `assets/hero/profile.jpg` and `assets/refs/ref1.jpg`–`ref3.jpg`.
- Add logo icons to `assets/logos/` (email.png, whatsapp.png, facebook.png, linkedin.png).
- Optional: place your CV at `assets/Neboh_CV.pdf` (the CTA links to this path).

### 2) Run Locally
- Fastest: open `index.html` in your browser.
- Recommended: serve with a local static server to avoid CORS/path issues.

Examples:

```bash
# Python 3
python -m http.server 5500
# Node (http-server)
npx http-server -p 5500
```

Then visit `http://localhost:5500/my-portfolio/`.

### 3) Customize Links
- Update placeholder links in `index.html` for Email, WhatsApp, Facebook, LinkedIn, and cal.com.
- Replace referee names/roles/testimonials and WhatsApp numbers in the Referees section.

## Deployment

### GitHub Pages
1. Push the repository to GitHub.
2. In the repo settings → Pages, set the branch to `main` (or `docs`) and the root to `/`.
3. Access your site at the provided GitHub Pages URL.

### Any Static Host
- Upload the entire `my-portfolio/` folder to Netlify, Vercel, Cloudflare Pages, or any static hosting provider.

## Theming & Accents
- The site uses CSS variables defined in `:root` and `html[data-theme='light']`.
- JavaScript cycles accent colors and toggles themes. Relevant variables:
  - `--accent`, `--accent-2`, `--glow`, `--bg`, `--text`, `--muted`, `--card-bg`, `--card-border`.
- Breakpoints are at 640px, 860px, and 900px for layout changes.

## Icons to Display on the Site
- Contact icons (PNG): `assets/logos/email.png`, `whatsapp.png`, `facebook.png`, `linkedin.png`.
- Replace these files with your preferred icon set (ensure similar dimensions ~28×28 px).
- WhatsApp links use the `wa.me` format (e.g., `https://wa.me/<countrycode><number>`).

## Accessibility
- Sufficient color contrast in both themes.
- Focusable controls with clear affordances.
- All images include `alt` text; update descriptions for accuracy.

## Credits
- Fonts: Poppins & Inter via Google Fonts.
- Icons: Placeholder PNGs expected in `assets/logos/` (provide your own or from reputable sources).
- Inspiration: Behance-level personal portfolio styles.

## License
This project is provided as-is for personal portfolio use. You may adapt and customize freely. If publishing as open-source, consider adding an MIT License file.


