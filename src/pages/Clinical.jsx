import PageHeader from '../components/PageHeader.jsx'
import clinicalCare from '../data/clinicalCare.json'
import clinicalInnovations from '../data/clinicalInnovations.json'

export default function Clinical() {
  return (
    <>
      <PageHeader title="Clinical Care" />

      {/* Clinical care (flip cards) */}
      <section className="section" style={{ paddingTop: '1.4rem' }}>
        <div className="container">
          <div className="eyebrow">Focus</div>
          <h2 className="section-title">Clinical care</h2>
          <div className="eflip-grid" style={{ marginTop: '0.5rem' }}>
            {clinicalCare.map((c) => (
              <div className="eflip" key={c.title}>
                <div className="eflip-inner">
                  <div className="eflip-face">
                    <i className={`fas ${c.icon}`} style={{ fontSize: '1.35rem', color: 'var(--accent)' }}></i>
                    <h3>{c.title}</h3>
                    <span className="hint">Hover for detail</span>
                  </div>
                  <div className="eflip-face eflip-back">
                    <h3>{c.title}</h3>
                    <p>{c.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical innovations (cards) */}
      <section className="section focus-section">
        <div className="container">
          <div className="eyebrow">Innovation</div>
          <h2 className="section-title">Clinical innovations</h2>
          <div className="card-grid" style={{ marginTop: '0.5rem' }}>
            {clinicalInnovations.map((it) => (
              <div className="card" key={it.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-tag">{it.tag}</div>
                <h3 style={{ margin: '0.4rem 0 0.35rem', fontFamily: 'var(--serif)', color: 'var(--heading)', fontSize: '1.08rem' }}>{it.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>{it.desc}</p>
                <div className="int-links" style={{ marginTop: 'auto', paddingTop: '0.8rem' }}>
                  {it.link && <a href={it.link} target="_blank" rel="noopener">Open tool &rarr;</a>}
                  {it.links && it.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener">{l.label} &rarr;</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
