import { Link } from 'react-router-dom'
import { APP_CONFIG, getFullInstitutionLabel } from '../config/AppConfig'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Layers,
  Sparkles,
  Target,
} from '../components/ui/Icons'
import './Landing.css'

const courses = [
  { code: 'MTH 201', title: 'Mathematics for Computer Science', topics: '9 topics' },
  { code: 'CSC 215', title: 'Computer Architecture & Logic', topics: '9 topics' },
  { code: 'CSC 203', title: 'Discrete Structures', topics: '10 topics' },
  { code: 'COS 201', title: 'Software Engineering', topics: '8 topics' },
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
      <header className="sf-landing-nav">
        <div className="sf-landing-wrap sf-landing-nav__inner">
          <Brand />
          <nav className="sf-landing-nav__links" aria-label="Page navigation">
            <a href="#learning">How it works</a>
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

      <main id="main-content">
        <section className="sf-landing-hero" aria-labelledby="sf-landing-title">
          <div className="sf-landing-wrap sf-landing-hero__inner">
            <div className="sf-landing-hero__copy">
              <p className="sf-landing-kicker">
                <span className="sf-landing-kicker__line" aria-hidden="true" />
                {getFullInstitutionLabel()}
              </p>
              <h1 id="sf-landing-title">Make sense of what you&apos;re studying.</h1>
              <p className="sf-landing-lede">
                Clear, guided lessons for the topics that matter. Work through each idea,
                try it for yourself, and know what to revisit.
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
            </div>

            <figure className="sf-landing-hero__photo">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85"
                alt="Students working through a lesson together in a library"
                fetchPriority="high"
              />
              <figcaption>
                <span className="sf-landing-hero__photo-icon">
                  <BookOpen size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong>Learn it step by step</strong>
                  <small>Explanations, examples, and practice in one place</small>
                </span>
              </figcaption>
            </figure>

            <div className="sf-landing-hero__edge" aria-hidden="true" />
          </div>
        </section>

        <section className="sf-landing-learning" id="learning" aria-labelledby="sf-learning-title">
          <div className="sf-landing-wrap sf-landing-learning__grid">
            <div className="sf-landing-learning__copy">
              <p className="sf-landing-eyebrow">Learning that builds</p>
              <h2 id="sf-learning-title">A difficult topic, made easier to follow.</h2>
              <p>
                Start with the idea in everyday language. See how it works in a real
                example, then check your understanding before moving on.
              </p>
              <ul className="sf-landing-benefits">
                <li><CheckCircle size={18} aria-hidden="true" /> Concepts explained in order</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Worked examples that show each step</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Separate lesson notes to revisit</li>
              </ul>
              <a className="sf-landing-text-link" href="#courses">
                Explore your courses <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <article className="sf-landing-lesson" aria-label="Sample guided lesson">
              <div className="sf-landing-lesson__top">
                <span className="sf-landing-lesson__course">CSC 215</span>
                <span className="sf-landing-lesson__position">Guided lesson <span>·</span> 04 of 09</span>
              </div>
              <div className="sf-landing-lesson__progress" aria-label="Lesson progress: 44 percent">
                <span />
              </div>
              <h3>Reading a binary number</h3>
              <p className="sf-landing-lesson__intro">
                Each position in a binary number has a value. Start on the right, where
                the first position is worth one.
              </p>
              <div className="sf-landing-example">
                <span>Let&apos;s work through one</span>
                <p>(1011)<sub>2</sub> = 8 + 0 + 2 + 1 = <strong>11</strong></p>
              </div>
              <details className="sf-landing-check">
                <summary>
                  <span><Target size={16} aria-hidden="true" /> Why does the rightmost place equal one?</span>
                  <span className="sf-landing-check__toggle">Show explanation</span>
                </summary>
                <p>
                  It is the zero-power position. Since any non-zero number raised to
                  the power of zero equals one, that place contributes one when its bit is on.
                </p>
              </details>
            </article>
          </div>
        </section>

        <section className="sf-landing-features" aria-labelledby="sf-features-title">
          <div className="sf-landing-wrap">
            <div className="sf-landing-section-heading">
              <p className="sf-landing-eyebrow">Your study space</p>
              <h2 id="sf-features-title">Everything has a place.</h2>
            </div>
            <div className="sf-landing-feature-grid">
              <article className="sf-landing-feature">
                <span className="sf-landing-feature__icon"><BookOpen size={20} aria-hidden="true" /></span>
                <h3>Lessons with a clear thread</h3>
                <p>Move from the first idea to a worked example without skipping the steps in between.</p>
              </article>
              <article className="sf-landing-feature">
                <span className="sf-landing-feature__icon"><Target size={20} aria-hidden="true" /></span>
                <h3>Progress you can pick up</h3>
                <p>Keep track of what you have covered and return to the topics you want to strengthen.</p>
              </article>
              <article className="sf-landing-feature">
                <span className="sf-landing-feature__icon"><Layers size={20} aria-hidden="true" /></span>
                <h3>Notes, separate and ready</h3>
                <p>Open structured notes whenever you need a calm reference beside your learning.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="sf-landing-courses" id="courses" aria-labelledby="sf-courses-title">
          <div className="sf-landing-wrap sf-landing-courses__inner">
            <div className="sf-landing-section-heading">
              <p className="sf-landing-eyebrow">Made for your semester</p>
              <h2 id="sf-courses-title">Your courses, ready to explore.</h2>
            </div>
            <div className="sf-landing-course-list">
              {courses.map((course) => (
                <div className="sf-landing-course" key={course.code}>
                  <span className="sf-landing-course__code">{course.code}</span>
                  <span className="sf-landing-course__title">{course.title}</span>
                  <span className="sf-landing-course__topics">{course.topics}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sf-landing-cta" aria-labelledby="sf-cta-title">
          <div className="sf-landing-cta__image" aria-hidden="true" />
          <div className="sf-landing-wrap sf-landing-cta__inner">
            <div className="sf-landing-cta__copy">
              <p className="sf-landing-eyebrow">One topic at a time</p>
              <h2 id="sf-cta-title">Your next study session starts here.</h2>
              <p>Choose a course, open a lesson, and work through the next thing you want to understand.</p>
              <Link to="/register" className="sf-landing-btn sf-landing-btn--light">
                Create your account <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="sf-landing-cta__note">
              <Sparkles size={18} aria-hidden="true" />
              <span>Build understanding, not just a checklist.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="sf-landing-footer">
        <div className="sf-landing-wrap sf-landing-footer__inner">
          <Brand />
          <span>{getFullInstitutionLabel()}</span>
          <span>{APP_CONFIG.app.tagline}</span>
        </div>
      </footer>
    </div>
  )
}

export default Landing
