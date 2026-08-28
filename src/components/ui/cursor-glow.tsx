import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { damping: 28, stiffness: 160, mass: 0.45 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 160, mass: 0.45 });
  const xSoft = useSpring(mouseX, { damping: 42, stiffness: 90, mass: 0.8 });
  const ySoft = useSpring(mouseY, { damping: 42, stiffness: 90, mass: 0.8 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      mediaQuery.removeEventListener('change', update);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <motion.div
        className="absolute size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(191,109,245,0.2),rgba(138,5,190,0.08),transparent_68%)] blur-3xl"
        style={{
          left: xSoft,
          top: ySoft,
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
        style={{
          left: x,
          top: y,
          opacity: visible ? 0.85 : 0,
          boxShadow: '0 0 24px rgba(191,109,245,0.3)',
        }}
      />
      <motion.div
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200"
        style={{
          left: x,
          top: y,
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 20px rgba(231,200,255,0.75)',
        }}
      />
    </div>
  );
}
