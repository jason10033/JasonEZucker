import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import CategoryLogo, { CATEGORIES } from '../components/CategoryLogo.jsx'
import studies from '../data/studies.json'
import publications from '../data/publications.json'
import selectedPubs from '../data/selectedPublications.json'
import profile from '../data/profile.json'
import grants from '../data/grants.json'

const shortId = (id) => (id || '').replace(/^(NIH\/NIAID|NIH\/NIMH|NIAID|NIMH|NIH|CDC|HRSA)\s+/, '').trim()
const shortRole = (r) => (r || '').split(/[,(;]/)[0].trim()
const clip = (s, n) => (s && s.length > n ? s.slice(0, n).trim() + '…' : s)

function GrantList({ items }) {
  return (
    <div className="grants">
      {items.map((g) => (
        <div className="g" key={g.id + g.title}>
          <div className="g-id">
            <span className="gid">
              {g.reporterUrl ? <a href={g.reporterUrl} target="_blank" rel="noopener">{shortId(g.id)}</a> : shortId(g.id)}
            </span>
            <span className="gr">{shortRole(g.role)}</span>
          </div>
          <span className="gt" title={g.title}>{g.short || clip(g.title, 82)}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ s, onSelect }) {
  return (
    <button className="proj-card" onClick={() => onSelect(s)}>
      <div className="study-cats">
        {s.categories.map((c) => <CategoryLogo id={c} key={c} />)}
      </div>
      <h3>{s.name}</h3>
      {s.role && <div className="p-role">{s.role}</div>}
      <div className="proj-hover">
        <p>{s.desc}</p>
        <span className="ph-cta">Filter publications &darr;</span>
      </div>
    </button>
  )
}

export default function Research() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('recent') // 'recent' | 'selected'
  const [project, setProject] = useState(null)

  const activeProjects = studies.filter((s) => s.status === 'active')
  const completedProjects = studies.filter((s) => s.status === 'completed')

  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase()
    const match = (p) => `${p.title}${p.authors}${p.journal}`.toLowerCase().includes(q)
    if (project) {
      const re = new RegExp(project.match, 'i')
      let base = publications.filter((p) => re.test(`${p.title} ${p.journal}`))
      return q ? base.filter(match) : base
    }
    if (q) return publications.filter(match)
    if (mode === 'recent') return publications.slice(0, 10)
    return selectedPubs.slice(0, 10)
  }, [project, mode, query])

  const selectProject = (s) => {
    setProject(s)
    setTimeout(() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
  }
  const setModeClear = (m) => { setMode(m); setProject(null) }

  return (
    <>
      <PageHeader
        title="Research"
        lead="Optimizing the sexual health cascade of care for adolescents and young adults, at the intersection of data science, behavioral science, and implementation science."
      />

      {/* Research projects (white) */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Projects</div>
          <h2 className="section-title">Research projects</h2>
          <p className="section-lead">Hover a project for a brief description, or click it to filter the publications below.</p>

          <div className="subhead">Active research projects</div>
          <div className="proj-grid">
            {activeProjects.map((s) => <ProjectCard key={s.name} s={s} onSelect={selectProject} />)}
          </div>

          <div className="subhead">Completed research projects</div>
          <div className="proj-grid">
            {completedProjects.map((s) => <ProjectCard key={s.name} s={s} onSelect={selectProject} />)}
          </div>

          <div className="legend">
            {Object.entries(CATEGORIES).map(([id, c]) => (
              <div className="legend-item" key={id}>
                <CategoryLogo id={id} size={20} />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications (grey 1) */}
      <section className="section focus-section" id="publications">
        <div className="container">
          <div className="eyebrow">Publications</div>
          <h2 className="section-title">Publications</h2>
          <p className="section-lead">
            {publications.length} publications, kept current from PubMed. Toggle the 10 most recent or 10 selected, search the full list, or click a project above to filter.
          </p>

          <div className="pub-controls">
            <button className={`filter-btn ${!project && mode === 'recent' ? 'active' : ''}`} onClick={() => setModeClear('recent')}>10 most recent</button>
            <button className={`filter-btn ${!project && mode === 'selected' ? 'active' : ''}`} onClick={() => setModeClear('selected')}>10 selected</button>
            <input className="pub-search" type="search" placeholder="Search title, author, or journal" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          {project && (
            <div style={{ marginBottom: '1rem' }}>
              <span className="pub-filter-chip">
                Publications for {project.name}
                <button onClick={() => setProject(null)} aria-label="Clear project filter">×</button>
              </span>
            </div>
          )}

          <div className="pub-count">
            {project
              ? `Showing ${displayed.length} publication${displayed.length === 1 ? '' : 's'} for ${project.name}`
              : query.trim()
                ? `Showing ${displayed.length} of ${publications.length} matching "${query.trim()}"`
                : `Showing ${displayed.length} ${mode === 'recent' ? 'most recent' : 'selected'} publications`}
          </div>

          <div className="pub-list">
            {displayed.map((p) => (
              <div className="pub" key={p.doi || p.title}>
                <a className="pub-title" href={p.url} target="_blank" rel="noopener" style={{ display: 'block', color: 'var(--heading)', textDecoration: 'none' }}>
                  {p.title}
                </a>
                <div className="pub-authors">{p.authors}</div>
                <div className="pub-meta">
                  <span className="j">{p.journal}</span> · <span className="y">{p.year}</span>
                  {p.pmid && (
                    <>
                      {' · '}
                      <a href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`} target="_blank" rel="noopener">PMID {p.pmid}</a>
                    </>
                  )}
                </div>
              </div>
            ))}
            {displayed.length === 0 && <div style={{ color: 'var(--muted)' }}>No matching publications in the current selection.</div>}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {profile.links?.googleScholar && (
              <a className="btn btn-primary" href={profile.links.googleScholar} target="_blank" rel="noopener">
                <i className="fas fa-graduation-cap"></i> Google Scholar
              </a>
            )}
            {profile.links?.pubmed && (
              <a className="btn btn-ghost" href={profile.links.pubmed} target="_blank" rel="noopener">
                <i className="fas fa-book-medical"></i> PubMed
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Current funding (grey 2) */}
      <section className="section highlights-section">
        <div className="container">
          <div className="eyebrow">Active</div>
          <h2 className="section-title">Current funding</h2>
          <div className="box">
            <GrantList items={grants.active} />
            <div className="grant-note">{grants.active.length} active awards &middot; NIH links via RePORTER</div>
          </div>
        </div>
      </section>

      {/* Past funding (grey 3) */}
      <section className="section grants-section">
        <div className="container">
          <div className="eyebrow">Completed</div>
          <h2 className="section-title">Past funding</h2>
          <div className="box">
            <GrantList items={grants.past} />
            <div className="grant-note">{grants.past.length} completed awards</div>
          </div>
        </div>
      </section>
    </>
  )
}
