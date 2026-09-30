import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const AdminPortalModal = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [hRes, sRes, oRes, subRes, inqRes] = await Promise.allSettled([
        api.checkHealth(),
        api.getAdminStats(),
        api.getOrders(),
        api.getSubscribers(),
        api.submitInquiry ? api.getOrders() : Promise.resolve({})
      ]);

      if (hRes.status === 'fulfilled') setHealth(hRes.value);
      if (sRes.status === 'fulfilled' && sRes.value?.data) setStats(sRes.value.data);
      if (oRes.status === 'fulfilled' && oRes.value?.data) setOrders(oRes.value.data);
      if (subRes.status === 'fulfilled' && subRes.value?.data) setSubscribers(subRes.value.data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span className="section-label">System Management</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--cream)', margin: '4px 0' }}>
              Maison de Luvia &middot; Backend Portal
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: health?.status === 'healthy' ? 'var(--success)' : 'var(--danger)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--cream)' }}>
              Backend: {health?.status === 'healthy' ? 'Online (Port 5000)' : 'Offline / Reconnecting'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px' }}>
          {['overview', 'orders', 'subscribers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '8px 18px', fontSize: '0.8rem', textTransform: 'capitalize' }}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={loadData}
            className="btn btn-outline"
            style={{ marginLeft: 'auto', padding: '8px 14px', fontSize: '0.8rem' }}
            title="Refresh Data"
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading ledger data from backend...
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div>
                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
                  <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Revenue</span>
                    <h3 style={{ color: 'var(--gold)', fontSize: '1.4rem', marginTop: '6px' }}>
                      ₹{stats?.summary?.totalRevenue?.toLocaleString() || '0'}
                    </h3>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Orders Logged</span>
                    <h3 style={{ color: 'var(--cream)', fontSize: '1.4rem', marginTop: '6px' }}>
                      {stats?.summary?.totalOrders || 0}
                    </h3>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>VIP Subscribers</span>
                    <h3 style={{ color: 'var(--cream)', fontSize: '1.4rem', marginTop: '6px' }}>
                      {stats?.summary?.totalSubscribers || 0}
                    </h3>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Products in Catalog</span>
                    <h3 style={{ color: 'var(--cream)', fontSize: '1.4rem', marginTop: '6px' }}>
                      {stats?.summary?.totalProducts || 0}
                    </h3>
                  </div>
                </div>

                <h4 style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '14px' }}>
                  ✦ Recent Atelier Orders
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {orders.slice(0, 3).map((o) => (
                    <div key={o.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--gold)' }}>{o.id}</strong> &middot; <span style={{ color: 'var(--cream)' }}>{o.customer?.fullName}</span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {o.items?.length} item(s) &middot; {o.customer?.address?.city || 'India'} &middot; {new Date(o.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 600 }}>₹{o.total?.toLocaleString()}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>{o.orderStatus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h4 style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '14px' }}>
                  ✦ All Orders Ledger ({orders.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.map((o) => (
                    <div key={o.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <strong style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>{o.id}</strong>
                          <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(o.createdAt).toLocaleString()}</span>
                        </div>
                        <span style={{ background: 'rgba(46,204,113,0.15)', color: 'var(--success)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                          {o.orderStatus}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--cream)', marginBottom: '8px' }}>
                        Client: <strong>{o.customer?.fullName}</strong> ({o.customer?.email}) | {o.customer?.phone}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Address: {o.customer?.address?.line1}, {o.customer?.address?.city}, {o.customer?.address?.state} {o.customer?.address?.postalCode}
                      </div>
                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Items: {o.items?.map((i) => `${i.name} (${i.color}) x${i.quantity}`).join(', ')}</span>
                        <strong style={{ color: 'var(--gold)' }}>₹{o.total?.toLocaleString()}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'subscribers' && (
              <div>
                <h4 style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '14px' }}>
                  ✦ VIP Inner Circle Members ({subscribers.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subscribers.map((sub) => (
                    <div key={sub.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>✦ {sub.email}</span>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{sub.tier || 'Inner Circle'}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(sub.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
