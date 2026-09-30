import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.interactive') ||
        e.target.closest('input')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#d4af37',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          transition: 'transform 0.05s linear',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          border: '1px solid rgba(212, 175, 55, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${pos.x - (isHovered ? 24 : 14)}px, ${pos.y - (isHovered ? 24 : 14)}px, 0)`,
          transition: 'width 0.2s ease, height 0.2s ease, transform 0.15s ease-out, border-color 0.2s ease',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
        }}
      />
    </>
  );
};
