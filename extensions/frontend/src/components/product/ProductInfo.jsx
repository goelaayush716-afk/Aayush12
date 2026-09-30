import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const ProductInfo = ({ product }) => {
  const { addToCart, addToast } = useStore();
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || 'Classic Black'
  );
  const [addCareKit, setAddCareKit] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, 1);
    if (addCareKit) {
      addToCart(
        {
          id: 'care-kit-suite',
          name: 'Luxury Leather Care Suite',
          price: 1999,
          image: '/images/craftsmanship-bag.png'
        },
        'Standard Kit',
        1
      );
    }
  };

  return (
    <div className="product-info-panel">
      <div>
        <span className="section-label">{product.category}</span>
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '2.4rem' }}>
          {product.name}
        </h1>
        <p style={{ fontStyle: 'italic', color: 'var(--gold)', marginTop: '6px' }}>
          "{product.tagline}"
        </p>
      </div>

      <div className="product-price-block">
        <span className="current-price">₹{product.price?.toLocaleString()}</span>
        {product.originalPrice && (
          <span className="original-price">₹{product.originalPrice?.toLocaleString()}</span>
        )}
        <span className="discount-tag">In Stock & Verified</span>
      </div>

      <div className="stock-indicator">
        <span className="pulse-dot" />
        <span>Atelier Handcrafted &middot; Ships Within 24 Hours</span>
      </div>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors && (
        <div style={{ marginTop: '8px' }}>
          <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
            Selected Colorway: <strong style={{ color: 'var(--cream)' }}>{selectedColor}</strong>
          </label>
          <div className="color-options">
            {product.colors.map((c) => (
              <button
                key={c.name}
                className={`color-btn ${selectedColor === c.name ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Key Specifications */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>
          Atelier Specifications
        </h4>
        <ul className="spec-list">
          {product.features?.map((f, idx) => (
            <li key={idx}>✦ {f}</li>
          ))}
        </ul>
      </div>

      {/* Dimensions */}
      {product.dimensions && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Height</span>
            <p style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{product.dimensions.height}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Width</span>
            <p style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{product.dimensions.width}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Depth</span>
            <p style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{product.dimensions.depth}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Handle</span>
            <p style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{product.dimensions.handleDrop}</p>
          </div>
        </div>
      )}

      {/* Bundle Addon */}
      <div className="bundle-box">
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '4px' }}>
            ✦ Add Luxury Leather Care Suite
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Organic balm, buffing cloth, and storage bag for ₹1,999 (save 35%).
          </p>
        </div>
        <input
          type="checkbox"
          checked={addCareKit}
          onChange={(e) => setAddCareKit(e.target.checked)}
          style={{ width: '20px', height: '20px', accentColor: 'var(--gold)', cursor: 'pointer' }}
        />
      </div>

      <button
        className="btn btn-primary"
        style={{ padding: '16px 36px', fontSize: '1rem', marginTop: '10px' }}
        onClick={handleAddToCart}
      >
        Acquire &middot; Add to Shopping Bag
      </button>
    </div>
  );
};
