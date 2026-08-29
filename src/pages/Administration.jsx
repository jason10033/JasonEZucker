import PageHeader from '../components/PageHeader.jsx'
import leadership from '../data/leadership.json'

// Sort key from a period's start date ("MM/YYYY - ..." or "YYYY")
const startKey = (period) => {
  const first = (period || '').split('-')[0].trim()
  const md = /^(\d{1,2})\/(\d{4})$/.exec(first)
  if (md) return +md[2] * 12 + +md[1]
  const y = /^(\d{4})$/.exec(first)
  return y ? +y[1] * 12 + 12 : 0
}
const byRecent = (a, b) => startKey(b.period) - startKey(a.period)

const GROUPS = [
  { key: 'Institutional', eyebrow: 'Columbia', title: 'Leadership', cls: 'section' },
  { key: 'Committees', eyebrow: 'Columbia', title: 'Committees', cls: 'section focus-section' },
  { key: 'National/International', eyebrow: 'National and International', title: 'Committees', cls: 'section highlights-section' },
  { key: 'Guidelines', eyebrow: 'Guidelines', title: 'Guidelines and advisory', cls: 'section grants-section' },
  { key: 'NIH Review', eyebrow: 'NIH', title: 'NIH reviewer', cls: 'section darkgrey-section' },
]

function Rows({ items }) {
  return (
    <div className="rows" style={{ marginTop: '0.5rem' }}>
      {items.map((l, i) => (
        <div className="row-item" key={i}>
          <div className="r-when">{l.period}</div>
          <div>
            <div className="r-title">
              {l.role.split(';').map((part, j) => <div key={j}>{part.trim()}</div>)}
            </div>
            <div className="r-sub">
              {l.org}
              {l.location ? ` · ${l.location}` : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Administration() {
  return (
    <>
      <PageHeader title="Administration & Leadership" />
      {GROUPS.map((g, gi) => {
        const items = leadership.filter((l) => l.category === g.key).slice().sort(byRecent)
        if (!items.length) return null
        return (
          <section className={g.cls} key={g.key} style={gi === 0 ? { paddingTop: '1.4rem' } : undefined}>
            <div className="container">
              <div className="eyebrow">{g.eyebrow}</div>
              <h2 className="section-title">{g.title}</h2>
              <Rows items={items} />
            </div>
          </section>
        )
      })}
    </>
  )
}
