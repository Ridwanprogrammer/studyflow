import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = 'C:/Users/RIDWAN/Documents/Study'
const outDir = path.join(root, 'React-studyflow/backend/_content')
fs.mkdirSync(outDir, { recursive: true })

async function loadModule(source, name) {
  const target = path.join(outDir, name)
  fs.copyFileSync(source, target)
  return import(pathToFileURL(target).href)
}

const coursesMod = await loadModule(path.join(root, 'studyflow/js/courses.js'), 'courses.mjs')
const glossaryMod = await loadModule(path.join(root, 'studyflow/js/glossary.js'), 'glossary.mjs')

const courses = coursesMod.coursesData
const glossary = glossaryMod.globalGlossary

fs.writeFileSync(path.join(outDir, 'courses.json'), JSON.stringify(courses, null, 2))
fs.writeFileSync(path.join(outDir, 'glossary.json'), JSON.stringify(glossary, null, 2))

console.log('courses:', courses.length, 'topics:', courses.reduce((n, c) => n + (c.topics?.length || 0), 0))
console.log('glossary terms:', glossary.length)
console.log('disciplines:', [...new Set(glossary.map((t) => t.discipline))])
