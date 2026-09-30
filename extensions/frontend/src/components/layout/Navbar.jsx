import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export const Navbar = ({ onOpenConcierge, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen, wishlist } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-logo">
          LU<span>VIA</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <a href="/#collection">Collection</a>
          </li>
          <li>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <button
              onClick={onOpenConcierge}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '0' }}
            >
              ✦ Concierge
            </button>
          </li>
          <li>
            <button
              onClick={onOpenAdmin}
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '4px' }}
            >
              Ledger Portal
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <Link
            to="/shop"
            className="icon-button"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <span style={{ fontSize: '1rem', color: wishlist.length ? 'var(--gold)' : 'inherit' }}>
              ♥
            </span>
            {wishlist.length > 0 && (
              <span className="cart-badge" style={{ background: '#ff4d6d', color: '#fff' }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            className="icon-button"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <span style={{ fontSize: '1.1rem' }}>🛍</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
          </div>
        </div>
      </div>
    </nav>
  );
};
