import PageHeader from '../components/PageHeader.jsx'

export default function ComingSoon({ title }) {
  return (
    <>
      <PageHeader title={title} />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>In progress</div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.7rem', color: 'var(--heading)', margin: '0.5rem 0 0.7rem' }}>
            Coming soon
          </p>
          <p style={{ color: 'var(--muted)', maxWidth: '34rem', margin: '0 auto' }}>
            This section is being built and will be available shortly.
          </p>
        </div>
      </section>
    </>
  )
}
