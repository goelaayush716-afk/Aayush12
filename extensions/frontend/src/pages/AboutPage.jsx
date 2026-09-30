import React from 'react';
import { BrandPhilosophy } from '../components/about/BrandPhilosophy';
import { FounderVision } from '../components/about/FounderVision';
import { ArtisanCommitment } from '../components/about/ArtisanCommitment';
import { ValuesSection } from '../components/about/ValuesSection';
import { VipClubSection } from '../components/home/VipClubSection';

export const AboutPage = () => {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="about-hero">
        <div className="container">
          <span className="section-label">Our Story & Heritage</span>
          <h1 className="section-title shimmer">The Maison of Luvia</h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Where timeless Italian artisanal leather traditions merge with modern sculptural design. Founded with the conviction that quiet excellence is the ultimate luxury.
          </p>
        </div>
      </section>

      <BrandPhilosophy />
      <FounderVision />
      <ArtisanCommitment />
      <ValuesSection />
      <VipClubSection />
    </main>
  );
};
