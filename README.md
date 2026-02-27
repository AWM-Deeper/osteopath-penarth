# Langdon Osteopathy — Website

A production-grade one-page website for Langdon Osteopathy, an osteopath practice based in Penarth and Barry, Wales.

## Project Structure

```
osteopath-penarth/
├── index.html            # Main HTML file with all 9 sections
├── style.css             # Complete responsive stylesheet
├── app.js                # JavaScript interactions (nav, scroll, FAQ accordion)
├── public/
│   └── images/
│       └── .gitkeep      # Placeholder — add your images here
└── README.md             # This file
```

## Getting Started

### 1. Add Your Images

Place the following images in `public/images/`:

| Filename              | Description                                | Recommended Size     |
|-----------------------|--------------------------------------------|----------------------|
| `hero-bg.jpg`         | Hero section background (clinical/treatment room, Penarth seafront, or similar) | 1920×1080px minimum  |
| `david-langdon.jpg`   | Professional headshot / portrait of David Langdon | 600×800px (3:4 ratio) |

**Image Tips:**
- Use high-quality, well-lit images
- Hero background works best with a dark/moody tone (there's a dark overlay applied in CSS)
- The portrait should be a professional, approachable headshot

### 2. Update Placeholder Content

Before going live, update these placeholder values in `index.html`:

- **Phone number:** Search for `07XXXXXXXX` and replace with the real number
- **Email:** `info@osteopathpenarth.com` — update if different
- **Barry clinic address:** Add the full street address when available
- **Privacy Policy / Terms links:** Currently set to `#` — link to real pages

### 3. Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit — Langdon Osteopathy website"
git remote add origin <your-repo-url>
git push -u origin main

# Then connect to Vercel:
# 1. Go to vercel.com and import the repo
# 2. Framework Preset: Other
# 3. Output Directory: ./ (root)
# 4. Deploy
```

**Vercel Configuration Note:**
For the `/public/images/` paths to work correctly with Vercel's static hosting, you may need to add a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/public/images/(.*)", "destination": "/public/images/$1" }
  ]
}
```

Or simply update image paths in `index.html` to match your deployment structure.

## Technology

- **HTML5** — Semantic markup with full SEO meta tags
- **CSS3** — Custom properties, Grid, Flexbox, responsive design, subtle grain texture
- **Vanilla JavaScript** — No dependencies
- **Google Fonts** — Cormorant Garamond (headings) + DM Sans (body)

## Features

- Mobile-first responsive design
- Mobile hamburger navigation
- Smooth scrolling to sections
- Scroll-triggered reveal animations (Intersection Observer)
- Collapsible FAQ accordion
- Sticky header with scroll-aware styling
- GOsC registration prominently displayed
- Accessible: semantic HTML, ARIA attributes, keyboard-friendly

## Sections

1. **Hero** — Full-viewport with background image, overlay, badge, tagline, CTA
2. **About** — David's bio, credentials, photo
3. **Treatments** — 6 service cards
4. **Pricing** — New (£65) and Follow-up (£55) appointments
5. **How It Works** — 3-step process
6. **Testimonials** — 4 patient reviews
7. **FAQ** — 5 collapsible questions
8. **Contact** — Phone/email CTAs, 2 location cards
9. **Footer** — Links, social, GOsC badge, copyright

## Colour Palette

| Name        | Hex       | Usage                  |
|-------------|-----------|------------------------|
| Deep Navy   | `#0a1628` | Headers, dark sections |
| Warm Sage   | `#7c9a6e` | Accents, CTAs, icons   |
| Cream       | `#faf8f5` | Main background        |
| Soft Gold   | `#c4a265` | Highlights, badges     |
| Light Grey  | `#f5f3ef` | Alternate section bg   |

## Browser Support

Modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions). Graceful fallback for older browsers (animations degrade to static display).

## License

© 2026 Langdon Osteopathy. All rights reserved.