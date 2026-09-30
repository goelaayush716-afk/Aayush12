import React from 'react';
import { useStore } from '../../context/StoreContext';

export const Toast = () => {
  const { toasts } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>✦</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
