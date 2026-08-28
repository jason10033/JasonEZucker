/**
 * Auto-update publications from Jason Zucker's public NCBI My Bibliography.
 *
 * Usage:  node scripts/update-publications.mjs
 * Env:    BIB_URL (override bibliography), NCBI_API_KEY (raise eutils rate limit)
 * Output: src/data/publications.json  (all citations, newest first)
 *
 * Method: walk the paginated public bibliography, collect PMIDs, then batch
 * PubMed esummary for structured records. Dependency-free (Node 18+ global fetch).
 * Designed to run on a schedule (Claude routine, GitHub Action, or cron).
 */
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'src', 'data', 'publications.json')
const BIB = process.env.BIB_URL || 'https://www.ncbi.nlm.nih.gov/myncbi/jason.zucker.1/bibliography/public/'
const API_KEY = process.env.NCBI_API_KEY || ''
const key = API_KEY ? `&api_key=${API_KEY}` : ''
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function pmidsFromBibliography() {
  const all = new Set()
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`${BIB}?page=${page}`, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) break
    const html = await res.text()
    const ids = [...html.matchAll(/pubmed\/(\d{6,9})/g)].map((m) => m[1])
    if (ids.length === 0) break
    const before = all.size
    ids.forEach((i) => all.add(i))
    if (all.size === before) break // no new PMIDs -> reached the last page
    await sleep(500)
  }
  return [...all]
}

async function esummary(ids) {
  const out = []
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100)
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${batch.join(',')}${key}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`esummary failed: ${res.status}`)
    const json = await res.json()
    const r = json.result || {}
    for (const uid of r.uids || []) {
      const p = r[uid]
      if (!p) continue
      const doi = (p.articleids || []).find((a) => a.idtype === 'doi')?.value || ''
      out.push({
        pmid: uid,
        title: (p.title || '').replace(/<[^>]+>/g, ''),
        authors: (p.authors || []).map((a) => a.name).join(', '),
        journal: p.source || '',
        year: (p.pubdate || '').slice(0, 4),
        date: p.sortpubdate || '',
        doi,
        url: doi ? `https://doi.org/${doi}` : `https://pubmed.ncbi.nlm.nih.gov/${uid}/`,
      })
    }
    await sleep(API_KEY ? 120 : 400)
  }
  return out
}

async function main() {
  console.log(`Reading bibliography: ${BIB}`)
  const ids = await pmidsFromBibliography()
  console.log(`Found ${ids.length} PMIDs.`)
  if (!ids.length) {
    console.log('No PMIDs found; leaving publications.json unchanged.')
    return
  }
  const pubs = await esummary(ids)
  pubs.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  await writeFile(OUT, JSON.stringify(pubs, null, 2) + '\n', 'utf8')
  console.log(`Wrote ${pubs.length} publications to ${OUT}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
