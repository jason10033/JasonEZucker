import PageHeader from '../components/PageHeader.jsx'
import tools from '../data/tools.json'

export default function Informatics() {
  return (
    <>
      <PageHeader
        title="Informatics and Tools"
        lead="Digital decision aids, surveillance models, and clinical tools that turn data and evidence into usable point-of-care support."
      />
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {tools.map((t) => (
              <div className="card" key={t.name}>
                <h3>{t.name}</h3>
                {t.status && (
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.4rem' }}>
                    {t.status}
                  </div>
                )}
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{t.summary}</p>
                {t.role && <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Role: {t.role}</div>}
                <div className="card-tags">
                  {(t.tags || []).map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                {t.url && (
                  <div style={{ marginTop: '0.85rem' }}>
                    <a href={t.url} target="_blank" rel="noopener">
                      Learn more <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem' }}></i>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
