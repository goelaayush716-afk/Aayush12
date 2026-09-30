import React from 'react';

export const BrandPhilosophy = () => {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="about-split">
          <div className="about-img-box">
            <img
              src="/images/craftsmanship-bag.png"
              alt="Artisan crafting bespoke leather bag"
              loading="lazy"
            />
          </div>

          <div>
            <span className="section-label">Brand Philosophy</span>
            <h2 className="section-title shimmer" style={{ textAlign: 'left' }}>
              Built on Purpose,<br />Driven by Craft
            </h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '18px' }}>
              Luvia was born from a singular philosophy: what you carry defines how you move through the world. Every silhouette we create is a quiet declaration of confidence—precision-engineered, hand-finished, and built to outlive fleeting trends.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We do not mass produce. We craft legacies. Our leathers are sourced from multi-generational family tanneries in Tuscany and Veneto. The result is an object of devotion that feels bespoke to your touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
