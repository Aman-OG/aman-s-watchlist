# How to Update Poster & Banner Images

Most of your current poster/banner URLs are placeholders. Here's how to get real working images:

## 🎬 Using The Movie Database (TMDB) - Recommended

TMDB has high-quality images for almost every movie, TV show, and anime.

### Step-by-Step:

1. **Go to [themoviedb.org](https://www.themoviedb.org/)**

2. **Search for your title** (e.g., "Breaking Bad")

3. **Click on the result** to go to the title's page

4. **Get the Poster:**
   - Click on the poster image
   - Right-click and select "Copy Image Address"
   - The URL should look like: `https://image.tmdb.org/t/p/original/xxxxx.jpg`
   - **For JSON, change `/original/` to `/w500/`** for posters
   - Example: `https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`

5. **Get the Banner (Backdrop):**
   - Scroll down to "Backdrops" section
   - Click on a backdrop image you like
   - Right-click and select "Copy Image Address"
   - Keep `/original/` for banners (full quality)
   - Example: `https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg`

### Quick URL Format:

```
Poster:  https://image.tmdb.org/t/p/w500/[IMAGE_ID].jpg
Banner:  https://image.tmdb.org/t/p/original/[IMAGE_ID].jpg
```

## 📝 Updating Your JSON

Open `data/watchlist.json` and update each entry:

```json
{
  "id": 11,
  "title": "Breaking Bad",
  "poster": "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  "banner": "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
  ...
}
```

## 🎨 Alternative Sources

### For Anime:
- **MyAnimeList** - [myanimelist.net](https://myanimelist.net/)
- **AniList** - [anilist.co](https://anilist.co/)
- **Kitsu** - [kitsu.io](https://kitsu.io/)

### For TV Series:
- **TVMaze** - [tvmaze.com](https://www.tvmaze.com/)
- **TheTVDB** - [thetvdb.com](https://thetvdb.com/)

## ⚡ Quick Tips

1. **Use HTTPS URLs** - Always use `https://` not `http://`
2. **Test the URL** - Paste it in your browser to make sure it loads
3. **Poster Size** - Use `w500` for posters (good balance of quality/size)
4. **Banner Size** - Use `original` for banners (full quality for hero sections)
5. **Aspect Ratios:**
   - Posters: 2:3 ratio (portrait)
   - Banners: 16:9 ratio (landscape)

## 🔧 Bulk Update Script (Optional)

If you want to update many titles at once, you can use the TMDB API:

1. Get a free API key from [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Use the API to search and get image URLs programmatically

## ✅ Already Updated

I've already updated these titles with working images:
- Breaking Bad (id: 11) ⭐ Favorite
- Game of Thrones (id: 21) ⭐ Favorite
- Stranger Things (id: 59) ⭐ Favorite
- Attack on Titan (id: 89) ⭐ Favorite
- Death Note (id: 93) ⭐ Favorite

These will show up in your Favorites page now!

## 🎯 Priority List

Update these high-rated titles first for maximum impact:
1. All items with rating 9-10
2. Your personal favorites
3. Most popular titles
4. Everything else

---

**Pro Tip:** The site will hot-reload as you save changes to `watchlist.json`, so you can see updates instantly!
