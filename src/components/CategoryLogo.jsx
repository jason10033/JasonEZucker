export const CATEGORIES = {
  sti: { label: 'Sexually Transmitted Infections', short: 'STIs', color: '#8a1c5e' },
  hiv: { label: 'HIV Prevention & Care', short: 'HIV', color: '#c0392b' },
  mpox: { label: 'Mpox & Emerging Infections', short: 'Mpox', color: '#b07d2b' },
  informatics: { label: 'Health Informatics & AI', short: 'Informatics', color: '#1e4f8a' },
  trials: { label: 'Clinical Trials', short: 'Trials', color: '#2e7d5b' },
}

const PATHS = {
  // spirochete (Treponema pallidum) for syphilis / STIs
  sti: <path d="M2.5 12c1.2-2.7 2.4-2.7 3.6 0s2.4 2.7 3.6 0 2.4-2.7 3.6 0 2.4 2.7 3.6 0" />,
  // awareness ribbon for HIV
  hiv: (
    <>
      <path d="M12 14c-2-3-3.4-4.9-2.2-6.7.9-1.3 2.9-.7 2.2 1.3-.7-2 1.3-2.6 2.2-1.3C15.4 9.1 14 11 12 14Z" />
      <path d="M10.5 12.6 8.7 21M13.5 12.6 15.3 21" />
    </>
  ),
  // virus for mpox / emerging infections
  mpox: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
    </>
  ),
  // microchip for informatics / AI
  informatics: (
    <>
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
      <path d="M10 3.5v2M14 3.5v2M10 18.5v2M14 18.5v2M3.5 10h2M3.5 14h2M18.5 10h2M18.5 14h2" />
    </>
  ),
  // protocol clipboard with check for clinical trials
  trials: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9.2 4.5V3.4a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1v1.1Z" />
      <path d="M8.6 12.4l2.2 2.2 4.6-5" />
    </>
  ),
}

export default function CategoryLogo({ id, size = 22 }) {
  const c = CATEGORIES[id]
  if (!c) return null
  return (
    <span className="cat-logo" title={c.label} style={{ color: c.color }} aria-label={c.label}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {PATHS[id]}
      </svg>
    </span>
  )
}
