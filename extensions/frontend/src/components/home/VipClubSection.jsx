import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const VipClubSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { subscribeToVip } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await subscribeToVip(email);
      setEmail('');
    } catch (err) {
      // toast in store handles notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="vip-club section-pad" id="vip-club">
      <div className="container">
        <div className="vip-card">
          <span className="section-label">Exclusive Privilege</span>
          <h2 className="section-title shimmer">Join the Inner Circle</h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.7' }}>
            Receive private allocations 48 hours prior to public release, invitations to salon exhibitions, and personalized bespoke atelier consultations.
          </p>

          <form className="vip-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="vip-input"
              placeholder="Enter your confidential email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Join Circle
            </button>
          </form>

          <div className="vip-perks">
            <span>✦ Private Salon Invites</span>
            <span>✦ 48h Drop Pre-Access</span>
            <span>✦ Bespoke Monogramming</span>
            <span>✦ Direct Concierge Line</span>
          </div>
        </div>
      </div>
    </section>
  );
};
