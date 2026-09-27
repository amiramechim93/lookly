import { COLOR_SWATCHES } from '../data/constants'

function svgPhoto(label, from, to) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#g)"/>
      <rect x="70" y="90" width="460" height="620" rx="48" fill="rgba(255,252,248,0.22)"/>
      <text x="300" y="720" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#5C4A6E">${label}</text>
    </svg>
  `
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function color(id) {
  return COLOR_SWATCHES.find((swatch) => swatch.id === id)
}

export function sampleItems() {
  const pieces = [
    ['Blouse ivoire', 'tops', 'ivory', 'cream', 'Blouse'],
    ['Cardigan lavande', 'tops', 'lavender', 'ivory', 'Cardigan'],
    ['Pantalon camel', 'bottoms', 'camel', 'cream', 'Pantalon'],
    ['Jupe noire', 'bottoms', 'black', 'plum', 'Jupe'],
    ['Ballerines crème', 'shoes', 'cream', 'ivory', 'Ballerines'],
    ['Bottines marine', 'shoes', 'navy', 'black', 'Bottines'],
    ['Foulard blush', 'accessories', 'blush', 'ivory', 'Foulard'],
    ['Ceinture dorée', 'accessories', 'gold', 'camel', 'Ceinture'],
  ]

  return pieces.map(([name, category, colorId, secondId, label], index) => {
    const primary = color(colorId)
    const secondary = color(secondId)
    return {
      id: `sample-${index}`,
      name,
      category,
      color: primary.hex,
      colorName: primary.name,
      image: svgPhoto(label, primary.hex, secondary.hex),
      createdAt: new Date().toISOString(),
    }
  })
}
