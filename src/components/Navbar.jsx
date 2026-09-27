import { useState } from 'react'
import { NAV_ITEMS } from '../data/constants'
import { BrandMark } from './BrandMark'

export function Navbar({ page, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="brand" onClick={() => onNavigate('home')} type="button">
          <BrandMark />
          <span className="brand-name">Lookly</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
        >
          Menu
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${page === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
