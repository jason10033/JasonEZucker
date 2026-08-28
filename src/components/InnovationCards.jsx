// Shared renderer for innovation cards. Both the Education and Clinical pages
// and the combined Innovations page use this so the sections always match.
function renderDesc(it) {
  if (it.frameworkUrl && it.desc.includes('GOALS')) {
    const [before, after] = it.desc.split('GOALS')
    return (
      <>
        {before}
        <a href={it.frameworkUrl} target="_blank" rel="noopener">GOALS</a>
        {after}
      </>
    )
  }
  return it.desc
}

export default function InnovationCards({ items }) {
  return (
    <div className="card-grid" style={{ marginTop: '0.5rem' }}>
      {items.map((it) => (
        <div className="card" key={it.name} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-tag">{it.tag}</div>
          <h3 style={{ margin: '0.4rem 0 0.35rem', fontFamily: 'var(--serif)', color: 'var(--heading)', fontSize: '1.08rem' }}>{it.name}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>{renderDesc(it)}</p>
          <div className="int-links" style={{ marginTop: 'auto', paddingTop: '0.8rem' }}>
            {it.link && <a href={it.link} target="_blank" rel="noopener">Open tool &rarr;</a>}
            {it.links && it.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener">{l.label} &rarr;</a>
            ))}
            {it.status && !it.link && !it.links && <span className="int-status">{it.status}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
