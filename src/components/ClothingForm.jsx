import { useMemo, useState } from 'react'
import { CATEGORIES, COLOR_SWATCHES } from '../data/constants'
import { readAndCompressImage } from '../utils/image'

const emptyForm = {
  name: '',
  category: 'tops',
  color: COLOR_SWATCHES[8].hex,
  colorName: COLOR_SWATCHES[8].name,
  image: '',
}

export function ClothingForm({ initialItem, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialItem || emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const selectedSwatch = useMemo(
    () => COLOR_SWATCHES.find((swatch) => swatch.hex.toLowerCase() === form.color.toLowerCase()),
    [form.color],
  )

  async function handleFile(file) {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const image = await readAndCompressImage(file)
      setForm((current) => ({ ...current, image }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim()) {
      setError('Ajoutez un nom à cette pièce.')
      return
    }
    if (!form.image) {
      setError('Ajoutez une photo de la pièce.')
      return
    }
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      color: form.color,
      colorName: form.colorName.trim() || selectedSwatch?.name || 'Couleur',
      image: form.image,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="upload">
        {form.image ? (
          <div className="upload-preview">
            <img src={form.image} alt="Aperçu" />
          </div>
        ) : null}
        <strong>{loading ? 'Préparation de la photo…' : 'Ajouter une photo'}</strong>
        <p>JPG, PNG ou WEBP. L’image est compressée automatiquement.</p>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>

      <div className="field">
        <label htmlFor="item-name">Nom</label>
        <input
          id="item-name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          placeholder="Blouse ivoire, trench camel…"
        />
      </div>

      <div className="field">
        <label htmlFor="item-category">Catégorie</label>
        <select
          id="item-category"
          className="select"
          value={form.category}
          onChange={(event) =>
            setForm((current) => ({ ...current, category: event.target.value }))
          }
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Couleur</label>
        <div className="swatches">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              className={`swatch-btn ${form.color === swatch.hex ? 'selected' : ''}`}
              style={{ background: swatch.hex }}
              title={swatch.name}
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  color: swatch.hex,
                  colorName: swatch.name,
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="item-color-name">Nom de la couleur</label>
        <input
          id="item-color-name"
          value={form.colorName}
          onChange={(event) =>
            setForm((current) => ({ ...current, colorName: event.target.value }))
          }
        />
      </div>

      {error ? <p className="error">{error}</p> : null}

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {initialItem ? 'Enregistrer les modifications' : 'Ajouter au dressing'}
        </button>
        <button className="btn btn-ghost" type="button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  )
}
