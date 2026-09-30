import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

export const CollectionGrid = () => {
  const { products, setActiveQuickView, addToCart, wishlist, toggleWishlist } = useStore();

  return (
    <section className="section-pad" id="collection">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Curated Selection</span>
          <h2 className="section-title">The Signature Collection</h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Each silhouette embodies architectural proportion, precision hardware, and generational leather traditions.
          </p>
        </div>

        <div className="collection-grid">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div key={product.id} className="product-card">
                {product.tag && <span className="product-card-badge">{product.tag}</span>}

                <div className="product-card-img">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-card-overlay">
                    <button
                      className="btn btn-primary"
                      style={{ padding: '10px 18px', fontSize: '0.78rem' }}
                      onClick={() => setActiveQuickView(product)}
                    >
                      Quick View
                    </button>
                    <button
                      className="icon-button"
                      style={{ background: 'rgba(0,0,0,0.6)', borderColor: isWishlisted ? 'var(--danger)' : 'var(--border-subtle)' }}
                      onClick={() => toggleWishlist(product.id)}
                      title="Add to Wishlist"
                    >
                      <span style={{ color: isWishlisted ? 'var(--danger)' : '#fff' }}>♥</span>
                    </button>
                  </div>
                </div>

                <div className="product-card-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.tagline}</p>

                  <div className="product-card-bottom">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    <Link
                      to={`/shop`}
                      className="btn btn-outline"
                      style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
