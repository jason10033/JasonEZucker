import PageHeader from '../components/PageHeader.jsx'
import edu from '../data/education.json'
import appointments from '../data/appointments.json'

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

// Faculty and clinical appointments only (omit pre-medicine roles)
const facultyAppointments = appointments.filter((a) => !/Project Coordinator|Moonlighter/i.test(a.role))

export default function Resume() {
  return (
    <>
      <PageHeader
        title="Resume"
        lead="Training, appointments, degrees, and board certification."
      />

      {/* Training and appointments */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Training</div>
          <h2 className="section-title">Clinical training and appointments</h2>
          <div className="edu-cols" style={{ marginTop: '1.25rem' }}>
            <div>
              <div className="subhead">Postgraduate training</div>
              <Timeline items={edu.training} />
            </div>
            <div>
              <div className="subhead">Faculty and clinical appointments</div>
              <Timeline items={facultyAppointments} />
            </div>
          </div>
        </div>
      </section>

      {/* Degrees and certification */}
      <section className="section focus-section">
        <div className="container">
          <div className="eyebrow">Background</div>
          <h2 className="section-title">Degrees and certification</h2>
          <div className="edu-cols" style={{ marginTop: '1.25rem' }}>
            <div>
              <div className="subhead">Education</div>
              <Timeline items={edu.education} />
            </div>
            <div>
              <div className="subhead">Board certifications</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {edu.boardCertifications.map((b) => (
                  <span className="chip" key={b}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
