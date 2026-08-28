import PageHeader from '../components/PageHeader.jsx'
import leadership from '../data/leadership.json'

export default function Administration() {
  const institutional = leadership.filter((l) => l.category === 'Institutional')
  const other = leadership.filter((l) => l.category !== 'Institutional')

  return (
    <>
      <PageHeader
        title="Administration"
        lead="Program direction and administrative leadership across Columbia, NewYork-Presbyterian, and national scientific and guideline bodies."
      />
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {institutional.map((l, i) => (
              <div className="card" key={i}>
                <div className="eyebrow">{l.period}</div>
                <h3 style={{ marginTop: '0.4rem' }}>{l.role}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>
                  {l.org}
                  {l.location ? ` · ${l.location}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Committees, guidelines, and national service</h2>
          <div className="rows">
            {other.map((l, i) => (
              <div className="row-item" key={i}>
                <div className="r-when">{l.period}</div>
                <div>
                  <div className="r-title">{l.role}</div>
                  <div className="r-sub">
                    {l.org}
                    {l.location ? ` · ${l.location}` : ''}
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
