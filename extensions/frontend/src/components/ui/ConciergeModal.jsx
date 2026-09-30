import React, { useState } from 'react';
import { api } from '../../services/api';
import { useStore } from '../../context/StoreContext';

export const ConciergeModal = ({ isOpen, onClose }) => {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredSilhouette: 'Royal Luxe Tote (Bespoke)',
    customRequest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry(formData);
      addToast(res.message || 'Concierge request submitted successfully.', 'success');
      onClose();
    } catch (err) {
      addToast(err.message || 'Failed to submit inquiry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '560px', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <span className="section-label">Private Consultation</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--cream)', margin: '4px 0 8px' }}>
          Atelier Concierge Booking
        </h2>
        <div className="gold-divider" style={{ margin: '8px 0 18px' }} />

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.6' }}>
          Schedule a bespoke consultation with our Master Artisan to customize leather grain, 24K gold monogramming, and lining selection.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lord Sterling"
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Confidential Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. sterling@house.com"
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Preferred Silhouette
            </label>
            <select
              value={formData.preferredSilhouette}
              onChange={(e) => setFormData({ ...formData, preferredSilhouette: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(15,15,20,0.9)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px' }}
            >
              <option value="Royal Luxe Tote (Bespoke)">Royal Luxe Tote (Bespoke)</option>
              <option value="Elysian Evening Clutch (Custom Crystals)">Elysian Evening Clutch (Custom Crystals)</option>
              <option value="Artisan Monogram Satchel">Artisan Monogram Satchel</option>
              <option value="Executive Formal Brief">Executive Formal Brief</option>
              <option value="Complete Custom Trunk Commission">Complete Custom Trunk Commission</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Bespoke Request & Monogram Specifications
            </label>
            <textarea
              rows={3}
              value={formData.customRequest}
              onChange={(e) => setFormData({ ...formData, customRequest: e.target.value })}
              placeholder="Describe your desired leather grain, monogram initials, hardware plating..."
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: 'var(--cream)', borderRadius: '4px', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ marginTop: '8px', padding: '14px' }}
          >
            {isSubmitting ? 'Transmitting Request...' : 'Book Atelier Consultation'}
          </button>
        </form>
      </div>
    </div>
  );
};
