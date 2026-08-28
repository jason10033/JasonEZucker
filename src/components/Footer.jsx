import { Link } from 'react-router-dom'
import profile from '../data/profile.json'

export default function Footer() {
  const year = 2026
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', color: '#eaf4f7' }}>
            {profile.name}, {profile.credentials}
          </div>
          <small>{profile.affiliations?.[0]}</small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '0.4rem' }}>
            {profile.links?.email && <a href={profile.links.email}>Email</a>}
            {profile.links?.googleScholar && <> · <a href={profile.links.googleScholar} target="_blank" rel="noopener">Google Scholar</a></>}
            {profile.links?.columbia && <> · <a href={profile.links.columbia} target="_blank" rel="noopener">Columbia</a></>}
            {' · '}
            <Link to="/private">Private</Link>
          </div>
          <small>© {year} {profile.name}. Built with React and Vite.</small>
        </div>
      </div>
    </footer>
  )
}
