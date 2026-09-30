import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export const LimitedEditionSection = () => {
  const { addToast } = useStore();
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleReserve = () => {
    addToast('Your VIP Allocation Request has been submitted to Private Concierge.', 'success');
  };

  return (
    <section className="limited-edition section-pad" id="limited-section">
      <div className="container">
        <div className="limited-grid">
          <div className="limited-image">
            <img
              src="/images/limited-edition-bag.png"
              alt="Limited Edition Royal Collector Piece"
              loading="lazy"
            />
          </div>

          <div className="limited-content">
            <span className="section-label">Strictly Numbered Drop</span>
            <h2 className="section-title shimmer" style={{ textAlign: 'left' }}>
              The Imperial Royal Edition
            </h2>
            <div className="gold-divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
              Only 100 individually numbered specimens will ever be produced worldwide. Features 24K brushed rose-gold lock hardware, hand-embossed certificate of royal lineage, and a bespoke monogram medallion.
            </p>

            <div className="countdown-box">
              <div className="countdown-item">
                <div className="countdown-val">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="countdown-unit">Days</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-val">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="countdown-unit">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-val">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="countdown-unit">Minutes</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-val">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="countdown-unit">Seconds</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleReserve}>
                Reserve Allocation
              </button>
              <Link to="/shop" className="btn btn-outline">
                View Specifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
