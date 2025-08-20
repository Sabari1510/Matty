import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Animated Background Elements */}
      <div className="landing-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-orb bg-orb-4"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-text">DesignAI</span>
          </div>
          <div className="nav-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="btn-nav-secondary"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-nav-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Create Stunning
            <span className="hero-highlight"> Designs with AI</span>
          </h1>
          <p className="hero-subtitle">
            Transform your ideas into professional designs instantly. Our AI-powered platform combines creativity with technology to help you create amazing visuals, logos, and graphics.
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => navigate('/signup')}
              className="btn-hero-primary"
            >
              Start Creating Free
            </button>
            <button className="btn-hero-secondary">
              Watch Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Designs Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose DesignAI?
            </h2>
            <p className="section-subtitle">
              Experience the future of design with our cutting-edge features
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">Generate professional designs in seconds with our advanced AI algorithms. No more waiting for inspiration.</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Smart Customization</h3>
              <p className="feature-description">Intelligent tools that adapt to your style and preferences. Create exactly what you envision.</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">Your designs and data are protected with enterprise-grade security. Your creativity stays private.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              How It Works
            </h2>
            <p className="section-subtitle">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Describe Your Vision</h3>
              <p className="step-description">Tell us what you want to create. Our AI understands your requirements.</p>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">AI Generates Options</h3>
              <p className="step-description">Our AI creates multiple design variations based on your input.</p>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Customize & Download</h3>
              <p className="step-description">Fine-tune your design and download in any format you need.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2 className="cta-title">
              Ready to Create Something Amazing?
            </h2>
            <p className="cta-subtitle">
              Join thousands of designers who trust DesignAI for their creative projects. Start your journey today.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-cta"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <span className="footer-brand">DesignAI</span>
          <p className="footer-copyright">
            © 2024 DesignAI. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
