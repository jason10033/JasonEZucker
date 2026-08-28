import PageHeader from '../components/PageHeader.jsx'
import InnovationCards from '../components/InnovationCards.jsx'
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
          <InnovationCards items={clinicalInnovations} />
        </div>
      </section>
    </>
  )
}
