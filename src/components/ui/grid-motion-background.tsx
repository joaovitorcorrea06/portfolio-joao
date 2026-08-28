import { motion } from 'framer-motion';

export function GridMotionBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,5,190,0.18),transparent_28%),radial-gradient(circle_at_80%_14%,rgba(168,85,247,0.12),transparent_24%),linear-gradient(180deg,#16061f_0%,#090311_58%,#050109_100%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        animate={{ backgroundPosition: ['0px 0px', '0px 72px', '72px 144px'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.18) 72%, transparent 100%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[-12%] top-[8%] h-[28rem] rounded-full blur-3xl"
        animate={{
          x: ['-4%', '5%', '-2%'],
          y: ['0%', '6%', '-2%'],
          scale: [1, 1.08, 0.98],
        }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        style={{
          background:
            'radial-gradient(circle, rgba(125, 31, 208, 0.22), rgba(125, 31, 208, 0.04) 48%, transparent 70%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
        animate={{
          x: ['0%', '-8%', '4%'],
          y: ['0%', '-4%', '2%'],
          scale: [0.94, 1.06, 1],
        }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
        style={{
          background:
            'radial-gradient(circle, rgba(255, 92, 214, 0.14), rgba(255, 92, 214, 0.03) 52%, transparent 72%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,3,17,0)_0%,rgba(9,3,17,0.18)_34%,rgba(9,3,17,0.8)_100%)]" />
    </div>
  );
}
