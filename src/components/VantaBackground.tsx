import React, { useEffect, forwardRef } from 'react';

interface VantaBackgroundProps {
  children?: React.ReactNode;
}

declare global {
  interface Window {
    VANTA: any;
  }
}

const VantaBackground = forwardRef<HTMLDivElement, VantaBackgroundProps>((props, ref) => {
  useEffect(() => {
    if (window.VANTA && ref && 'current' in ref) {
      const vantaEffect = window.VANTA.BIRDS({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color1: 0xffea00,
        color2: 0x2fff
      });

      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }
  }, [ref]);

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      {props.children}
    </div>
  );
});

VantaBackground.displayName = 'VantaBackground';

export default VantaBackground; 