import PageHeader from '../components/PageHeader.jsx'
import edu from '../data/education.json'
import appointments from '../data/appointments.json'
import teaching from '../data/teaching.json'
import pillars from '../data/pillars.json'

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-period">{it.period}</div>
          <div className="timeline-role">{it.role || it.degree}</div>
          <div className="timeline-org">
            {it.org || it.institution}
            {it.location ? ` · ${it.location}` : ''}
          </div>
          {it.detail && <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{it.detail}</div>}
        </div>
      ))}
    </div>
  )
}

export default function Education() {
  return (
    <>
      <PageHeader
        title="Education, Training, and Teaching"
        lead="Clinical training in combined Medicine and Pediatric Infectious Diseases, and a decade of medical education across Columbia and beyond."
      />
      <section className="section">
        <div className="container">
          <div className="eyebrow">Teaching and programs</div>
          <h2 className="section-title">Education at a glance</h2>
          <div className="card-grid">
            {pillars.education.map((e) => (
              <div className="card" key={e.title}>
                <i className={`fas ${e.icon}`} style={{ fontSize: '1.4rem', color: 'var(--accent)' }}></i>
                <h3 style={{ marginTop: '0.6rem' }}>{e.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{e.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Appointments</h2>
            <Timeline items={appointments} />
          </div>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Training</h2>
            <Timeline items={edu.training} />
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginTop: '1.5rem' }}>Education</h2>
            <Timeline items={edu.education} />
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginTop: '1.5rem' }}>Board Certifications</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {edu.boardCertifications.map((b) => (
                <span className="chip" key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">Medical education</div>
          <h2 className="section-title">Teaching and lectures</h2>
          <div className="rows">
            {teaching.map((t) => (
              <div className="row-item" key={t.title + t.period}>
                <div className="r-when">{t.period}</div>
                <div>
                  <div className="r-title">{t.title}</div>
                  <div className="r-sub">{t.context}</div>
                  {t.detail && <div style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{t.detail}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
