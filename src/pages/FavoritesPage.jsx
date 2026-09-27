import { EmptyState } from '../components/EmptyState'
import { OutfitCard } from '../components/OutfitCard'

export function FavoritesPage({ favorites, onRemove, onRename, onNavigate }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <p className="kicker">Archives</p>
          <h2>Tenues favorites</h2>
        </div>
      </div>

      {favorites.length ? (
        <div className="stack">
          {favorites.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onRemove={() => onRemove(outfit.id)}
              onRename={onRename}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucun favori pour le moment"
          text="Générez une tenue, puis enregistrez celles qui vous plaisent."
          action={
            <button className="btn btn-primary" type="button" onClick={() => onNavigate('outfits')}>
              Composer une tenue
            </button>
          }
        />
      )}
    </section>
  )
}
