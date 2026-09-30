import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    addToast,
    setIsCheckoutOpen
  } = useStore();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛍</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
              Your Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '16px' }}>✦</p>
              <h4 style={{ color: 'var(--cream)', marginBottom: '8px' }}>Your shopping bag is empty</h4>
              <p style={{ fontSize: '0.88rem', marginBottom: '24px' }}>
                Discover our signature handcrafted collection and elevate your wardrobe.
              </p>
              <Link
                to="/shop"
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4 style={{ fontSize: '1rem', color: 'var(--cream)', marginBottom: '4px' }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px' }}>
                    Color: {item.color}
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--cream)', marginBottom: '10px' }}>
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, -1)}
                        style={{ padding: '2px 10px', background: 'rgba(255,255,255,0.05)', color: 'var(--cream)' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '2px 12px', fontSize: '0.85rem' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, 1)}
                        style={{ padding: '2px 10px', background: 'rgba(255,255,255,0.05)', color: 'var(--cream)' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.color)}
                      style={{ fontSize: '0.78rem', color: 'var(--danger)' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span>White-Glove Shipping</span>
              <span style={{ color: 'var(--success)' }}>COMPLIMENTARY</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream)' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--gold)' }}>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleCheckout}
            >
              VIP Secure Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
