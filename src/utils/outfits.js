function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pickFrom(list, seed) {
  if (!list.length) return null
  return list[seed % list.length]
}

export function groupByCategory(items) {
  return {
    tops: items.filter((item) => item.category === 'tops'),
    bottoms: items.filter((item) => item.category === 'bottoms'),
    shoes: items.filter((item) => item.category === 'shoes'),
    accessories: items.filter((item) => item.category === 'accessories'),
  }
}

export function buildOutfit(items, seed = Date.now()) {
  const groups = groupByCategory(items)
  const filled = Object.values(groups).filter((group) => group.length > 0)

  if (filled.length < 2) {
    return null
  }

  const outfitItems = [
    pickFrom(groups.tops, seed),
    pickFrom(groups.bottoms, seed * 3 + 11),
    pickFrom(groups.shoes, seed * 7 + 23),
    pickFrom(groups.accessories, seed * 13 + 41),
  ].filter(Boolean)

  return {
    id: `outfit-${seed}-${outfitItems.map((item) => item.id).join('-')}`,
    itemIds: outfitItems.map((item) => item.id),
    items: outfitItems,
    createdAt: new Date().toISOString(),
  }
}

export function randomOutfit(items) {
  return buildOutfit(items, Date.now() + Math.floor(Math.random() * 10000))
}

export function dailyOutfit(items) {
  const today = new Date()
  const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  return buildOutfit(items, hashString(`lookly-daily-${key}`))
}

export function hydrateOutfit(outfit, items) {
  if (!outfit) return null
  const map = Object.fromEntries(items.map((item) => [item.id, item]))
  const resolved = (outfit.itemIds || []).map((id) => map[id]).filter(Boolean)
  if (!resolved.length) return null
  return { ...outfit, items: resolved }
}

export function outfitSignature(itemIds) {
  return [...itemIds].sort().join('|')
}
