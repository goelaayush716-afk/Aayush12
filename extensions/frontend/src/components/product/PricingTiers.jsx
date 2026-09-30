import React from 'react';
import { pricingTiers } from '../../data/products';

export const PricingTiers = () => {
  return (
    <section className="section-pad" style={{ background: '#0a0a0f', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Investment & Value</span>
          <h2 className="section-title">Premium Editions Overview</h2>
          <div className="gold-divider" />
        </div>

        <div className="pricing-tiers-grid">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`pricing-card ${tier.featured ? 'featured' : ''}`}
            >
              <h3 className="pricing-tier-name">{tier.name}</h3>
              <p className="pricing-tier-cost">{tier.priceRange}</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
