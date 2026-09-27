import { CATEGORIES } from '../data/constants'

export function FilterBar({ query, category, color, colors, onQuery, onCategory, onColor }) {
  return (
    <div className="toolbar">
      <input
        className="search"
        type="search"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="Rechercher une pièce, une couleur…"
        aria-label="Rechercher dans le dressing"
      />
      <select
        className="select"
        value={category}
        onChange={(event) => onCategory(event.target.value)}
        aria-label="Filtrer par catégorie"
      >
        <option value="all">Toutes les catégories</option>
        {CATEGORIES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <select
        className="select"
        value={color}
        onChange={(event) => onColor(event.target.value)}
        aria-label="Filtrer par couleur"
      >
        <option value="all">Toutes les couleurs</option>
        {colors.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
