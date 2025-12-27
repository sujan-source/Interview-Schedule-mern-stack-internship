import React from 'react';

export default function Home() {
  return (
    <div className="container" style={{ textAlign: "left", maxWidth: "800px" }}>
      <h2>About Us</h2>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>

        <div>
          <h3>🏆 Achievements</h3>
          <p>
            Over the past decade, we have successfully streamlined the hiring process for over
            500+ companies, reducing interview scheduling time by 60%. We were awarded the
            "Best HR Tech Solution" in 2024.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>

        <div>
          <h3 style={{ marginTop: "0" }}>📜 Policies</h3>
          <p>
            We believe in transparency and fairness. Our platform ensures that every candidate
            gets an equal opportunity, with unbiased scheduling algorithms and strict data privacy
            compliance (GDPR & ISO 27001).
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>

        <div>
          <h3 style={{ marginTop: "0" }}>🎯 Goals</h3>
          <p>
            Our goal is to reach 1 million successful interviews by 2026. We aim to integrate
            AI-driven insights to help recruiters make data-backed hiring decisions while ensuring
            a seamless experience for candidates.
          </p>
        </div>
      </div>
    </div>
  );
}
