import { CATEGORY_MAP } from '../data/constants'

export function ClothingCard({ item, onEdit, onDelete }) {
  return (
    <article className="clothing-card">
      <img className="piece-photo" src={item.image} alt={item.name} />
      <div className="card-body">
        <h3>{item.name}</h3>
        <div className="card-meta">
          <span>{CATEGORY_MAP[item.category]}</span>
          <span className="color-row">
            <span className="color-dot" style={{ background: item.color }} />
            {item.colorName}
          </span>
        </div>
        <div className="card-actions">
          <button className="btn btn-ghost btn-small" type="button" onClick={() => onEdit(item)}>
            Modifier
          </button>
          <button className="btn btn-danger btn-small" type="button" onClick={() => onDelete(item)}>
            Supprimer
          </button>
        </div>
      </div>
    </article>
  )
}
