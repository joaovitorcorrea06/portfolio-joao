import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

type LightPillarsProps = {
  interactive?: boolean;
};

export function LightPillars({ interactive = true }: LightPillarsProps) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.8 });

  const focalGlow = useMotionTemplate`radial-gradient(40rem 24rem at ${smoothX}% ${smoothY}%, rgba(191,109,245,0.18), transparent 68%)`;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      onMouseMove={
        interactive
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              mouseX.set(x);
              mouseY.set(y);
            }
          : undefined
      }
    >
      <motion.div className="absolute inset-0" style={{ background: focalGlow }} />

      <motion.div
        className="absolute left-[8%] top-[-15%] h-[150%] w-32 rounded-full bg-[radial-gradient(circle,rgba(191,109,245,0.38),rgba(191,109,245,0.08)_38%,transparent_70%)] blur-3xl"
        animate={{ y: [0, 18, -10, 0], x: [0, 16, -8, 0], opacity: [0.34, 0.5, 0.4, 0.34] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[38%] top-[-20%] h-[160%] w-40 rounded-full bg-[radial-gradient(circle,rgba(138,5,190,0.42),rgba(138,5,190,0.08)_34%,transparent_72%)] blur-[92px]"
        animate={{ y: [0, -26, 14, 0], opacity: [0.28, 0.44, 0.34, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[12%] top-[-12%] h-[150%] w-28 rounded-full bg-[radial-gradient(circle,rgba(215,160,255,0.34),rgba(215,160,255,0.06)_34%,transparent_72%)] blur-[84px]"
        animate={{ y: [0, 24, -18, 0], x: [0, -12, 6, 0], opacity: [0.2, 0.36, 0.26, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,3,17,0.06),rgba(9,3,17,0.38)_52%,rgba(9,3,17,0.68))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
    </div>
  );
}
