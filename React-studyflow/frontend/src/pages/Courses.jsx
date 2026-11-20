import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api, unwrapList } from '../lib/api'
import { CourseCard } from '../components/CourseCard'
import { Search, X, Cpu, Briefcase, FlaskConical, GraduationCap, BookOpen, SearchX } from '../components/ui/Icons'

const disciplineIcons = {
  'Computer Science': <Cpu size={15} className="sf-discipline-icon" />,
  'Mathematics': <GraduationCap size={15} className="sf-discipline-icon" />,
  'Entrepreneurship': <Briefcase size={15} className="sf-discipline-icon" />,
  'Practicum': <FlaskConical size={15} className="sf-discipline-icon" />,
  'Physics': <FlaskConical size={15} className="sf-discipline-icon" />,
  'Chemistry': <FlaskConical size={15} className="sf-discipline-icon" />,
}

export function Courses() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses/')
      return unwrapList(response.data)
    },
  })

  const { data: disciplines = [] } = useQuery({
    queryKey: ['disciplines'],
    queryFn: async () => {
      const response = await api.get('/courses/disciplines/')
      return unwrapList(response.data)
    },
  })

  const filtered = courses
    .filter((c) => {
      if (
        searchQuery &&
        !c.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (selectedDiscipline !== 'all' && c.discipline?.slug !== selectedDiscipline) {
        return false
      }
      return true
    })
    .sort((a, b) => a.code.localeCompare(b.code))

  const handleClearSearch = () => setSearchQuery('')

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-slate-900/60 border border-white/5" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="h-64 rounded-2xl bg-slate-900/50 border border-white/5" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Search & Filter Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/75 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            id="course-search-input"
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Search by course code (e.g. CSC 202) or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              id="course-search-clear"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={handleClearSearch}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills & Summary Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedDiscipline('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDiscipline === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              All Disciplines
            </button>
            {disciplines.map((d) => {
              const isActive = selectedDiscipline === d.slug
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDiscipline(d.slug)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {disciplineIcons[d.name] || <BookOpen size={14} />}
                  <span>{d.name}</span>
                </button>
              )
            })}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            Showing <strong className="text-white">{filtered.length}</strong> of {courses.length} courses
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-container">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 sm:p-16 rounded-3xl bg-slate-900/40 border border-dashed border-white/10 text-center space-y-3">
            <SearchX size={48} className="mx-auto text-slate-500 opacity-60" />
            <h3 className="font-extrabold text-white text-lg">No courses found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No course matches &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the active discipline filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedDiscipline('all')
              }}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-all cursor-pointer"
            >
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          filtered.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))
        )}
      </div>
    </div>
  )
}
export default Courses
