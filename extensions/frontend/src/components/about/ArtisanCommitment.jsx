import React from 'react';

export const ArtisanCommitment = () => {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="about-split">
          <div className="about-img-box">
            <img
              src="/images/designer-handbag.png"
              alt="Luvia hand-burnished luxury leather handbag"
              loading="lazy"
            />
          </div>

          <div>
            <span className="section-label">Master Craft</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Timeless Design,<br />Enduring Impact
            </h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '18px' }}>
              Every handbag undergoes rigorous scrutiny across five quality milestones before receiving its hand-stamped gold foil serial badge. We reject shortcuts—each edge is bevelled and hand-painted seven times for permanent seal.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We believe true luxury is mindful and enduring. Our leather offcuts are repurposed into bespoke small leather goods and cardholders, achieving near-zero workshop waste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
