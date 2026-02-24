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
      { threshold: 0.2 }
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
        <nav className="nav">
          <div className="nav-logo">RenderDraw</div>
          <div className="nav-links">
            <a href="#solutions">Solutions</a>
            <a href="#products">Products</a>
            <a href="#contact" className="nav-cta">Get Started</a>
          </div>
        </nav>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Visual Salesforce Solutions
          </h1>
          <p className="hero-subtitle">
            Transform your sales presentations with 3D visualization, interactive experiences, and seamless Salesforce integration
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat">
          <div className="stat-number">300%</div>
          <div className="stat-label">Faster Deal Cycles</div>
        </div>
        <div className="stat">
          <div className="stat-number">85%</div>
          <div className="stat-label">Better Engagement</div>
        </div>
        <div className="stat">
          <div className="stat-number">50+</div>
          <div className="stat-label">Enterprise Clients</div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="content-section" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="container">
          <div className="section-header">
            <h2>The Problem with Traditional Sales Presentations</h2>
            <p className="section-intro">
              Your products are complex. Your presentations shouldn't be boring.
            </p>
          </div>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">📊</div>
              <h3>Static PowerPoints</h3>
              <p>Flat slides can't showcase the depth and complexity of your products</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">💤</div>
              <h3>Lost Engagement</h3>
              <p>Prospects zone out during long presentations filled with technical specs</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔌</div>
              <h3>Disconnected Tools</h3>
              <p>CRM, analytics, and presentation tools don't talk to each other</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="content-section alt" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="container">
          <div className="section-header">
            <h2>Interactive 3D Presentations for Salesforce</h2>
            <p className="section-intro">
              Transform complex products into engaging visual experiences that close deals faster
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎨 3D Visualization</h3>
              <p>Showcase products in photorealistic 3D. Let buyers explore, rotate, and configure in real-time.</p>
            </div>
            <div className="feature-card">
              <h3>📈 Built-in Analytics</h3>
              <p>Track every view, interaction, and engagement metric. Know exactly what resonates with prospects.</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Salesforce Native</h3>
              <p>Seamless integration with Sales Cloud and CPQ. Presentations sync directly to opportunity records.</p>
            </div>
            <div className="feature-card">
              <h3>🤖 AI-Powered</h3>
              <p>Generate presentations from product data. Smart recommendations based on deal context.</p>
            </div>
            <div className="feature-card">
              <h3>📱 Works Anywhere</h3>
              <p>Desktop, mobile, or VR. Share as links or embed in emails. No downloads required.</p>
            </div>
            <div className="feature-card">
              <h3>🔄 Asset Leverage</h3>
              <p>Use existing CAD models, configurator assets, and product data. No rebuilding needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="content-section" id="products" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="container">
          <div className="section-header">
            <h2>Our Products</h2>
          </div>
          
          <div className="product-list">
            <div className="product-card featured">
              <div className="product-badge">NEW</div>
              <h3>Journeys</h3>
              <p className="product-tagline">AI-Powered Immersive Presentations</p>
              <p className="product-description">
                Turn traditional slide decks into cinematic 3D experiences. Built-in analytics track every interaction. 
                Seamlessly integrates with Salesforce CRM.
              </p>
              <ul className="product-features">
                <li>3D product visualization</li>
                <li>Interactive configurators</li>
                <li>Real-time analytics</li>
                <li>Salesforce sync</li>
              </ul>
              <button className="btn-primary">Try Journeys Free</button>
            </div>
            
            <div className="product-card">
              <h3>RenderDraw for CPQ</h3>
              <p className="product-tagline">Visual Configure-Price-Quote</p>
              <p className="product-description">
                Transform Salesforce CPQ quotes into interactive 3D experiences. 
                Let buyers visualize configurations before they buy.
              </p>
              <button className="btn-secondary">Learn More</button>
            </div>
            
            <div className="product-card">
              <h3>RenderDraw Platform</h3>
              <p className="product-tagline">Enterprise 3D Infrastructure</p>
              <p className="product-description">
                Build custom 3D applications on Salesforce. APIs, SDKs, and rendering infrastructure for developers.
              </p>
              <button className="btn-secondary">View Documentation</button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="content-section alt" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container">
          <div className="section-header">
            <h2>Who We Help</h2>
          </div>
          
          <div className="use-cases-grid">
            <div className="use-case-card">
              <h3>🏭 Manufacturing</h3>
              <p>Turn CAD models into sales tools. Help dealers and distributors present complex equipment effectively.</p>
            </div>
            <div className="use-case-card">
              <h3>🏢 Enterprise Software</h3>
              <p>Visualize abstract concepts. Make technical products accessible to non-technical buyers.</p>
            </div>
            <div className="use-case-card">
              <h3>🛋️ Furniture & Home Goods</h3>
              <p>Let buyers configure and visualize products in 3D before purchase. Reduce returns, increase confidence.</p>
            </div>
            <div className="use-case-card">
              <h3>⚙️ Industrial Equipment</h3>
              <p>Showcase machinery, components, and custom configurations. Educate buyers on complex systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="container">
          <h2>Ready to Transform Your Sales Presentations?</h2>
          <p>Join 50+ companies using RenderDraw to close deals faster with 3D visualization</p>
          <div className="cta-buttons">
            <button className="btn-primary large">Start Free Trial</button>
            <button className="btn-secondary large">Schedule Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>RenderDraw</h4>
            <p>Visual Salesforce Solutions</p>
          </div>
          <div className="footer-section">
            <h4>Products</h4>
            <a href="#journeys">Journeys</a>
            <a href="#cpq">RenderDraw for CPQ</a>
            <a href="#platform">Platform</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#docs">Documentation</a>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <a href="#blog">Blog</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#support">Support</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 RenderDraw, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
