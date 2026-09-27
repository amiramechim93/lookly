import { useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { sampleItems } from './data/samples'
import { useWardrobe } from './hooks/useWardrobe'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { OutfitsPage } from './pages/OutfitsPage'
import { WardrobePage } from './pages/WardrobePage'

export default function App() {
  const [page, setPage] = useState('home')
  const wardrobe = useWardrobe()
  const colors = useMemo(
    () => [...new Set(wardrobe.items.map((item) => item.colorName))].sort(),
    [wardrobe.items],
  )

  return (
    <div className="app-shell">
      <Navbar page={page} onNavigate={setPage} />
      <main className="page">
        <div className="container">
          {page === 'home' ? (
            <HomePage
              items={wardrobe.items}
              favorites={wardrobe.favorites}
              onNavigate={setPage}
              onSave={wardrobe.saveFavorite}
              isFavorite={wardrobe.isFavorite}
              onLoadSamples={() => wardrobe.loadSamples(sampleItems())}
            />
          ) : null}
          {page === 'wardrobe' ? (
            <WardrobePage
              items={wardrobe.items}
              colors={colors}
              onAdd={wardrobe.addItem}
              onUpdate={wardrobe.updateItem}
              onDelete={wardrobe.deleteItem}
              onLoadSamples={() => wardrobe.loadSamples(sampleItems())}
            />
          ) : null}
          {page === 'outfits' ? (
            <OutfitsPage
              items={wardrobe.items}
              onSave={wardrobe.saveFavorite}
              isFavorite={wardrobe.isFavorite}
              onNavigate={setPage}
            />
          ) : null}
          {page === 'favorites' ? (
            <FavoritesPage
              favorites={wardrobe.favorites}
              onRemove={wardrobe.removeFavorite}
              onRename={wardrobe.renameFavorite}
              onNavigate={setPage}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}
