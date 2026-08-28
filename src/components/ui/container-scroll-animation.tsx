import React, { useEffect, useRef, useState } from 'react';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
};

export function ContainerScroll({
  titleComponent,
  children,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleRange: [number, number] = isMobile ? [0.94, 1] : [1.08, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -88]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[90rem] items-start justify-center overflow-x-clip px-4 pb-20 pt-14 md:min-h-[104rem] md:px-8 md:pb-28 md:pt-18"
    >
      <div
        className="relative w-full max-w-7xl py-8 md:py-24"
        style={{ perspective: '1200px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

type HeaderProps = {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
};

function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-6xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

type CardProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
};

function Card({ rotate, scale, children }: CardProps) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 24px 70px rgba(99, 7, 128, 0.25), 0 72px 160px rgba(12, 1, 24, 0.58)',
      }}
      className="relative mx-auto mt-2 h-[34rem] w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(32,6,51,0.96),rgba(12,2,20,0.98))] p-2 shadow-2xl md:mt-4 md:h-[48rem] md:rounded-[2.5rem] md:p-4"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.22),transparent_30%),linear-gradient(180deg,rgba(18,6,30,0.97),rgba(8,3,16,0.99))]">
        {children}
      </div>
    </motion.div>
  );
}
