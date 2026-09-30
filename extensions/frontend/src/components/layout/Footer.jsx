import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              LU<span>VIA</span>
            </Link>
            <p>
              Timeless luxury crafted for modern elegance. Every bag is an uncompromising promise of artistry, endurance, and quiet presence.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.88rem' }}>
              "Carry Confidence."
            </p>
          </div>

          <div className="footer-col">
            <h4>Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop">Designer Handbags</Link></li>
              <li><Link to="/shop">Evening Clutches</Link></li>
              <li><Link to="/shop">Luxury Tote Bags</Link></li>
              <li><Link to="/shop">Limited Collector Drop</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Heritage</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Luvia</Link></li>
              <li><Link to="/about">Artisan Tanneries</Link></li>
              <li><Link to="/about">Founder’s Vision</Link></li>
              <li><a href="#limited-section">Serial Number Authentication</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Client Care</h4>
            <ul className="footer-links">
              <li><a href="mailto:concierge@luvia.luxury">Private Concierge</a></li>
              <li><a href="#packaging">Complimentary Shipping</a></li>
              <li><a href="#packaging">White-Glove Delivery</a></li>
              <li><a href="#vip-club">VIP Membership</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LUVIA Luxury Maison. All rights reserved. Handcrafted in Italy & France.</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>Pinterest</a>
            <a href="https://vogue.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>Editorial</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
