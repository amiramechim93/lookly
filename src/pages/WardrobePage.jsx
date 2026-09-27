import { useMemo, useState } from 'react'
import { ClothingCard } from '../components/ClothingCard'
import { ClothingForm } from '../components/ClothingForm'
import { EmptyState } from '../components/EmptyState'
import { FilterBar } from '../components/FilterBar'
import { Modal } from '../components/Modal'

export function WardrobePage({ items, colors, onAdd, onUpdate, onDelete, onLoadSamples }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [color, setColor] = useState('all')
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesQuery =
        !needle ||
        item.name.toLowerCase().includes(needle) ||
        item.colorName.toLowerCase().includes(needle)
      const matchesCategory = category === 'all' || item.category === category
      const matchesColor = color === 'all' || item.colorName === color
      return matchesQuery && matchesCategory && matchesColor
    })
  }, [items, query, category, color])

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="kicker">Collection</p>
          <h2>Votre dressing</h2>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setEditing(null)
            setModal('form')
          }}
        >
          Ajouter une pièce
        </button>
      </div>

      <FilterBar
        query={query}
        category={category}
        color={color}
        colors={colors}
        onQuery={setQuery}
        onCategory={setCategory}
        onColor={setColor}
      />

      {filtered.length ? (
        <div className="wardrobe-grid">
          {filtered.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              onEdit={(piece) => {
                setEditing(piece)
                setModal('form')
              }}
              onDelete={(piece) => {
                setEditing(piece)
                setModal('delete')
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={items.length ? 'Aucun résultat' : 'Votre dressing est encore vide'}
          text={
            items.length
              ? 'Essayez une autre recherche ou un autre filtre.'
              : 'Ajoutez votre première pièce avec une photo, un nom, une catégorie et une couleur.'
          }
          action={
            !items.length ? (
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setEditing(null)
                    setModal('form')
                  }}
                >
                  Commencer
                </button>
                <button className="btn btn-secondary" type="button" onClick={onLoadSamples}>
                  Charger une collection d’exemple
                </button>
              </div>
            ) : null
          }
        />
      )}

      {modal === 'form' ? (
        <Modal
          title={editing ? 'Modifier la pièce' : 'Nouvelle pièce'}
          onClose={() => setModal(null)}
        >
          <ClothingForm
            initialItem={editing}
            onCancel={() => setModal(null)}
            onSubmit={(payload) => {
              if (editing) onUpdate(editing.id, payload)
              else onAdd(payload)
              setModal(null)
            }}
          />
        </Modal>
      ) : null}

      {modal === 'delete' && editing ? (
        <Modal title="Supprimer cette pièce ?" onClose={() => setModal(null)}>
          <p>
            {editing.name} sera retirée du dressing et des tenues favorites qui
            l’utilisent.
          </p>
          <div className="form-actions">
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                onDelete(editing.id)
                setModal(null)
              }}
            >
              Confirmer la suppression
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => setModal(null)}>
              Annuler
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}
