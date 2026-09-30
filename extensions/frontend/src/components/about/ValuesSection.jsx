import React from 'react';

export const ValuesSection = () => {
  return (
    <section className="section-pad" style={{ background: 'linear-gradient(180deg, var(--charcoal) 0%, #0d1a14 100%)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Pillars</span>
          <h2 className="section-title">Values That Define Us</h2>
          <div className="gold-divider" />
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-wrapper">
              <span style={{ fontSize: '1.5rem' }}>✦</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '12px' }}>
              Artisanal Devotion
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Over 200 hand-finished operations per bag. Perfection is not an accident—it is an uncompromising daily discipline.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <span style={{ fontSize: '1.5rem' }}>⚜</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '12px' }}>
              Elegance Without Noise
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              We favor subtle, sculptural forms over loud logos. Our signature hardware speaks through tactile balance and solid brass weight.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <span style={{ fontSize: '1.5rem' }}>★</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '12px' }}>
              Empowered Presence
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Designed to evoke quiet, unshakable confidence in the modern leader, creator, and icon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
