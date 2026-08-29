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

const TOPICS = [
  { key: 'syphilis', label: 'Syphilis', match: 'syphilis|treponema' },
  { key: 'mpox', label: 'Mpox', match: 'mpox|monkeypox|tecovirimat|orthopox|mpxv' },
  { key: 'doxypep', label: 'Doxy-PEP', match: 'doxy-?pep|doxycycline|doxy-?care' },
  { key: 'prep', label: 'HIV PrEP', match: '\\bprep\\b|pre-?exposure|preexposure' },
  { key: 'testing', label: 'HIV Testing', match: 'hiv test|hiv screen|self-?test|hiv self|opt-out|point-of-care test' },
]

function GrantList({ items, full }) {
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
          <span className="gt" title={g.title}>{full ? g.title : (g.short || clip(g.title, 82))}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ s, onSelect }) {
  const inner = (
    <>
      <div className="study-cats">
        {s.categories.map((c) => <CategoryLogo id={c} key={c} />)}
      </div>
      <h3>{s.name}</h3>
      {s.role && <div className="p-role">{s.role}</div>}
      <div className="proj-hover">
        <p>{s.desc}</p>
        {s.items && (
          <ul className="proj-items">
            {s.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        )}
        {s.link
          ? <span className="ph-cta">Visit site &rarr;</span>
          : s.match ? <span className="ph-cta">Filter publications &darr;</span> : null}
      </div>
    </>
  )
  if (s.link) {
    return <a className="proj-card" href={s.link} target="_blank" rel="noopener">{inner}</a>
  }
  const clickable = !!s.match
  return (
    <button
      className="proj-card"
      onClick={() => clickable && onSelect(s)}
      style={clickable ? undefined : { cursor: 'default' }}
    >
      {inner}
    </button>
  )
}

export default function Research() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('selected') // 'recent' | 'selected'
  const [project, setProject] = useState(null)
  const [topic, setTopic] = useState(null)

  const activeProjects = studies.filter((s) => s.status === 'active')
  const completedProjects = studies.filter((s) => s.status === 'completed')

  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase()
    const match = (p) => `${p.title}${p.authors}${p.journal}`.toLowerCase().includes(q)
    const filterBy = (m) => {
      const re = new RegExp(m, 'i')
      const base = publications.filter((p) => re.test(`${p.title} ${p.journal}`))
      return q ? base.filter(match) : base
    }
    if (project) return filterBy(project.match)
    if (topic) return filterBy(topic.match)
    if (q) return publications.filter(match)
    if (mode === 'recent') return publications.slice(0, 5)
    return selectedPubs.slice(0, 5)
  }, [project, topic, mode, query])

  const selectProject = (s) => {
    setProject(s)
    setTopic(null)
    setTimeout(() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
  }
  const setModeClear = (m) => { setMode(m); setProject(null); setTopic(null) }
  const selectTopic = (t) => { setTopic(t); setProject(null); setQuery('') }

  return (
    <>
      <PageHeader title="Research" />

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
            {publications.length} publications, kept current from PubMed. Show the 5 most recent or 5 selected, browse everything on a topic, search the full list, or click a project above to filter.
          </p>

          <div className="pub-controls">
            <button className={`filter-btn ${!project && !topic && mode === 'recent' ? 'active' : ''}`} onClick={() => setModeClear('recent')}>5 most recent</button>
            <button className={`filter-btn ${!project && !topic && mode === 'selected' ? 'active' : ''}`} onClick={() => setModeClear('selected')}>5 selected</button>
            <input className="pub-search" type="search" placeholder="Search title, author, or journal" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="pub-topics">
            <span className="pub-topics-label">By topic</span>
            {TOPICS.map((t) => (
              <button key={t.key} className={`filter-btn ${topic?.key === t.key ? 'active' : ''}`} onClick={() => selectTopic(t)}>{t.label}</button>
            ))}
          </div>

          {project && (
            <div style={{ marginBottom: '1rem' }}>
              <span className="pub-filter-chip">
                Publications for {project.name}
                <button onClick={() => setProject(null)} aria-label="Clear project filter">×</button>
              </span>
            </div>
          )}
          {topic && (
            <div style={{ marginBottom: '1rem' }}>
              <span className="pub-filter-chip">
                Publications on {topic.label}
                <button onClick={() => setTopic(null)} aria-label="Clear topic filter">×</button>
              </span>
            </div>
          )}

          <div className="pub-count">
            {project
              ? `Showing ${displayed.length} publication${displayed.length === 1 ? '' : 's'} for ${project.name}`
              : topic
                ? `Showing ${displayed.length} publication${displayed.length === 1 ? '' : 's'} on ${topic.label}`
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
            <GrantList items={grants.past} full />
            <div className="grant-note">{grants.past.length} completed awards</div>
          </div>
        </div>
      </section>
    </>
  )
}
