import PageHeader from '../components/PageHeader.jsx'
import InnovationCards from '../components/InnovationCards.jsx'
import profile from '../data/profile.json'
import teaching from '../data/teaching.json'
import pillars from '../data/pillars.json'
import trainingGrants from '../data/trainingGrants.json'
import interventions from '../data/interventions.json'
import grandRounds from '../data/grandRounds.json'

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
          <InnovationCards items={interventions} />
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
