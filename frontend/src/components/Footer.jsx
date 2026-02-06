import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div>
          <h4>Our Company</h4>
          <p>We provide smart interview scheduling solutions.</p>
          <p>Efficient. Reliable. Secure.</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hr@interviewscheduler.com</p>
        </div>

        <div>
          <h4>Location</h4>
          <p>Bangalore, India</p>
        </div>
      </div>
    </div>
  );
}
