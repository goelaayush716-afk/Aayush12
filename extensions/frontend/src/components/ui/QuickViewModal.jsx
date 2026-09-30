import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal = () => {
  const { activeQuickView, setActiveQuickView, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState('');

  if (!activeQuickView) return null;

  const color = selectedColor || (activeQuickView.colors && activeQuickView.colors[0]?.name) || 'Classic';

  const handleAddToCart = () => {
    addToCart(activeQuickView, color, 1);
    setActiveQuickView(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveQuickView(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setActiveQuickView(null)}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ background: '#0e0e16', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={activeQuickView.image}
            alt={activeQuickView.name}
            style={{ maxHeight: '380px', objectFit: 'contain' }}
          />
        </div>

        <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="product-category">{activeQuickView.category}</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--cream)' }}>
            {activeQuickView.name}
          </h2>
          <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.9rem' }}>
            "{activeQuickView.tagline}"
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {activeQuickView.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', margin: '8px 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 700 }}>
              ₹{activeQuickView.price?.toLocaleString()}
            </span>
            {activeQuickView.originalPrice && (
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{activeQuickView.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {activeQuickView.colors && (
            <div>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                Select Color: <strong style={{ color: 'var(--cream)' }}>{color}</strong>
              </label>
              <div className="color-options">
                {activeQuickView.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`color-btn ${color === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {activeQuickView.features && (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              {activeQuickView.features.slice(0, 3).map((f, idx) => (
                <li key={idx}>✦ {f}</li>
              ))}
            </ul>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: '12px', width: '100%' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
