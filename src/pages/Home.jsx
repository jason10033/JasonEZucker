import { Link } from 'react-router-dom'
import profile from '../data/profile.json'
import research from '../data/research.json'
import pillars from '../data/pillars.json'
import selectedPubs from '../data/selectedPublications.json'
import publications from '../data/publications.json'
import media from '../data/media.json'
import grants from '../data/grants.json'

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function prettyDate(d) {
  const m = /^(\d{1,2})\/(\d{4})$/.exec(d || '')
  return m ? `${MONTHS[+m[1]] || ''} ${m[2]}` : d
}
const shortId = (id) => (id || '').replace(/^(NIH\/NIAID|NIH\/NIMH|NIAID|NIMH|NIH|CDC|HRSA)\s+/, '').trim()
const shortRole = (r) => (r || '').split(/[,(;]/)[0].trim()
const clip = (s, n) => (s && s.length > n ? s.slice(0, n).trim() + '…' : s)

function Social() {
  const l = profile.links || {}
  const items = [
    l.email && { href: l.email, label: 'Email' },
    l.columbia && { href: l.columbia, label: 'Columbia', ext: true },
    l.pubmed && { href: l.pubmed, label: 'PubMed', ext: true },
    l.googleScholar && { href: l.googleScholar, label: 'Scholar', ext: true },
  ].filter(Boolean)
  return (
    <div className="social">
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && ' · '}
          <a href={it.href} {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})}>{it.label}</a>
        </span>
      ))}
    </div>
  )
}

const FOCUS = [
  { key: 'research', title: 'Research', icon: 'fa-flask', to: '/research', blurb: 'Prevention, treatment, emerging infections, and the informatics that connects them.', items: research.map((r) => r.title) },
  { key: 'education', title: 'Education', icon: 'fa-graduation-cap', to: '/education', blurb: 'Teaching and mentoring across every level of medical training.', items: pillars.education.map((e) => e.title) },
  { key: 'clinical', title: 'Clinical', icon: 'fa-stethoscope', to: '/clinical', blurb: 'Sexual health and infectious disease care and the programs behind it.', items: pillars.clinical.map((c) => c.title) },
]

export default function Home() {
  const featured = selectedPubs.find((p) => /N Engl|NEJM/i.test(p.journal)) || selectedPubs[0]
  const mostRecent = publications[0]
  const latest = media[0]
  const mediaVerb = latest.type === 'Podcast' ? 'Listen' : latest.type === 'Webinar' ? 'Watch' : 'View'
  const activeGrants = grants.active

  return (
    <>
      {/* Hero */}
      <section className="hero reveal">
        <div className="container hero-grid">
          <aside className="hero-aside">
            <div className="portrait">
              <img className="hero-photo" src="/images/profile.jpg" alt={profile.name} />
            </div>
            <h1 className="hero-name">{profile.name}, MD</h1>
            <div className="hero-cred">Med-Peds Infectious Diseases</div>
            <div className="hero-rule"></div>
            <div className="hero-titles">
              <div className="t1">{profile.titles[0].split('(')[0].trim()}</div>
              <div>{profile.affiliations[0]}</div>
            </div>
            <Social />
          </aside>

          <div className="hero-main">
            <div className="eyebrow">Physician-Scientist</div>
            <h2 className="hero-h2">
              Optimizing the sexual health <span className="em">cascade of care</span>
            </h2>
            <p className="hero-lead">{profile.heroLead}</p>
            <div className="btn-row">
              <a className="btn btn-primary" href="/files/cv.pdf" target="_blank" rel="noopener">
                <i className="fas fa-file-arrow-down"></i> Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Focus areas (flip cards) */}
      <section className="section focus-section">
        <div className="container reveal">
          <div className="eyebrow">Explore</div>
          <h2 className="section-title">Focus areas</h2>
          <div className="focus-grid">
            {FOCUS.map((f) => (
              <Link key={f.key} to={f.to} className="flip">
                <div className="flip-inner">
                  <div className="flip-face flip-front">
                    <div className="ibox"><i className={`fas ${f.icon}`}></i></div>
                    <h3>{f.title}</h3>
                    <p>{f.blurb}</p>
                    <span className="hint">Hover to preview</span>
                  </div>
                  <div className="flip-face flip-back">
                    <h3>{f.title}</h3>
                    <ul>
                      {f.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                    <span className="go">View {f.title.toLowerCase()} &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights bento */}
      <section className="section highlights-section">
        <div className="container reveal">
          <div className="eyebrow">Recent</div>
          <h2 className="section-title">Research highlights</h2>
          <div className="bento">
            <div className="box">
              <div className="box-lbl">Featured publication</div>
              <h4>{featured.title.replace(/\.$/, '')}</h4>
              <div className="box-meta"><em>{featured.journal}</em> &middot; <span className="mono">{featured.year}</span></div>
              <a className="box-link" href={featured.url} target="_blank" rel="noopener">Read &rarr;</a>
            </div>

            <div className="box">
              <div className="box-lbl">Most recent publication</div>
              <h4>{mostRecent.title.replace(/\.$/, '')}</h4>
              <div className="box-meta"><em>{mostRecent.journal}</em> &middot; <span className="mono">{mostRecent.year}</span></div>
              <a className="box-link" href={mostRecent.url} target="_blank" rel="noopener">Read &rarr;</a>
            </div>

            <div className="box">
              <div className="box-lbl">Latest media</div>
              <div className="press-when">{prettyDate(latest.date)} &middot; {latest.type}</div>
              <div className="press-title">{latest.title}</div>
              <div className="press-out">{latest.outlet}</div>
              {latest.url
                ? <a className="box-link" href={latest.url} target="_blank" rel="noopener">{mediaVerb} &rarr;</a>
                : <Link className="box-link" to="/press">All media &rarr;</Link>}
            </div>

          </div>
        </div>
      </section>

      {/* Active grant support */}
      <section className="section grants-section">
        <div className="container reveal">
          <div className="eyebrow">Active</div>
          <h2 className="section-title">Grant support</h2>
          <div className="box">
            <div className="grants">
              {activeGrants.map((g) => (
                <div className="g" key={g.id}>
                  <div className="g-id">
                    <span className="gid">
                      {g.reporterUrl
                        ? <a href={g.reporterUrl} target="_blank" rel="noopener">{shortId(g.id)}</a>
                        : shortId(g.id)}
                    </span>
                    <span className="gr">{shortRole(g.role)}</span>
                  </div>
                  <span className="gt">{clip(g.title, 80)}</span>
                </div>
              ))}
            </div>
            <div className="grant-note">
              {grants.active.length} active awards &middot; NIH links via RePORTER
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
