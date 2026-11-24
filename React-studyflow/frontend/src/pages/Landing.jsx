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
  Heart,
  Lightbulb,
  PlayCircle,
  Sparkles,
  Target,
} from '../components/ui/Icons'
import { SiDiscord, SiGithub, SiX, SiYoutube } from 'react-icons/si'
import './Landing.css'

const features = [
  { title: 'My Courses', description: 'Access your courses anytime', icon: BookOpen },
  { title: 'Notes', description: 'Save and manage your study notes', icon: FileText },
  { title: 'AI Tutor', description: "Get help whenever you're stuck", icon: Brain },
  { title: 'Study Planner', description: 'Plan your study schedule', icon: Calendar },
  { title: 'Progress Tracker', description: 'See your improvement', icon: Target },
  { title: 'Smart Recommendations', description: 'Find what you need to learn', icon: Sparkles },
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
            <p>Understand the building blocks of logical statements.</p>
          </div>
          <div className="sf-landing-lesson__progress-wrap">
            <span className="sf-landing-lesson__progress-label">Your progress <strong>45%</strong></span>
            <div className="sf-landing-lesson__progress"><span /></div>
          </div>
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
            <a href="#features">Courses</a>
            <a href="#features">Features</a>
            <a href="#learning">About</a>
            <a href="#contact">Contact</a>
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
                Smarter Learning. Better Results.
              </p>
              <h1 id="sf-landing-title">
                Learn Smarter.<br />
                Not <span>Harder.</span>
              </h1>
              <p className="sf-landing-lede">
                StudyFlow is an adaptive learning platform that teaches you, tests your
                understanding, and helps you study more effectively.
              </p>
              <div className="sf-landing-actions">
                <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
                  Start Learning <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#learning" className="sf-landing-demo-link">
                  <PlayCircle size={34} aria-hidden="true" />
                  Watch Demo
                </a>
              </div>
            </div>

            <nav className="sf-landing-quick-links" aria-label="StudyFlow learning tools">
              <a href="#learning"><BookOpen aria-hidden="true" /><span>Adaptive<br />Learning Path</span></a>
              <a href="#features"><Brain aria-hidden="true" /><span>AI Tutor<br />(Ask &amp; Learn)</span></a>
              <a href="#features"><FileText aria-hidden="true" /><span>Organised<br />Notes</span></a>
              <a href="#features"><Target aria-hidden="true" /><span>Track Your<br />Progress</span></a>
              <a href="#features"><Calendar aria-hidden="true" /><span>Plan Your<br />Studies</span></a>
            </nav>
          </div>
        </section>

        <section className="sf-landing-learning" id="learning" aria-labelledby="sf-learning-title">
          <div className="sf-landing-wrap sf-landing-learning__grid">
            <LandingLessonPreview />

            <div className="sf-landing-learning__copy">
              <p className="sf-landing-eyebrow">III &nbsp; ADAPTIVE LEARNING</p>
              <h2 id="sf-learning-title">A Learning Experience That Adapts to You</h2>
              <p>
                Get more than just questions. StudyFlow introduces concepts, asks
                follow-up questions based on your responses, and fills your knowledge
                gaps — step by step.
              </p>
              <ul className="sf-landing-benefits">
                <li><CheckCircle size={18} aria-hidden="true" /> Interactive lessons, not just quizzes</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Personalised learning path</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Instant explanations</li>
                <li><CheckCircle size={18} aria-hidden="true" /> Track what you understand</li>
              </ul>
              <a className="sf-landing-text-link" href="#features">
                Explore How It Works <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="sf-landing-features" id="features" aria-labelledby="sf-features-title">
          <div className="sf-landing-wrap sf-landing-features__grid">
            <div className="sf-landing-features__intro">
              <p className="sf-landing-eyebrow">III &nbsp; MORE THAN A STUDY APP</p>
              <h2 id="sf-features-title">Everything You Need for Academic Success</h2>
              <p>
                From organised notes to AI-powered tutoring, StudyFlow gives you the
                tools to stay focused and achieve more.
              </p>
              <Link to="/register" className="sf-landing-btn sf-landing-btn--outline">
                Discover All Features <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="sf-landing-feature-grid">
              {features.map(({ title, description, icon: Icon }) => (
                <article className="sf-landing-feature" key={title}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
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
              <h2 id="sf-cta-title">Ready to transform your study journey?</h2>
              <p>Join thousands of students already using StudyFlow.</p>
            </div>
            <Link to="/register" className="sf-landing-btn sf-landing-btn--primary">
              Get Started Free <ArrowRight size={16} aria-hidden="true" />
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
            <a href="#features">Courses</a>
            <a href="#learning">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="sf-landing-footer__socials" aria-hidden="true">
            <SiGithub />
            <SiYoutube />
            <SiDiscord />
            <SiX />
          </div>
        </div>
        <div className="sf-landing-wrap sf-landing-footer__bottom">
          <span>© {currentYear} StudyFlow. All rights reserved.</span>
          <span>Built for a smarter tomorrow <Heart size={13} aria-hidden="true" /></span>
        </div>
      </footer>
    </div>
  )
}

export default Landing
