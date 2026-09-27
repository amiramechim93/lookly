import { OutfitCard } from '../components/OutfitCard'
import { EmptyState } from '../components/EmptyState'
import { dailyOutfit } from '../utils/outfits'
import { CATEGORIES } from '../data/constants'

export function HomePage({ items, favorites, onNavigate, onSave, isFavorite, onLoadSamples }) {
  const suggestion = dailyOutfit(items)
  const counts = CATEGORIES.map((category) => ({
    ...category,
    count: items.filter((item) => item.category === category.id).length,
  }))

  return (
    <section>
      <div className="hero">
        <div>
          <p className="kicker">Dressing digital</p>
          <h1>Lookly, l’élégance au quotidien.</h1>
          <p className="lead">
            Photographiez vos pièces, composez des tenues en un geste et laissez
            Lookly vous souffler une suggestion chaque matin.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={() => onNavigate('wardrobe')}>
              Ouvrir mon dressing
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => onNavigate('outfits')}>
              Créer une tenue
            </button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-grid">
            <div className="hero-photo" />
            <div className="stack">
              <div className="mini-photo" />
              <div className="mini-photo" style={{ background: '#f3e7d6' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <strong>{items.length}</strong>
          <p>pièces dans le dressing</p>
        </article>
        {counts.map((category) => (
          <article className="stat-card" key={category.id}>
            <strong>{category.count}</strong>
            <p>{category.label}</p>
          </article>
        ))}
      </div>

      <div className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Aujourd’hui</p>
            <h2>Suggestion du jour</h2>
          </div>
        </div>
        {suggestion ? (
          <OutfitCard
            outfit={suggestion}
            title="Votre look du jour"
            favorite={isFavorite(suggestion.itemIds)}
            onSave={() => onSave(suggestion, `Look du ${new Date().toLocaleDateString('fr-FR')}`)}
          />
        ) : (
          <EmptyState
            title="Encore un peu trop vide"
            text="Ajoutez au moins deux catégories de vêtements pour recevoir une suggestion quotidienne."
            action={
              <div className="hero-actions">
                <button className="btn btn-primary" type="button" onClick={() => onNavigate('wardrobe')}>
                  Ajouter une pièce
                </button>
                <button className="btn btn-secondary" type="button" onClick={onLoadSamples}>
                  Charger une collection d’exemple
                </button>
              </div>
            }
          />
        )}
      </div>

      <div className="section">
        <div className="section-head">
          <div>
            <p className="kicker">L’expérience</p>
            <h2>Un dressing pensé comme une maison de mode.</h2>
          </div>
        </div>
        <div className="grid-3">
          <article className="feature-card">
            <h3>Archiver</h3>
            <p>Chaque pièce a sa photo, sa couleur et sa catégorie. Tout reste sur votre appareil.</p>
          </article>
          <article className="feature-card">
            <h3>Composer</h3>
            <p>Lookly assemble des combinaisons à partir de vos Hauts, Bas, Chaussures et Accessoires.</p>
          </article>
          <article className="feature-card">
            <h3>Garder</h3>
            <p>
              Enregistrez vos favoris. Vous en avez déjà {favorites.length}.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
