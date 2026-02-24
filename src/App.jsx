import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const sectionsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <h1 className="hero-title">
            Transform Your Vision
          </h1>
          <p className="hero-subtitle">
            Building the future, one pixel at a time
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M10 14L5 9h10l-5 5z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Journey Sections */}
      <section className="journey-section" data-step="1" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="journey-content">
          <div className="journey-number">01</div>
          <h2 className="journey-title">Imagine</h2>
          <p className="journey-text">
            Every great journey begins with a vision. We help you see possibilities 
            where others see limitations.
          </p>
        </div>
      </section>

      <section className="journey-section" data-step="2" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="journey-content">
          <div className="journey-number">02</div>
          <h2 className="journey-title">Create</h2>
          <p className="journey-text">
            From concept to reality, we craft experiences that resonate. 
            Every detail matters, every moment counts.
          </p>
        </div>
      </section>

      <section className="journey-section" data-step="3" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="journey-content">
          <div className="journey-number">03</div>
          <h2 className="journey-title">Elevate</h2>
          <p className="journey-text">
            Excellence isn't a destination—it's a continuous journey. 
            We're with you every step of the way.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-section">
        <div className="final-content">
          <h2 className="final-title">Ready to Begin?</h2>
          <p className="final-subtitle">Let's create something extraordinary together</p>
          <button className="cta-button">Start Your Journey</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Marshall Code Demo © 2026</p>
      </footer>
    </div>
  )
}

export default App
