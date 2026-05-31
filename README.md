# Aman's Watch Vault 🎬

A modern, beautiful personal website to showcase all the anime and TV series you've watched. Built with React, Vite, and Tailwind CSS — fully static with no backend required.

## ✨ Features

- **Beautiful Dark Theme** — Cinematic design with smooth animations
- **Separate Anime & Series Pages** — Browse your collection by type
- **Powerful Search & Filters** — Find titles instantly
- **Favorites Gallery** — Showcase your top picks
- **Rich Statistics** — Charts and analytics for your watch history
- **Detailed Media Pages** — Full information with ratings, genres, and reviews
- **Fully Responsive** — Perfect on mobile, tablet, and desktop
- **100% Static** — No database, no backend, just a JSON file

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📝 Adding Your Data

All your watch data is stored in `data/watchlist.json`. Simply edit this file to add, remove, or update entries.

### Data Structure

```json
{
  "id": 1,
  "title": "Breaking Bad",
  "type": "series",
  "year": 2008,
  "genres": ["Crime", "Drama", "Thriller"],
  "poster": "https://image.tmdb.org/t/p/w500/poster.jpg",
  "banner": "https://image.tmdb.org/t/p/original/banner.jpg",
  "status": "completed",
  "rating": 10,
  "favorite": true,
  "thoughts": "One of the greatest TV series ever made.",
  "synopsis": "A high school chemistry teacher turned meth manufacturer...",
  "review": "Absolutely phenomenal storytelling and character development."
}
```

### Field Descriptions

- **id** (required): Unique number for each entry
- **title** (required): Name of the anime/series
- **type** (required): Either `"anime"` or `"series"`
- **year** (required): Release year
- **genres** (required): Array of genre strings
- **poster** (required): URL to poster image (2:3 aspect ratio recommended)
- **banner** (optional): URL to banner image for detail page
- **status** (required): One of: `"completed"`, `"watching"`, `"plan_to_watch"`, `"dropped"`
- **rating** (required): Number from 0-10
- **favorite** (required): `true` or `false`
- **thoughts** (optional): Short personal note
- **synopsis** (optional): Plot summary
- **review** (optional): Your detailed review
- **episodes** (optional): Number of episodes
- **seasons** (optional): Number of seasons

### Finding Poster Images

Use [The Movie Database (TMDB)](https://www.themoviedb.org/) to find high-quality posters:
1. Search for your title
2. Go to the "Images" section
3. Copy the poster URL (use `w500` size for posters, `original` for banners)

## 🎨 Customization

### Add Your Photo

Edit `src/pages/home.tsx` and update the `AMAN_PHOTO_URL` constant at the top:

```typescript
const AMAN_PHOTO_URL = "https://your-photo-url.jpg";
```

### Change Colors

Edit `src/index.css` to customize the color scheme. The theme uses CSS variables for easy customization.

### Update Site Title

Edit `index.html` to change the page title and meta description.

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** — Vercel will automatically detect your Vite project

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Update vite.config.ts** — add base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   });
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite** — Build tool
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Styling
- **Wouter** — Lightweight routing
- **Framer Motion** — Animations
- **Recharts** — Statistics charts
- **shadcn/ui** — UI components
- **Lucide React** — Icons

## 📁 Project Structure

```
├── data/
│   └── watchlist.json          # Your watch data
├── public/
│   └── favicon.svg             # Site icon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Layout.tsx
│   │   ├── MediaCard.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   └── useWatchlist.ts     # Data hooks
│   ├── pages/                  # Page components
│   │   ├── home.tsx
│   │   ├── anime.tsx
│   │   ├── series.tsx
│   │   ├── favorites.tsx
│   │   ├── stats.tsx
│   │   ├── media-detail.tsx
│   │   └── not-found.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 💡 Tips

- **Keep IDs unique** — Each entry needs a unique ID number
- **Use high-quality images** — Posters look best at 500px width minimum
- **Be consistent with ratings** — Use the same scale (0-10) for all entries
- **Mark favorites sparingly** — Makes the Favorites page more meaningful
- **Add reviews** — Personal thoughts make your vault unique

## 🐛 Troubleshooting

### Images not loading?
- Check that URLs are valid and publicly accessible
- Use HTTPS URLs (not HTTP)
- TMDB images work great: `https://image.tmdb.org/t/p/w500/...`

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then reinstall

### Routing issues on deployment?
- Make sure your hosting platform is configured for SPA routing
- Vercel and Netlify handle this automatically
- For other hosts, you may need to add a redirect rule

## 📄 License

MIT License - feel free to use this for your own watch vault!

## 🙏 Credits

Built with love using modern web technologies. UI inspired by streaming platforms like Netflix and Disney+.

---

**Enjoy your Watch Vault! 🎉**
