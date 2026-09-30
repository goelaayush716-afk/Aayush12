import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { PricingTiers } from '../components/product/PricingTiers';
import { CollectionGrid } from '../components/home/CollectionGrid';

export const ProductPage = () => {
  const { products } = useStore();
  const [selectedProductId, setSelectedProductId] = useState(products?.[0]?.id || 'royal-luxe-tote');

  const activeProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  if (!activeProduct) {
    return (
      <main style={{ paddingTop: '100px', textAlign: 'center' }}>
        <p style={{ color: 'var(--cream)' }}>Curating luxury collection...</p>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="container">
        {/* Product Selector Tabs */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
          {products.map((p) => (
            <button
              key={p.id}
              className={`btn ${p.id === activeProduct.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '10px 20px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              onClick={() => setSelectedProductId(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Hero Gallery & Product Info */}
        <div className="product-hero-layout" style={{ marginBottom: '80px' }}>
          <ProductGallery product={activeProduct} />
          <ProductInfo product={activeProduct} />
        </div>
      </div>

      {/* Pricing Overview */}
      <PricingTiers />

      {/* More from Maison */}
      <div style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--border-subtle)' }}>
        <CollectionGrid />
      </div>
    </main>
  );
};
