// StudyFlow Configuration
// Update these values for your institution

export const APP_CONFIG = {
  // Institution branding
  institution: {
    name: 'Federal University, Gusau',
    shortName: 'FUGUS',
    level: '200 Level',
    semester: '2nd Semester',
    program: 'B.Sc Computer Science',
  },

  // App metadata
  app: {
    name: 'StudyFlow',
    tagline: 'Your learning workspace',
    description: 'Adaptive learning, progress tracking, and AI-assisted study recommendations',
  },

  // Feature flags
  features: {
    aiChat: true,
    glossary: true,
    progressTracking: true,
    courseEnrollment: true,
  },

  // UI preferences
  ui: {
    defaultTheme: 'dark',
    animationsEnabled: true,
    compactMode: false,
  },
}

export const getInstitutionLabel = () => {
  const { shortName, level } = APP_CONFIG.institution
  return `${shortName} · ${level}`
}

export const getFullInstitutionLabel = () => {
  const { shortName, level, semester, program } = APP_CONFIG.institution
  return `${shortName} · ${level} · ${semester} · ${program}`
}