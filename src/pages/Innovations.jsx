import PageHeader from '../components/PageHeader.jsx'
import InnovationCards from '../components/InnovationCards.jsx'
import interventions from '../data/interventions.json'
import clinicalInnovations from '../data/clinicalInnovations.json'

// Sections read the same data as the Education and Clinical pages, so they
// always stay in sync with those pages.
export default function Innovations() {
  return (
    <>
      <PageHeader title="Innovations" />

      <section className="section" style={{ paddingTop: '1.4rem' }}>
        <div className="container">
          <div className="eyebrow">Education</div>
          <h2 className="section-title">Educational innovations</h2>
          <InnovationCards items={interventions} />
        </div>
      </section>

      <section className="section focus-section">
        <div className="container">
          <div className="eyebrow">Clinical</div>
          <h2 className="section-title">Clinical innovations</h2>
          <InnovationCards items={clinicalInnovations} />
        </div>
      </section>
    </>
  )
}
