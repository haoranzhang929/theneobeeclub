# Adding New Artists Guide

With the new configurable artists system, adding new artists to The NeoBee Club is now super simple!

## 🎯 How to Add a New Artist

### 1. Add to artists data file (`src/data/artists.ts`)

```typescript
export const artists: Artist[] = [
  // ... existing artists ...
  {
    id: "new_artist_id", // Unique identifier
    name: "New Artist Name",
    roleKey: "artists.new_artist_role", // Translation key
    imageUrl: "/new-artist.jpg", // Image in public folder
    social: {
      spotify: "https://open.spotify.com/artist/...", // Optional
      youtube: "https://www.youtube.com/@...", // Optional
      bilibili: "https://space.bilibili.com/...", // Optional
      instagram: "https://instagram.com/...", // Optional
      soundcloud: "https://soundcloud.com/...", // Optional
      twitter: "https://twitter.com/..." // Optional
    }
  }
];
```

### 2. Add translations (`src/messages/en.json` & `src/messages/zh.json`)

**English (`en.json`):**

```json
{
  "artists": {
    "new_artist_role": "DJ & Producer | Genre Specialist"
  }
}
```

**Chinese (`zh.json`):**

```json
{
  "artists": {
    "new_artist_role": "DJ & 制作人 | 音乐风格专家"
  }
}
```

### 3. Add artist image

Place the artist image in the `public/` folder (e.g., `public/new-artist.jpg`)

## ✅ That's it!

The artist will automatically:

- ✅ Appear on the artists section
- ✅ Have responsive grid layout (1, 2, or 3+ columns)
- ✅ Include all social media links in structured data for SEO
- ✅ Support both English and Chinese
- ✅ Have proper accessibility labels

## 🎨 Supported Social Platforms

- **Spotify** - Green theme
- **YouTube** - Red theme
- **Bilibili** - Blue theme
- **Instagram** - Pink theme
- **SoundCloud** - Orange theme
- **Twitter** - Blue theme

## 🌟 Benefits

- **SEO Optimized**: Social links automatically added to structured data
- **Responsive**: Grid adapts to number of artists
- **Scalable**: Add unlimited artists easily
- **Maintainable**: All data in one place
- **Type-safe**: TypeScript interfaces prevent errors
- **Accessible**: Proper ARIA labels and alt text

## 🔮 Easy to Extend

Want to add TikTok or other platforms? Just:

1. Add the field to the `Artist` interface
2. Add the icon/styling to `ArtistCard.tsx`
3. The rest works automatically!
