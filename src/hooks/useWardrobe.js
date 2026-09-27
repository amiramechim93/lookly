import { useCallback, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../data/constants'
import { hydrateOutfit, outfitSignature } from '../utils/outfits'

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn('Lookly: stockage local saturé. Compressez ou retirez quelques photos.')
  }
}

export function useWardrobe() {
  const [items, setItems] = useState(() => readStorage(STORAGE_KEYS.items, []))
  const [favorites, setFavorites] = useState(() =>
    readStorage(STORAGE_KEYS.favorites, []),
  )

  useEffect(() => {
    writeStorage(STORAGE_KEYS.items, items)
  }, [items])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites)
  }, [favorites])

  const addItem = useCallback((item) => {
    setItems((current) => [
      {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...current,
    ])
  }, [])

  const loadSamples = useCallback((samples) => {
    setItems((current) => {
      if (current.length) return current
      return samples
    })
  }, [])

  const updateItem = useCallback((id, updates) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    )
  }, [])

  const deleteItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
    setFavorites((current) =>
      current
        .map((outfit) => ({
          ...outfit,
          itemIds: outfit.itemIds.filter((itemId) => itemId !== id),
        }))
        .filter((outfit) => outfit.itemIds.length >= 2),
    )
  }, [])

  const saveFavorite = useCallback((outfit, name) => {
    setFavorites((current) => {
      const signature = outfitSignature(outfit.itemIds)
      if (current.some((saved) => outfitSignature(saved.itemIds) === signature)) {
        return current
      }
      return [
        {
          id: crypto.randomUUID(),
          name: name?.trim() || `Tenue du ${new Date().toLocaleDateString('fr-FR')}`,
          itemIds: outfit.itemIds,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ]
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((current) => current.filter((outfit) => outfit.id !== id))
  }, [])

  const renameFavorite = useCallback((id, name) => {
    setFavorites((current) =>
      current.map((outfit) =>
        outfit.id === id ? { ...outfit, name: name.trim() || outfit.name } : outfit,
      ),
    )
  }, [])

  const isFavorite = useCallback(
    (itemIds) => {
      const signature = outfitSignature(itemIds)
      return favorites.some((saved) => outfitSignature(saved.itemIds) === signature)
    },
    [favorites],
  )

  const hydratedFavorites = useMemo(
    () =>
      favorites
        .map((outfit) => hydrateOutfit(outfit, items))
        .filter(Boolean),
    [favorites, items],
  )

  return {
    items,
    favorites: hydratedFavorites,
    addItem,
    loadSamples,
    updateItem,
    deleteItem,
    saveFavorite,
    removeFavorite,
    renameFavorite,
    isFavorite,
  }
}
