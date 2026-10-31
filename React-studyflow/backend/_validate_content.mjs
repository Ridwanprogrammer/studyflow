import fs from 'node:fs'

const glossary = JSON.parse(fs.readFileSync('_content/glossary.json', 'utf8'))
const courses = JSON.parse(fs.readFileSync('_content/courses.json', 'utf8'))

for (const key of ['id', 'term', 'discipline', 'category', 'shortDefinition', 'fullDefinition']) {
  const missing = glossary.filter((t) => !t[key])
  if (missing.length) console.log('glossary missing', key, missing.map((t) => t.id))
}
const ids = glossary.map((t) => t.id)
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
console.log('duplicate glossary ids:', [...new Set(dupes)])
const missingRelated = [...new Set(glossary.flatMap((t) => (t.relatedTerms || []).filter((r) => !ids.includes(r))))]
console.log('unresolved relatedTerms:', missingRelated)

for (const c of courses) {
  if (!c.id || !c.title || !c.description || !Array.isArray(c.topics)) console.log('bad course', c.id)
  for (const t of c.topics || []) {
    if (!t.id || !t.title) console.log('bad topic', c.id, t)
    if (!t.notes) console.log('no notes', t.id)
  }
}
console.log('course ids:', courses.map((c) => c.id))
