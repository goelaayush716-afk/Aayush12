import React from 'react';

export const CraftsmanshipSection = () => {
  return (
    <section className="craftsmanship section-pad" id="craftsmanship">
      <div className="container">
        <div className="craft-grid">
          <div className="craft-image">
            <img
              src="/images/craftsmanship.png"
              alt="Master Artisan Crafting Leather Handbag"
              loading="lazy"
            />
          </div>

          <div className="craft-content">
            <span className="section-label">Artisan Provenance</span>
            <h2 className="section-title shimmer" style={{ textAlign: 'left' }}>
              Built on Purpose,<br />Driven by Craft
            </h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: '1.7' }}>
              In an era of mass production, Luvia operates on deliberate patience. Each bag passes through more than 200 distinct hand operations in our Tuscan ateliers.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              We select only top 1% full-grain hides, treated with botanical waxes and organic tannins to ensure leather that patinas with beauty across decades.
            </p>

            <div className="craft-features">
              <div className="craft-feature">
                <h4>200+ Hand Steps</h4>
                <p>Meticulously saddle-stitched with waxed linen thread for indestructible seams.</p>
              </div>
              <div className="craft-feature">
                <h4>24K Gold Hardware</h4>
                <p>Solid brass fittings electroplated in 24-karat gold with scratch-shield coating.</p>
              </div>
              <div className="craft-feature">
                <h4>Tuscan Tanneries</h4>
                <p>Environmentally conscious, slow vegetable tanning process certified in Italy.</p>
              </div>
              <div className="craft-feature">
                <h4>Heirloom Guarantee</h4>
                <p>Lifetime restoration concierge with authenticated provenance certificate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
