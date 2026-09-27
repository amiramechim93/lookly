import { CATEGORY_MAP } from '../data/constants'

export function OutfitCard({
  outfit,
  title,
  favorite,
  onSave,
  onRemove,
  onRename,
}) {
  return (
    <article className="outfit-card">
      <div className="outfit-row">
        {outfit.items.map((item) => (
          <div className="outfit-piece" key={item.id}>
            <img src={item.image} alt={item.name} />
            <span>{CATEGORY_MAP[item.category]}</span>
          </div>
        ))}
      </div>
      <h3>{title || outfit.name}</h3>
      <p>
        {outfit.items.map((item) => item.name).join(' · ')}
      </p>
      {onRename ? (
        <form
          className="rename-row"
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            onRename(outfit.id, form.get('name'))
          }}
        >
          <input name="name" defaultValue={outfit.name} aria-label="Nom de la tenue" />
          <button className="btn btn-ghost btn-small" type="submit">
            Renommer
          </button>
        </form>
      ) : null}
      <div className="card-actions">
        {onSave ? (
          <button
            className="btn btn-primary btn-small"
            type="button"
            onClick={onSave}
            disabled={favorite}
          >
            {favorite ? 'Déjà dans les favoris' : 'Enregistrer la tenue'}
          </button>
        ) : null}
        {onRemove ? (
          <button className="btn btn-danger btn-small" type="button" onClick={onRemove}>
            Retirer des favoris
          </button>
        ) : null}
      </div>
    </article>
  )
}
