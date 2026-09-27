# Lookly

Lookly is an intelligent digital wardrobe. Photograph your clothes, browse by category or color, generate random outfits, save favorites, and receive a daily look suggestion. Everything is stored in the browser with `localStorage`.

The interface is in French.

## Features

- Fashion-inspired homepage
- Add clothing items with photo, name, category, and color
- Categories: Hauts, Bas, Chaussures, Accessoires
- Search and filter
- Edit and delete items
- Random outfit combinations
- Daily outfit suggestion
- Favorite outfits
- Persistent storage after refresh

## Requirements

- Node.js 18 or later
- npm

## Installation

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` creates a static site in the `dist` folder.

## Deployment

Lookly is a static Vite app. You can deploy `dist` to:

- [Netlify](https://www.netlify.com/) — drag and drop `dist`, or connect the Git repository
- [Vercel](https://vercel.com/) — import the project; the Vite preset is detected automatically
- [GitHub Pages](https://pages.github.com/) — build, then publish the `dist` folder

No backend is required.

## Data

Wardrobe items and favorite outfits are saved in the browser:

- `lookly-wardrobe`
- `lookly-favorites`

Clearing site data for this origin will remove them. Photos are compressed before storage to stay within typical `localStorage` limits.
