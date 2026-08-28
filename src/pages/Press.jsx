import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import media from '../data/media.json'

export default function Press() {
  const [type, setType] = useState('All')
  const types = ['All', 'News', 'Podcast', 'Webinar']

  const filtered = useMemo(
    () => (type === 'All' ? media : media.filter((m) => m.type === type)),
    [type]
  )

  return (
    <>
      <PageHeader
        title="Press and Media"
        lead="Selected news coverage, podcast appearances, and public commentary on HIV, STIs, mpox, and emerging infections."
      />
      <section className="section">
        <div className="container">
          <div className="pub-filters" style={{ marginBottom: '1.5rem' }}>
            {types.map((t) => (
              <button
                key={t}
                className={`filter-btn ${type === t ? 'active' : ''}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="rows">
            {filtered.map((m, i) => (
              <div className="row-item" key={m.title + i}>
                <div className="r-when">{m.date}</div>
                <div>
                  <div className="r-title">
                    {m.url ? (
                      <a href={m.url} target="_blank" rel="noopener" style={{ color: 'var(--heading)' }}>
                        {m.title}
                      </a>
                    ) : (
                      m.title
                    )}
                  </div>
                  <div className="r-sub">
                    <span className="tag" style={{ marginRight: '0.5rem' }}>{m.type}</span>
                    {m.outlet}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
