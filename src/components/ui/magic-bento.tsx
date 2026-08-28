import type { CSSProperties, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './magic-bento.css';

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '138, 5, 190';
const MOBILE_BREAKPOINT = 768;

type MagicBentoItem = {
  title: string;
  label?: string;
  description?: string;
  meta?: string;
  tone?: 'default' | 'feature' | 'ghost';
};

type MagicBentoProps = {
  items: MagicBentoItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  className?: string;
};

function createParticleElement(x: number, y: number, color = DEFAULT_GLOW_COLOR) {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.background = `rgba(${color}, 1)`;
  el.style.boxShadow = `0 0 10px rgba(${color}, 0.5)`;
  return el;
}

function calculateSpotlightValues(radius: number) {
  return {
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
  };
}

function updateCardGlowProperties(
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
}

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function AnimatedCard({
  item,
  className,
  disableAnimations,
  particleCount,
  glowColor,
  enableTilt,
  clickEffect,
  enableMagnetism,
}: {
  item: MagicBentoItem;
  className: string;
  disableAnimations: boolean;
  particleCount: number;
  glowColor: string;
  enableTilt: boolean;
  clickEffect: boolean;
  enableMagnetism: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const hoveredRef = useRef(false);
  const magnetismTweenRef = useRef<gsap.core.Tween | null>(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
    magnetismTweenRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.24,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    });

    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || disableAnimations) {
      return;
    }

    const spawnParticles = () => {
      const { width, height } = element.getBoundingClientRect();

      Array.from({ length: particleCount }).forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          if (!hoveredRef.current) {
            return;
          }

          const particle = createParticleElement(
            Math.random() * width,
            Math.random() * height,
            glowColor
          );

          element.appendChild(particle);
          particlesRef.current.push(particle);

          gsap.fromTo(
            particle,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
          );

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 70,
            y: (Math.random() - 0.5) * 70,
            duration: 1.8 + Math.random() * 1.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });

          gsap.to(particle, {
            opacity: 0.2,
            duration: 1.1,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          });
        }, index * 90);

        timeoutsRef.current.push(timeoutId);
      });
    };

    const handleMouseEnter = () => {
      hoveredRef.current = true;
      spawnParticles();
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.28,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      hoveredRef.current = false;
      clearAllParticles();

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.28,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.12,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        magnetismTweenRef.current?.kill();
        magnetismTweenRef.current = gsap.to(element, {
          x: (x - centerX) * 0.03,
          y: (y - centerY) * 0.03,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!clickEffect) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      ripple.style.borderRadius = '999px';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '4';
      ripple.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.32) 0%, rgba(${glowColor}, 0.12) 30%, transparent 70%)`;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      hoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [
    clearAllParticles,
    clickEffect,
    disableAnimations,
    enableMagnetism,
    enableTilt,
    glowColor,
    particleCount,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ['--glow-color' as string]: glowColor } as CSSProperties}
    >
      <div className="magic-bento-card__header">
        <div className="magic-bento-card__label">{item.label}</div>
        {item.meta ? <div className="magic-bento-card__meta">{item.meta}</div> : null}
      </div>
      <div className="magic-bento-card__content">
        <h3 className="magic-bento-card__title">{item.title}</h3>
        {item.description ? (
          <p className="magic-bento-card__description">{item.description}</p>
        ) : null}
      </div>
    </div>
  );
}

function GlobalSpotlight({
  gridRef,
  enabled,
  spotlightRadius,
  glowColor,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  spotlightRadius: number;
  glowColor: string;
}) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !gridRef.current) {
      return;
    }

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.position = 'fixed';
    spotlight.style.width = '720px';
    spotlight.style.height = '720px';
    spotlight.style.borderRadius = '999px';
    spotlight.style.opacity = '0';
    spotlight.style.transform = 'translate(-50%, -50%)';
    spotlight.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.14) 0%, rgba(${glowColor}, 0.08) 18%, rgba(${glowColor}, 0.03) 38%, transparent 68%)`;
    spotlight.style.zIndex = '2';

    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (event: MouseEvent) => {
      const grid = gridRef.current;
      const activeSpotlight = spotlightRef.current;
      if (!grid || !activeSpotlight) {
        return;
      }

      const section = grid.closest('.magic-bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const cards = Array.from(grid.querySelectorAll<HTMLElement>('.magic-bento-card'));

      if (!mouseInside) {
        gsap.to(activeSpotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach((card) => card.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, event.clientX, event.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(activeSpotlight, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.12,
        ease: 'power2.out',
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.9
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.9
            : 0;

      gsap.to(activeSpotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.18 : 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      const activeSpotlight = spotlightRef.current;
      if (!activeSpotlight || !gridRef.current) {
        return;
      }

      gsap.to(activeSpotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      gridRef.current
        .querySelectorAll<HTMLElement>('.magic-bento-card')
        .forEach((card) => card.style.setProperty('--glow-intensity', '0'));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.remove();
    };
  }, [enabled, glowColor, gridRef, spotlightRadius]);

  return null;
}

export function MagicBento({
  items,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className = '',
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <div className={`magic-bento-section ${className}`}>
      {enableSpotlight ? (
        <GlobalSpotlight
          gridRef={gridRef}
          enabled={!shouldDisableAnimations}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      ) : null}

      <div ref={gridRef} className="magic-bento-grid">
        {items.map((item, index) => {
          const toneClass =
            item.tone === 'feature'
              ? 'magic-bento-card--feature'
              : item.tone === 'ghost'
                ? 'magic-bento-card--ghost'
                : '';
          const textClass = textAutoHide ? 'magic-bento-card--text-autohide' : '';
          const glowClass = enableBorderGlow ? 'magic-bento-card--border-glow' : '';
          const className = `magic-bento-card ${toneClass} ${textClass} ${glowClass}`.trim();

          return (
            <AnimatedCard
              key={`${item.title}-${index}`}
              item={item}
              className={className}
              disableAnimations={!enableStars || shouldDisableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt && !shouldDisableAnimations}
              clickEffect={clickEffect && !shouldDisableAnimations}
              enableMagnetism={enableMagnetism && !shouldDisableAnimations}
            />
          );
        })}
      </div>
    </div>
  );
}
