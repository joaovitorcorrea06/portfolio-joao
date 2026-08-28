import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost';
};

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function getClasses(variant: SharedProps['variant'], className?: string) {
  const base =
    'group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition duration-300';
  const tone =
    variant === 'ghost'
      ? 'border border-white/12 bg-white/5 text-white/92 backdrop-blur-xl hover:border-primary-300/60 hover:bg-white/10'
      : 'bg-primary-500 text-white shadow-[0_12px_35px_rgba(138,5,190,0.35)] hover:bg-primary-400';

  return `${base} ${tone} ${className ?? ''}`.trim();
}

function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100"
    />
  );
}

export function SpecularButton(props: AnchorProps | ButtonProps) {
  const { children, className, variant = 'primary', ...rest } = props;

  if ('href' in props && props.href) {
    return (
      <a className={getClasses(variant, className)} {...rest}>
        <Shine />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button className={getClasses(variant, className)} {...rest}>
      <Shine />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
