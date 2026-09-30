import React from 'react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessModal = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, latestOrder } = useStore();

  if (!isOrderSuccessOpen || !latestOrder) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOrderSuccessOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '600px', textAlign: 'center', padding: '40px 32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'var(--gold)' }}>
          ✦
        </div>
        <span className="section-label">Acquisition Confirmed</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', margin: '8px 0' }}>
          Thank You, {latestOrder.customer?.fullName}
        </h2>
        <div className="gold-divider" style={{ margin: '12px auto 20px' }} />

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '24px' }}>
          Your order has been registered in the Maison de Luvia ledger. Our master artisans are preparing your selection for complimentary white-glove dispatch.
        </p>

        <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '20px', textAlign: 'left', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Order Reference</span>
            <strong style={{ color: 'var(--gold)', letterSpacing: '1px' }}>{latestOrder.id}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Fulfillment Status</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>{latestOrder.orderStatus}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estimated Dispatch</span>
            <span style={{ color: 'var(--cream)' }}>{latestOrder.estimatedDelivery}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--cream)' }}>Total Amount Paid</span>
            <strong style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>₹{latestOrder.total?.toLocaleString()}</strong>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px 28px' }}
          onClick={() => setIsOrderSuccessOpen(false)}
        >
          Return to Salon Collection
        </button>
      </div>
    </div>
  );
};
