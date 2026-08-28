import { HTMLAttributes, ReactNode, useState } from 'react';

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glowClassName?: string;
};

export function SpotlightCard({
  children,
  className,
  glowClassName,
  onMouseMove,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const [pointer, setPointer] = useState({ x: 50, y: 50, visible: false });

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className ?? ''}`.trim()}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y, visible: true });
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        setPointer((current) => ({ ...current, visible: false }));
        onMouseLeave?.(event);
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${glowClassName ?? ''}`.trim()}
        style={{
          opacity: pointer.visible ? 1 : 0,
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(191, 109, 245, 0.22), transparent 34%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] opacity-0 transition duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
