import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img
          src="/images/hero-bag.png"
          alt="Luvia Luxury Handcrafted Leather Bag"
          id="heroBg"
        />
      </div>
      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-content">
          <span className="hero-label">Artisan Leather Collection 2026</span>
          <h1 className="hero-title shimmer">
            Step Into<br />Timeless Elegance
          </h1>
          <p className="hero-subtitle">
            Crafted for presence. Hand-burnished by master artisans. Designed to become an heirloom.
          </p>

          <div className="hero-buttons">
            <a href="#collection" className="btn btn-primary">
              Explore Collection
            </a>
            <Link to="/about" className="btn btn-outline">
              Our Heritage
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll Down</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};
