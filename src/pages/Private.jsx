import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth.js'

// Simple localStorage-backed store. Content is gated behind Netlify Identity
// (real server-side auth) and kept private to this browser.
function useLocal(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {
      /* ignore quota errors */
    }
  }, [key, val])
  return [val, setVal]
}

function TodoList() {
  const [items, setItems] = useLocal('jz_todos', [])
  const [text, setText] = useState('')

  const add = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setItems([...items, { id: Date.now(), text: t, done: false }])
    setText('')
  }
  const toggle = (id) => setItems(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)))
  const remove = (id) => setItems(items.filter((i) => i.id !== id))

  return (
    <div className="card">
      <h3>To-do</h3>
      <form onSubmit={add} style={{ display: 'flex', gap: '0.5rem', margin: '0.75rem 0' }}>
        <input
          className="pub-search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task and press Enter"
        />
        <button className="btn btn-primary" type="submit"><i className="fas fa-plus"></i></button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.length === 0 && <li style={{ color: 'var(--muted)' }}>No tasks yet.</li>}
        {items.map((i) => (
          <li key={i.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
            <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
            <span style={{ flex: 1, textDecoration: i.done ? 'line-through' : 'none', color: i.done ? 'var(--muted)' : 'var(--text)' }}>
              {i.text}
            </span>
            <button onClick={() => remove(i.id)} title="Delete" style={{ background: 'none', border: 0, color: 'var(--muted)', cursor: 'pointer' }}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Notes() {
  const [notes, setNotes] = useLocal('jz_notes', '')
  return (
    <div className="card">
      <h3>Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Private scratchpad. Saved automatically in this browser."
        style={{ width: '100%', minHeight: '220px', marginTop: '0.75rem', padding: '0.75rem', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical' }}
      />
    </div>
  )
}

export default function Private() {
  const { user, ready, login, logout } = useAuth()

  // Keep this page out of search engines even if a header is missed.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow, noarchive'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  if (!ready) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center', color: 'var(--muted)' }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container">
        <div className="gate">
          <i className="fas fa-lock"></i>
          <h1 style={{ fontSize: '1.6rem' }}>Private area</h1>
          <p style={{ color: 'var(--muted)' }}>
            This section is restricted. Sign in to access your private notes and lists.
          </p>
          <button className="btn btn-primary" onClick={login}>
            <i className="fas fa-right-to-bracket"></i> Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="page-head">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="private-badge"><i className="fas fa-lock"></i> Private</span>
            <h1 style={{ margin: 0 }}>Your workspace</h1>
            <p style={{ margin: 0 }}>Signed in as {user.email}</p>
          </div>
          <button className="btn btn-ghost" onClick={logout}>
            <i className="fas fa-right-from-bracket"></i> Sign out
          </button>
        </div>
      </header>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <TodoList />
          <Notes />
        </div>
      </section>
    </>
  )
}
