# Nishanth R — 3D Portfolio

An interactive 3D portfolio built with React, Vite, Three.js, and Tailwind CSS. Features live experience data from a backend API, dynamic theme switching, and an admin panel.

**Live:** [https://portfolio.nishanthr.kesug.com/](https://portfolio.nishanthr.kesug.com/)

## Tech Stack

- **React 18** + **Vite**
- **Three.js** / **React Three Fiber** / **Drei** — 3D models (Robot, Desktop PC, Earth, Stars)
- **Tailwind CSS** — CSS variable-based theming (4 color themes)
- **Framer Motion** — animations
- **EmailJS** — contact form emails
- **React Router v6** — routing + `/admin` panel

## Features

- 4 color themes (Orange, Blue, Purple, Green) — persists in localStorage, default set from API
- Experience timeline fetches live from backend API (falls back to local data if API is sleeping)
- Resume PDF served from Cloudinary CDN (falls back to local PDF)
- Contact form dual-writes to DB + sends email via EmailJS
- Admin panel at `/admin` — manage messages, experiences, resume, and default theme

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env
cp .env.example .env
# Fill in VITE_EMAILJS_* and VITE_API_BASE_URL

# 3. Run dev server → http://localhost:5173
npm run dev

# 4. Build for production
npm run build   # outputs to dist/
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_API_BASE_URL` | Backend API URL (e.g. `https://portfolio-api.onrender.com`) |

## Admin Panel

Visit `/admin/login` with your seeded admin credentials.

| Route | Purpose |
|---|---|
| `/admin/messages` | View, mark-read, delete contact messages |
| `/admin/experiences` | Add / edit / delete work experience entries |
| `/admin/resume` | Upload a new PDF resume to Cloudinary |
| `/admin/settings` | Change the default site color theme |

## Deployment (Render)

Deployed as a **static site** on Render.

- Build command: `npm run build`
- Publish directory: `dist`
- Add all `VITE_*` env vars in the Render dashboard

## Backend

The API lives in `../portfolio-api/`. See its README for setup instructions.

## Contact

[nishanthr20010101@gmail.com](mailto:nishanthr20010101@gmail.com) | [LinkedIn](https://www.linkedin.com/in/nishanth-r-a70720209/)
