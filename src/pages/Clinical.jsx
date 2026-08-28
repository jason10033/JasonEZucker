import PageHeader from '../components/PageHeader.jsx'
import pillars from '../data/pillars.json'

export default function Clinical() {
  return (
    <>
      <PageHeader
        title="Clinical Care"
        lead="Frontline sexual health and infectious disease care, the training programs that extend it across the region, and the implementation work that brings new prevention tools into practice."
      />
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {pillars.clinical.map((c) => (
              <div className="card" key={c.title}>
                <i className={`fas ${c.icon}`} style={{ fontSize: '1.4rem', color: 'var(--accent)' }}></i>
                <h3 style={{ marginTop: '0.6rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
