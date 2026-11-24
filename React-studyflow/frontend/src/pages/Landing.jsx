import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  FileText,
  GraduationCap,
  Lightbulb,
  PlayCircle,
  Sparkles,
  Target,
} from '../components/ui/Icons'
import './Landing.css'

const features = [
  { title: 'Your courses', description: 'Open course topics and study materials.', icon: BookOpen, to: '/courses' },
  { title: 'Structured notes', description: 'Read clear notes and revisit key ideas.', icon: FileText, to: '/courses' },
  { title: 'Guided lessons', description: 'Work through supported topics step by step.', icon: GraduationCap, to: '/courses' },
  { title: 'AI tutor', description: 'Ask questions about what you are studying.', icon: Brain, to: '/chat' },
  { title: 'Course glossary', description: 'Look up key terms across your subjects.', icon: Sparkles, to: '/glossary' },
  { title: 'Semester calendar', description: 'Keep important academic dates in view.', icon: Calendar, to: '/calendar' },
]

const answers = [
  { value: 'yes', label: 'Yes, it is' },
  { value: 'no', label: "No, it's not" },
]
const currentYear = new Date().getFullYear()

function Brand({ showTagline = false }) {
  return (
    <Link to="/" className="sf-landing-brand" aria-label="StudyFlow home">
      <img src="/icons/logo.png" alt="" />
      <span>
        Study<em>Flow</em>
        {showTagline && <small>Learn. Grow. Achieve.</small>}
      </span>
    </Link>
  )
}

