import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { OutfitCard } from '../components/OutfitCard'
import { dailyOutfit, randomOutfit } from '../utils/outfits'

export function OutfitsPage({ items, onSave, isFavorite, onNavigate }) {
  const daily = useMemo(() => dailyOutfit(items), [items])
  const [generated, setGenerated] = useState(null)
  const [message, setMessage] = useState('')

  function generate() {
    const outfit = randomOutfit(items)
    if (!outfit) {
      setMessage('Ajoutez des pièces dans au moins deux catégories différentes.')
      return
    }
    setMessage('')
    setGenerated(outfit)
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="kicker">Stylisme</p>
          <h2>Composer une tenue</h2>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={generate}
        >
          Générer une tenue
        </button>
      </div>

      {message ? <p className="error">{message}</p> : null}

      {generated ? (
        <OutfitCard
          outfit={generated}
          title="Combinaison aléatoire"
          favorite={isFavorite(generated.itemIds)}
          onSave={() => onSave(generated)}
        />
      ) : (
        <EmptyState
          title="Une tenue, en un clic"
          text="Lookly choisit une pièce dans chaque catégorie disponible. Ajoutez au moins deux catégories pour commencer."
          action={
            items.length < 2 ? (
              <button className="btn btn-secondary" type="button" onClick={() => onNavigate('wardrobe')}>
                Compléter le dressing
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={generate}
              >
                Essayer maintenant
              </button>
            )
          }
        />
      )}

      <div className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Rituel</p>
            <h2>Suggestion du jour</h2>
          </div>
        </div>
        {daily ? (
          <OutfitCard
            outfit={daily}
            title="Look du jour"
            favorite={isFavorite(daily.itemIds)}
            onSave={() =>
              onSave(daily, `Look du ${new Date().toLocaleDateString('fr-FR')}`)
            }
          />
        ) : (
          <EmptyState
            title="Pas encore de suggestion"
            text="Ajoutez des pièces dans au moins deux catégories pour obtenir un look quotidien stable."
          />
        )}
      </div>
    </section>
  )
}
