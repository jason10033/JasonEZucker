import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.4rem' }}>Page not found</h1>
      <p style={{ color: 'var(--muted)' }}>The page you are looking for does not exist.</p>
      <Link className="btn btn-primary" to="/" style={{ marginTop: '1rem' }}>
        <i className="fas fa-arrow-left"></i> Back home
      </Link>
    </div>
  )
}
