export default function PageHeader({ title, lead }) {
  return (
    <header className="page-head">
      <div className="container">
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </header>
  )
}
