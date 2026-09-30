import React from 'react';

export const PackagingSection = () => {
  return (
    <section className="packaging section-pad" id="packaging">
      <div className="container">
        <div className="packaging-grid">
          <div className="packaging-content">
            <span className="section-label">The Unboxing Ritual</span>
            <h2 className="section-title">Sensory Perfection</h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
              Your acquisition arrives wrapped in our signature heavy-gauge presentation box lined with Italian velvet, sealed with wax, and protected by an organic cotton satin dustbag.
            </p>

            <div className="packaging-checklist">
              <div className="checklist-item">
                <span className="checklist-icon">✦</span>
                <span>Magnetic-closure reinforced presentation box with debossed gold foil</span>
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">✦</span>
                <span>Handcrafted satin dust protection bag with drawstrings</span>
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">✦</span>
                <span>NFC-enabled Certificate of Authenticity with lifetime registration</span>
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">✦</span>
                <span>Personalized, wax-sealed artisan thank-you card and leather care balm</span>
              </div>
            </div>
          </div>

          <div className="craft-image">
            <img
              src="/images/craftsmanship-bag.png"
              alt="Luvia Luxury Unboxing Packaging Box"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
