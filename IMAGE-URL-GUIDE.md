# 🖼️ How to Get the CORRECT Image URL

## ❌ WRONG - What You're Doing Now

```json
"poster": "https://www.themoviedb.org/tv/118357-1883#"
```

This is the **webpage URL**, not the image file!

## ✅ CORRECT - What You Need

```json
"poster": "https://image.tmdb.org/t/p/w500/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg"
```

This is the **direct image URL**!

---

## 📋 Step-by-Step Instructions

### For "1883" Example:

1. **Go to TMDB page:**
   ```
   https://www.themoviedb.org/tv/118357-1883
   ```

2. **Click on the poster image** (the tall vertical image on the left side)

3. **A popup/lightbox opens** showing the full-size image

4. **Right-click on the image** in the popup

5. **Select "Copy Image Address"** (Chrome) or **"Copy Image Link"** (Firefox)

6. **You'll get something like:**
   ```
   https://image.tmdb.org/t/p/original/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg
   ```

7. **Change `/original/` to `/w500/` for posters:**
   ```
   https://image.tmdb.org/t/p/w500/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg
   ```

8. **Paste this into your JSON!**

---

## 🎯 Key Differences

### ❌ WRONG URL Pattern:
```
https://www.themoviedb.org/tv/[ID]-[NAME]
https://www.themoviedb.org/tv/118357-1883#
```
- Starts with `www.themoviedb.org`
- Contains `/tv/` or `/movie/`
- This is a **webpage**, not an image!

### ✅ CORRECT URL Pattern:
```
https://image.tmdb.org/t/p/w500/[IMAGE_ID].jpg
https://image.tmdb.org/t/p/w500/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg
```
- Starts with `image.tmdb.org`
- Contains `/t/p/w500/` or `/t/p/original/`
- Ends with `.jpg` or `.png`
- This is the **actual image file**!

---

## 🎬 Complete Example for "1883"

```json
{
  "id": 1,
  "title": "1883",
  "type": "series",
  "year": 2021,
  "genres": ["Drama", "Western"],
  "poster": "https://image.tmdb.org/t/p/w500/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg",
  "banner": "https://image.tmdb.org/t/p/original/waLbm384SQDwLTCn6ttPqQS5kfV.jpg",
  "status": "completed",
  "rating": 8,
  "favorite": false,
  "thoughts": ""
}
```

---

## 🔍 Alternative Method (Easier!)

If right-clicking doesn't work:

1. **Go to the TMDB page**
2. **Scroll down to "Posters" section**
3. **Click "View All Posters"**
4. **Click on a poster you like**
5. **Look at the URL in your browser** - it will show the image ID
6. **Manually construct the URL:**
   ```
   https://image.tmdb.org/t/p/w500/[IMAGE_ID_FROM_URL].jpg
   ```

---

## 📦 Quick Reference

### Poster URLs (use w500):
```
https://image.tmdb.org/t/p/w500/[IMAGE_ID].jpg
```

### Banner URLs (use original):
```
https://image.tmdb.org/t/p/original/[IMAGE_ID].jpg
```

### Size Options:
- `w500` - Good for posters (500px wide)
- `w780` - Larger posters
- `original` - Full quality (use for banners)

---

## ✅ Test Your URL

Before adding to JSON, **paste the URL in your browser**:
- ✅ If you see JUST the image → Correct!
- ❌ If you see a webpage → Wrong URL!

---

## 🎯 Ready-to-Use URLs for Popular Titles

Copy these directly into your JSON:

### Breaking Bad
```json
"poster": "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
"banner": "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg"
```

### Game of Thrones
```json
"poster": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
"banner": "https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg"
```

### 1883
```json
"poster": "https://image.tmdb.org/t/p/w500/xbzD5Dka5EcfQYaJQ3SIrgfNnKj.jpg",
"banner": "https://image.tmdb.org/t/p/original/waLbm384SQDwLTCn6ttPqQS5kfV.jpg"
```

### Stranger Things
```json
"poster": "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
"banner": "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"
```

---

## 💡 Pro Tip

The image ID is the random string at the end:
- `xbzD5Dka5EcfQYaJQ3SIrgfNnKj` ← This is the image ID
- Just change the size part (`w500` or `original`)
- Keep the `.jpg` extension

---

**Now you know how to get the correct image URLs! 🎉**
