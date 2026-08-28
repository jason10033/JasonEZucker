import PageHeader from '../components/PageHeader.jsx'
import profile from '../data/profile.json'
import teaching from '../data/teaching.json'
import pillars from '../data/pillars.json'
import trainingGrants from '../data/trainingGrants.json'
import interventions from '../data/interventions.json'
import grandRounds from '../data/grandRounds.json'

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

export default function Education() {
  return (
    <>
      <PageHeader title="Education & Teaching" />

      {/* Teaching and mentoring (flip cards) */}
      <section className="section" style={{ paddingTop: '1.4rem' }}>
        <div className="container">
          <div className="eyebrow">Focus</div>
          <h2 className="section-title">Teaching and mentoring</h2>
          <div className="eflip-grid" style={{ marginTop: '0.5rem' }}>
            {(() => {
              const pillarCards = pillars.education.map((e) => (
                <div className="eflip" key={e.title}>
                  <div className="eflip-inner">
                    <div className="eflip-face">
                      <i className={`fas ${e.icon}`} style={{ fontSize: '1.35rem', color: 'var(--accent)' }}></i>
                      <h3>{e.title}</h3>
                      <span className="hint">{e.link ? 'Hover · visit site' : 'Hover for detail'}</span>
                    </div>
                    <div className="eflip-face eflip-back">
                      <h3>{e.title}</h3>
                      <p>{e.summary}</p>
                      {e.link && (
                        <a className="eflip-link" href={e.link} target="_blank" rel="noopener">Visit site &rarr;</a>
                      )}
                    </div>
                  </div>
                </div>
              ))
              const trainingCard = (
                <div className="eflip" key="training-faculty">
                  <div className="eflip-inner">
                    <div className="eflip-face">
                      <i className="fas fa-flask" style={{ fontSize: '1.35rem', color: 'var(--accent)' }}></i>
                      <h3>Training faculty</h3>
                      <span className="hint">Hover for grants</span>
                    </div>
                    <div className="eflip-face eflip-back">
                      <h3>Training faculty</h3>
                      <p style={{ marginBottom: '0.5rem' }}>Faculty on NIH training grants:</p>
                      <div className="eflip-links">
                        {trainingGrants.map((g) => (
                          <a className="eflip-link" key={g.grantId} href={g.reporterUrl} target="_blank" rel="noopener">{g.name} &rarr;</a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
              const grandRoundsCard = (
                <div className="eflip" key="grand-rounds">
                  <div className="eflip-inner">
                    <div className="eflip-face">
                      <i className="fas fa-microphone-lines" style={{ fontSize: '1.35rem', color: 'var(--accent)' }}></i>
                      <h3>Grand Rounds</h3>
                      <span className="hint">Hover for topics</span>
                    </div>
                    <div className="eflip-face eflip-back">
                      <h3>Grand Rounds</h3>
                      <div className="eflip-tags">
                        {grandRounds.topics.map((t) => <span className="eflip-tag" key={t}>{t}</span>)}
                      </div>
                      <a className="eflip-link" href={profile.links.email}>Invite me to speak &rarr;</a>
                    </div>
                  </div>
                </div>
              )
              // PTC, SOC, Training faculty, then Resident & Fellow, Medical Student, Grand Rounds
              return [...pillarCards.slice(0, 2), trainingCard, ...pillarCards.slice(2), grandRoundsCard]
            })()}
          </div>
        </div>
      </section>

      {/* Educational interventions (list) */}
      <section className="section focus-section">
        <div className="container">
          <div className="eyebrow">Innovation</div>
          <h2 className="section-title">Educational innovations</h2>
          <div className="card-grid" style={{ marginTop: '0.5rem' }}>
            {interventions.map((it) => (
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
        </div>
      </section>

      {/* Courses and lectures */}
      <section className="section highlights-section">
        <div className="container">
          <div className="eyebrow">Curriculum</div>
          <h2 className="section-title">Courses and lectures</h2>
          <div className="rows" style={{ marginTop: '0.5rem' }}>
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

      {/* Invited grand rounds topics */}
      <section className="section grants-section">
        <div className="container">
          <div className="eyebrow">Speaking</div>
          <h2 className="section-title">Invited grand rounds topics</h2>
          <div className="gr-list" style={{ marginTop: '0.5rem' }}>
            {grandRounds.topicList.map((t) => (
              <div className="gr-item" key={t}>
                <div className="r-title">{t}</div>
              </div>
            ))}
          </div>
          <p className="gr-note">
            For the complete list of invited grand rounds, see my{' '}
            <a href="/files/cv.pdf" target="_blank" rel="noopener">CV</a>.
          </p>
        </div>
      </section>
    </>
  )
}
