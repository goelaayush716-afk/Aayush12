import React from 'react';

export const FounderVision = () => {
  return (
    <section className="section-pad" style={{ background: 'var(--charcoal)' }}>
      <div className="container">
        <div className="about-split reverse">
          <div className="about-img-box">
            <img
              src="/images/founder.png"
              alt="Aria Mehra, Founder & Creative Director of Luvia"
              loading="lazy"
            />
          </div>

          <div>
            <span className="section-label">Creative Direction</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              A Legacy of<br />Modern Elegance
            </h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />

            <div className="founder-quote">
              "I wanted to design pieces that speak without saying a single word. When you carry a Luvia, you are reminded of your poise, your ambition, and your enduring strength."
            </div>
            <p style={{ color: 'var(--gold)', fontWeight: 600, marginBottom: '16px' }}>
              — Aria Mehra, Founder & Creative Director
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              With over fifteen years orchestrating haute couture leather goods between Milan and Paris, Aria envisioned a house where uncompromising heritage craftsmanship meets modern functional architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
