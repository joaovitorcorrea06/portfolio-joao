import type { CSSProperties, ReactNode } from 'react';
import './orbit-border-glow.css';

type OrbitBorderGlowProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
};

export function OrbitBorderGlow({
  children,
  className = '',
  glowColor = '138, 5, 190',
  duration = 5.5,
}: OrbitBorderGlowProps) {
  return (
    <div
      className={`orbit-border-glow ${className}`.trim()}
      style={
        {
          ['--orbit-glow-rgb' as string]: glowColor,
          ['--orbit-duration' as string]: `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
