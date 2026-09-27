export const STORAGE_KEYS = {
  items: 'lookly-wardrobe',
  favorites: 'lookly-favorites',
}

export const CATEGORIES = [
  { id: 'tops', label: 'Hauts', icon: 'blouse' },
  { id: 'bottoms', label: 'Bas', icon: 'pants' },
  { id: 'shoes', label: 'Chaussures', icon: 'shoes' },
  { id: 'accessories', label: 'Accessoires', icon: 'accessory' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category.label]),
)

export const COLOR_SWATCHES = [
  { id: 'ivory', name: 'Ivoire', hex: '#F6F1E8' },
  { id: 'cream', name: 'Crème', hex: '#E8DCC8' },
  { id: 'beige', name: 'Beige', hex: '#D4B896' },
  { id: 'camel', name: 'Camel', hex: '#C4A484' },
  { id: 'brown', name: 'Marron', hex: '#6B4F3A' },
  { id: 'black', name: 'Noir', hex: '#1A1A1A' },
  { id: 'charcoal', name: 'Anthracite', hex: '#4A4A4A' },
  { id: 'white', name: 'Blanc', hex: '#FFFFFF' },
  { id: 'lavender', name: 'Lavande', hex: '#C9B8DC' },
  { id: 'lilac', name: 'Lilas', hex: '#A78BBE' },
  { id: 'plum', name: 'Prune', hex: '#6B4C7A' },
  { id: 'blush', name: 'Rose poudré', hex: '#E8C4C4' },
  { id: 'burgundy', name: 'Bordeaux', hex: '#7A2E3A' },
  { id: 'navy', name: 'Marine', hex: '#2C3E5A' },
  { id: 'sky', name: 'Ciel', hex: '#A8C4D8' },
  { id: 'sage', name: 'Sauge', hex: '#A8B89A' },
  { id: 'olive', name: 'Olive', hex: '#6B7A4A' },
  { id: 'gold', name: 'Doré', hex: '#C9A96E' },
]

export const NAV_ITEMS = [
  { id: 'home', label: 'Accueil' },
  { id: 'wardrobe', label: 'Dressing' },
  { id: 'outfits', label: 'Tenues' },
  { id: 'favorites', label: 'Favoris' },
]
