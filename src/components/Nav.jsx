import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/research', label: 'Research' },
  { to: '/education', label: 'Education' },
  { to: '/clinical', label: 'Clinical' },
  { to: '/informatics', label: 'Informatics' },
  { to: '/administration', label: 'Administration' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          Jason Zucker, MD, MS
        </Link>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
