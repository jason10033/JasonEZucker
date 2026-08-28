import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import selectedPubs from '../data/selectedPublications.json'
import stats from '../data/stats.json'
import profile from '../data/profile.json'

export default function Publications() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('All')

  const years = useMemo(() => {
    const s = Array.from(new Set(selectedPubs.map((p) => p.year))).sort((a, b) => b.localeCompare(a))
    return ['All', ...s]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return selectedPubs.filter((p) => {
      if (year !== 'All' && p.year !== year) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q)
      )
    })
  }, [query, year])

  return (
    <>
      <PageHeader
        title="Publications"
        lead={`Selected peer-reviewed work. Full record of ${stats.peerReviewedPublications}+ publications on Google Scholar and PubMed.`}
      />
      <section className="section">
        <div className="container">
          <div className="pub-controls">
            <input
              className="pub-search"
              type="search"
              placeholder="Search title, author, or journal"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="pub-filters">
              {years.map((y) => (
                <button
                  key={y}
                  className={`filter-btn ${year === y ? 'active' : ''}`}
                  onClick={() => setYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="pub-count">
            Showing {filtered.length} of {selectedPubs.length} selected publications
          </div>

          <div className="pub-list">
            {filtered.map((p) => (
              <div className="pub" key={p.doi || p.title}>
                <a
                  className="pub-title"
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  style={{ display: 'block', color: 'var(--heading)', textDecoration: 'none' }}
                >
                  {p.title}
                </a>
                <div className="pub-authors">{p.authors}</div>
                <div className="pub-meta">
                  <span className="j">{p.journal}</span> · <span className="y">{p.year}</span>
                  {p.pmid && (
                    <>
                      {' · '}
                      <a href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`} target="_blank" rel="noopener">
                        PMID {p.pmid}
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
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
    </>
  )
}
