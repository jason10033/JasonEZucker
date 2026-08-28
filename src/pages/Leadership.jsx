import PageHeader from '../components/PageHeader.jsx'
import leadership from '../data/leadership.json'
import editorial from '../data/editorial.json'
import awards from '../data/awards.json'

const categoryOrder = ['National/International', 'Guidelines', 'Institutional', 'Committees']
const categoryLabel = {
  'National/International': 'National and International Leadership',
  Guidelines: 'Guidelines and Working Groups',
  Institutional: 'Institutional Leadership',
  Committees: 'Committees and Workgroups',
}

export default function Leadership() {
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: leadership.filter((l) => l.category === cat) }))
    .filter((g) => g.items.length)

  return (
    <>
      <PageHeader
        title="Leadership, Service, and Honors"
        lead="Scientific leadership, guidelines development, editorial roles, and recognition across regional, national, and international bodies."
      />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Recognition</div>
          <h2 className="section-title">Honors and Awards</h2>
          <div className="rows">
            {awards.map((a) => (
              <div className="row-item" key={a.title + a.date}>
                <div className="r-when">{a.date}</div>
                <div>
                  <div className="r-title">{a.title}</div>
                  <div className="r-sub">{a.org}</div>
                  {a.description && (
                    <div style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{a.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {grouped.map((g) => (
        <section className="section section-soft" key={g.cat}>
          <div className="container">
            <h2 className="section-title" style={{ fontSize: '1.4rem' }}>{categoryLabel[g.cat]}</h2>
            <div className="rows">
              {g.items.map((it, i) => (
                <div className="row-item" key={it.org + i}>
                  <div className="r-when">{it.period}</div>
                  <div>
                    <div className="r-title">{it.role}</div>
                    <div className="r-sub">
                      {it.org}
                      {it.location ? ` · ${it.location}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="eyebrow">Editorial</div>
          <h2 className="section-title">Editorial Boards and Guest Editorships</h2>
          <div className="rows">
            {editorial.boards.map((b, i) => (
              <div className="row-item" key={b.journal + i}>
                <div className="r-when">{b.period}</div>
                <div>
                  <div className="r-title">{b.journal}</div>
                  <div className="r-sub">{b.role}</div>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: '2rem', fontSize: '1.1rem' }}>Ad hoc peer review</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{editorial.reviewer.join(' · ')}</p>
        </div>
      </section>
    </>
  )
}
