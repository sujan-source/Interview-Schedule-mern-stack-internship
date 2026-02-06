import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaShieldAlt, FaChartLine, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="hero-section">
      <h1>Streamline Your Hiring <br /> <span className="highlight">Process Today</span></h1>
      <p>
        The most powerful interview scheduling system for modern teams.
        Automated slot booking, real-time analytics, and seamless virtual integrations.
      </p>

      <div className="hero-actions">
        <Link to="/signup" className="btn-primary" style={{ maxWidth: '200px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          Get Started <FaArrowRight />
        </Link>
      </div>

      <div className="features-grid">
        <div className="glass-card feature-card">
          <FaRocket className="feature-icon" />
          <h3>Automated Scheduling</h3>
          <p>Let candidates pick their own slots based on your availability.</p>
        </div>
        <div className="glass-card feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Enterprise Ready</h3>
          <p>Secure, GDPR compliant, and ready for teams of all sizes.</p>
        </div>
        <div className="glass-card feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Data Insights</h3>
          <p>Track your hiring funnel with deep analytics and reporting.</p>
        </div>
      </div>

      <style jsx>{`
        .highlight {
          background: linear-gradient(to right, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-actions { display: flex; justify-content: center; margin-bottom: 80px; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 60px; }
        .feature-card { padding: 30px; text-align: center; }
        .feature-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 20px; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