function LandingLessonPreview() {
  const [answer, setAnswer] = useState('')

  return (
    <div className="sf-landing-lesson-frame" aria-label="Preview of an interactive StudyFlow lesson">
      <div className="sf-landing-lesson">
        <div className="sf-landing-lesson__header">
          <Brand />
          <a className="sf-landing-lesson__back" href="#features">
            <ArrowLeft size={13} aria-hidden="true" />
            Back to courses
          </a>
        </div>

        <div className="sf-landing-lesson__context">
          <div>
            <span className="sf-landing-lesson__course">CSC 215</span>
            <h3>Propositional logic</h3>
            <p>A short example of how a guided lesson can work.</p>
          </div>
          <span className="sf-landing-lesson__preview-label">Lesson preview</span>
        </div>

        <div className="sf-landing-lesson__body">
          <div className="sf-landing-lesson__explanation">
            <span className="sf-landing-lesson__icon"><Lightbulb size={19} aria-hidden="true" /></span>
            <div>
              <strong>Let&apos;s explore an idea</strong>
              <p>
                A logical proposition is a statement that can be either true or false.
                &quot;The sky is blue&quot; is a proposition.
              </p>
            </div>
          </div>

          <div className="sf-landing-lesson__question">
            <span className="sf-landing-lesson__icon"><Target size={18} aria-hidden="true" /></span>
            <div className="sf-landing-lesson__question-copy">
              <strong>Quick check</strong>
              <p>Is the following a proposition?</p>
              <blockquote>&quot;Read this sentence.&quot;</blockquote>
              <div className="sf-landing-lesson__answers" aria-label="Choose your answer">
                {answers.map((option) => (
                  <button
                    className={answer === option.value ? 'is-selected' : ''}
                    key={option.value}
                    onClick={() => setAnswer(option.value)}
                    type="button"
                    aria-pressed={answer === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {answer && (
                <p className="sf-landing-lesson__feedback" role="status">
                  {answer === 'no'
                    ? "That's right. A command is not a statement that can be true or false."
                    : 'Not quite. A proposition must be a statement that can be true or false.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Landing() {
  return (
    <div className="sf-landing" id="top">
      <header className="sf-landing-nav">
        <div className="sf-landing-wrap sf-landing-nav__inner">
          <Brand />
          <nav className="sf-landing-nav__links" aria-label="Page navigation">
            <a className="is-current" href="#top">Home</a>
            <Link to="/courses">Courses</Link>
            <a href="#features">Features</a>
            <a href="#learning">How it works</a>
          </nav>
          <Link to="/register" className="sf-landing-btn sf-landing-btn--primary sf-landing-btn--sm">
            Get Started <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="sf-landing-hero" aria-labelledby="sf-landing-title">
          <div className="sf-landing-wrap sf-landing-hero__inner">
            <div className="sf-landing-hero__copy">
              <p className="sf-landing-kicker">
                <span aria-hidden="true" />
                Your study space, all in one place
              </p>
              <h1 id="sf-landing-title">
                Make room<br />
                for <span>progress.</span>
              </h1>
              <p className="sf-landing-lede">
                Bring your courses, structured notes, guided lessons, and study tools
                together in one calm place to learn.
              </p>
              <div className="sf-landing-actions">
                <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
                  Create your account <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#learning" className="sf-landing-demo-link">
                  <PlayCircle size={34} aria-hidden="true" />
                  Try a lesson preview
                </a>
              </div>
            </div>

            <nav className="sf-landing-quick-links" aria-label="StudyFlow learning tools">
              <Link to="/courses"><BookOpen aria-hidden="true" /><span>Course<br />materials</span></Link>
              <Link to="/courses"><FileText aria-hidden="true" /><span>Structured<br />notes</span></Link>
              <Link to="/courses"><Target aria-hidden="true" /><span>Guided<br />lessons</span></Link>
              <Link to="/glossary"><Sparkles aria-hidden="true" /><span>Course<br />glossary</span></Link>
              <Link to="/chat"><Brain aria-hidden="true" /><span>AI<br />tutor</span></Link>
            </nav>
          </div>
        </section>

        <section className="sf-landing-learning" id="learning" aria-labelledby="sf-learning-title">
          <div className="sf-landing-wrap sf-landing-learning__grid">
            <LandingLessonPreview />

            <div className="sf-landing-learning__copy">
              <p className="sf-landing-eyebrow">Learn by working through ideas</p>
              <h2 id="sf-learning-title">Understand the idea. Then practise it.</h2>
              <p>
                For supported topics, guided lessons introduce a concept, give you a
                chance to reason through it, and explain what to revisit.
              </p>
              <ul className="sf-landing-benefits">
                <li><CheckCircle size={18} aria-hidden="true" /> Interactive lessons, not just quizzes</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Clear explanations after each answer</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Return to your saved lesson session</li>
              </ul>
              <Link className="sf-landing-text-link" to="/courses">
                Explore your courses <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="sf-landing-features" id="features" aria-labelledby="sf-features-title">
          <div className="sf-landing-wrap sf-landing-features__grid">
            <div className="sf-landing-features__intro">
              <p className="sf-landing-eyebrow">Made for the way you study</p>
              <h2 id="sf-features-title">The tools you use, in one study space.</h2>
              <p>
                Start from your course, then move between notes, guided practice,
                reference terms, and help when you need it.
              </p>
              <Link to="/courses" className="sf-landing-btn sf-landing-btn--outline">
                Browse courses <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="sf-landing-feature-grid">
              {features.map(({ title, description, icon: Icon, to }) => (
                <Link className="sf-landing-feature" key={title} to={to}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="sf-landing-feature__action">Explore</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sf-landing-cta" id="contact" aria-labelledby="sf-cta-title">
          <div className="sf-landing-cta__image" aria-hidden="true" />
          <div className="sf-landing-wrap sf-landing-cta__inner">
            <div className="sf-landing-cta__brand" aria-hidden="true">
              <img src="/icons/logo.png" alt="" />
            </div>
            <div className="sf-landing-cta__copy">
              <h2 id="sf-cta-title">Start with the course you are studying.</h2>
              <p>Create an account to open your courses, notes, and study tools.</p>
            </div>
            <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
              Get started <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="sf-landing-footer">
        <div className="sf-landing-wrap sf-landing-footer__main">
          <div className="sf-landing-footer__brand">
            <Brand showTagline />
          </div>
          <nav aria-label="Footer navigation">
            <a href="#top">Home</a>
            <a href="#features">Features</a>
            <Link to="/courses">Courses</Link>
            <a href="#learning">How it works</a>
            <Link to="/login">Sign in</Link>
          </nav>
          <Link className="sf-landing-footer__signin" to="/register">Create account</Link>
        </div>
        <div className="sf-landing-wrap sf-landing-footer__bottom">
          <span>© {currentYear} StudyFlow. All rights reserved.</span>
          <span>StudyFlow · Your learning workspace</span>
        </div>
      </footer>
    </div>
  )
}

export default Landing
