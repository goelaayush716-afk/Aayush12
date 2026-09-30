import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    placeOrder
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    line1: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    paymentMethod: 'VIP Encrypted Card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.line1 || !formData.postalCode) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const customer = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: formData.line1,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        }
      };

      await placeOrder(customer, formData.paymentMethod);
    } catch (err) {
      // toast will handle notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Close Checkout"
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-label">Encrypted Checkout</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--cream)', margin: '4px 0 8px' }}>
            White-Glove Order Fulfillment
          </h2>
          <div className="gold-divider" style={{ margin: '8px auto 16px' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Contact Information */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              ✦ 1. Client Identity & Contact
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Lady Genevieve Vance"
                  required
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Confidential Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. genevieve@vance.com"
                  required
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
                />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Direct Concierge Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              ✦ 2. White-Glove Delivery Destination
            </h4>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Street Address / Residence *
              </label>
              <input
                type="text"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
                placeholder="Penthouse Suite, 42 Altamount Road"
                required
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="400026"
                  required
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              ✦ 3. Payment Protocol
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { id: 'VIP Encrypted Card', label: '💳 VIP Encrypted Card / Amex' },
                { id: 'UPI / NetBanking', label: '⚡ Instant UPI / NetBanking' },
                { id: 'Concierge Bank Wire', label: '🏛 Private Bank Wire' },
                { id: 'Cash On White-Glove Delivery', label: '📦 White-Glove COD' }
              ].map((method) => (
                <label
                  key={method.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '4px',
                    border: formData.paymentMethod === method.id ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                    background: formData.paymentMethod === method.id ? 'rgba(212,175,55,0.08)' : 'rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    color: 'var(--cream)'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Items in Order: {cart.length}</span>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' }}>
                Total: ₹{cartTotal.toLocaleString()}
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              {isSubmitting ? 'Confirming with Maison...' : 'Authorize & Acquire'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
