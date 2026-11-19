import { Link } from 'react-router-dom'
import { APP_CONFIG, getFullInstitutionLabel } from '../config/AppConfig'
import {
  ArrowRight,
  BookOpen,
  Check,
  Layers,
  Sparkles,
  Target,
} from '../components/ui/Icons'
import './Landing.css'

const courses = [
  { code: 'MTH 201', title: 'Mathematics for Computer Science', meta: '9 topics' },
  { code: 'CSC 215', title: 'Computer Architecture & Logic', meta: '9 topics' },
  { code: 'CSC 203', title: 'Discrete Structures', meta: '10 topics' },
  { code: 'COS 201', title: 'Software Engineering', meta: '8 topics' },
]

function Brand() {
  return (
    <Link to="/" className="sf-landing-brand" aria-label="StudyFlow home">
      <img src="/icons/logo.svg" alt="" />
      <span>Study<em>Flow</em></span>
    </Link>
  )
}

export function Landing() {
  return (
    <div className="sf-landing">
      <div className="sf-landing__grid" aria-hidden="true" />
      <div className="sf-landing__lamp" aria-hidden="true" />

      <header className="sf-landing-nav">
        <div className="sf-landing-wrap sf-landing-nav__inner">
          <Brand />
          <nav className="sf-landing-nav__links" aria-label="Page navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#courses">Courses</a>
          </nav>
          <div className="sf-landing-nav__actions">
            <Link to="/login" className="sf-landing-nav__signin">Sign in</Link>
            <Link to="/register" className="sf-landing-btn sf-landing-btn--primary sf-landing-btn--sm">
              Create account <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <main className="sf-landing-wrap" id="main-content">
        <section className="sf-landing-hero" aria-labelledby="sf-landing-title">
          <div className="sf-landing-hero__copy">
            <p className="sf-landing-kicker">
              <span className="sf-landing-kicker__dot" aria-hidden="true" />
              {getFullInstitutionLabel()}
            </p>
            <h1 id="sf-landing-title">Understand the work, not just the notes.</h1>
            <p className="sf-landing-lede">
              StudyFlow turns your course material into guided lessons you can actually
              follow — with worked examples, a glossary that explains the words, and an
              AI tutor for the step you&apos;re stuck on.
            </p>
            <div className="sf-landing-actions">
              <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
                Start learning <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/login" className="sf-landing-btn sf-landing-btn--quiet">
                I already have an account
              </Link>
            </div>
            <p className="sf-landing-fineprint">
              Built for {APP_CONFIG.institution.program} · {APP_CONFIG.institution.semester}
            </p>
            <p className="sf-landing-scribble">see it → say it → do it</p>
          </div>

          <div className="sf-landing-hero__visual">
            <div className="sf-landing-preview" aria-label="Preview of a StudyFlow lesson">
              <div className="sf-landing-preview__top">
                <span className="sf-landing-preview__code">CSC 215</span>
                <span className="sf-landing-preview__topic">Binary number systems</span>
              </div>

              <h2 className="sf-landing-preview__title">Reading a binary number</h2>
              <p className="sf-landing-preview__sub">Worked example · Lesson 4 of 9</p>

              <div className="sf-landing-equation">
                <span className="sf-landing-equation__label">Work it out</span>
                <p>
                  (1011)<sub>2</sub> = 1×2<sup>3</sup> + 0×2<sup>2</sup> + 1×2<sup>1</sup> + 1×2<sup>0</sup> = <strong>11</strong>
                </p>
              </div>

              <div className="sf-landing-ai">
                <span className="sf-landing-ai__label">
                  <Sparkles size={14} aria-hidden="true" /> AI tutor
                </span>
                <p>
                  “Read the bits from the right. Each place is a power of two — add the
                  positions that are switched on.”
                </p>
              </div>

              <div className="sf-landing-progress">
                <div className="sf-landing-progress__meta">
                  <span>Lesson 4 of 9</span>
                  <span>44%</span>
                </div>
                <div className="sf-landing-progress__track">
                  <span style={{ width: '44%' }} />
                </div>
              </div>
            </div>

            <div className="sf-landing-chip sf-landing-chip--one">
              <Check size={14} aria-hidden="true" /> Concept unlocked
            </div>
            <div className="sf-landing-chip sf-landing-chip--two">
              128 glossary terms
            </div>
          </div>
        </section>

        <section className="sf-landing-section" id="how-it-works" aria-labelledby="sf-how-title">
          <div className="sf-landing-section__head">
            <p className="sf-landing-label">The workspace</p>
            <h2 id="sf-how-title">Everything you need to sit down and study.</h2>
          </div>
          <div className="sf-landing-features">
            <article className="sf-landing-feature">
              <span className="sf-landing-feature__icon"><BookOpen size={19} aria-hidden="true" /></span>
              <h3>Lessons with a thread</h3>
              <p>
                Follow a topic from the first idea to the worked example. Nothing skipped,
                nothing that assumes you already know it.
              </p>
            </article>
            <article className="sf-landing-feature">
              <span className="sf-landing-feature__icon"><Target size={19} aria-hidden="true" /></span>
              <h3>Progress you can see</h3>
              <p>
                Mark what you&apos;ve finished, bookmark what you want to revisit, and keep
                your notes beside the topic they belong to.
              </p>
            </article>
            <article className="sf-landing-feature">
              <span className="sf-landing-feature__icon"><Layers size={19} aria-hidden="true" /></span>
              <h3>Words, explained once</h3>
              <p>
                A shared glossary gives every term a plain definition and the formal version,
                with links back to where you met it.
              </p>
            </article>
          </div>
        </section>

        <section className="sf-landing-section" id="courses" aria-labelledby="sf-courses-title">
          <div className="sf-landing-section__head">
            <p className="sf-landing-label">On the shelf</p>
            <h2 id="sf-courses-title">Your courses, in one place.</h2>
          </div>
          <div className="sf-landing-courses">
            {courses.map((course) => (
              <div className="sf-landing-course" key={course.code}>
                <span className="sf-landing-course__code">{course.code}</span>
                <span className="sf-landing-course__title">{course.title}</span>
                <span className="sf-landing-course__meta">{course.meta}</span>
              </div>
            ))}
          </div>
          <p className="sf-landing-section__foot">
            Sign in to open any course and pick up where you left off.
          </p>
        </section>

        <section className="sf-landing-cta" aria-labelledby="sf-cta-title">
          <div>
            <p className="sf-landing-label">Start small</p>
            <h2 id="sf-cta-title">Start with one topic.</h2>
            <p className="sf-landing-cta__copy">
              Make an account, choose a course, and work through the next thing you actually
              need to understand.
            </p>
            <div className="sf-landing-actions">
              <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
                Create account <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/login" className="sf-landing-btn sf-landing-btn--quiet">
                Sign in instead
              </Link>
            </div>
          </div>
          <span className="sf-landing-cta__scribble" aria-hidden="true">one topic at a time</span>
        </section>
      </main>

      <footer className="sf-landing-footer">
        <div className="sf-landing-wrap sf-landing-footer__inner">
          <span>StudyFlow · {getFullInstitutionLabel()}</span>
          <span>{APP_CONFIG.app.tagline}</span>
        </div>
      </footer>
    </div>
  )
}
