import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { CtaSignalScene } from '@/components/ui/cta-signal-scene';
import { LightPillars } from '@/components/ui/light-pillars';
import { OrbitBorderGlow } from '@/components/ui/orbit-border-glow';
import { SpecularButton } from '@/components/ui/specular-button';
import SplitFlapText from '@/components/ui/split-flap-text';

const orbitTags = [
  { label: 'React', className: 'left-[8%] top-[18%]' },
  { label: 'GSAP', className: 'right-[10%] top-[15%]' },
  { label: 'Three.js', className: 'left-[10%] bottom-[20%]' },
  { label: 'Motion', className: 'right-[8%] bottom-[16%]' },
  { label: 'Conversion', className: 'left-[24%] top-[8%]' },
  { label: 'Premium UI', className: 'right-[24%] bottom-[8%]' },
];

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const tagRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const floatingTags = tagRefs.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      floatingTags.forEach((tag, index) => {
        gsap.set(tag, { y: index % 2 === 0 ? -8 : 8 });
        gsap.to(tag, {
          y: index % 2 === 0 ? 10 : -10,
          x: index % 3 === 0 ? 8 : -8,
          duration: 2.8 + index * 0.25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.fromTo(
        '.final-cta-reveal',
        { opacity: 0, y: 28, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 pb-24 pt-18 md:px-8 md:pb-32 md:pt-24"
    >
      <LightPillars />

      <div className="mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-[2.7rem] border border-primary-300/18 bg-[linear-gradient(180deg,rgba(17,5,28,0.72),rgba(6,2,12,0.92))] px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,125,255,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(125,211,252,0.08),transparent_20%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:92px_92px]" />

          <div className="pointer-events-none absolute inset-0 opacity-90">
            <CtaSignalScene />
          </div>

          {orbitTags.map((tag, index) => (
            <div
              key={tag.label}
              ref={(node) => {
                tagRefs.current[index] = node;
              }}
              className={`final-cta-reveal pointer-events-none absolute hidden rounded-full border border-white/12 bg-black/26 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-primary-100/74 backdrop-blur-xl lg:block ${tag.className}`}
            >
              {tag.label}
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-[2.3rem] border border-white/12 bg-[linear-gradient(180deg,rgba(26,10,38,0.4),rgba(14,6,22,0.24))] px-6 py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-10 md:py-12 lg:px-14 lg:py-14">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
                <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

                <div className="relative z-10">
                  <div className="final-cta-reveal">
                    <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-100/88 backdrop-blur-md">
                      Final CTA
                    </span>
                  </div>

                  <div className="final-cta-reveal mt-6 flex justify-center">
                    <SplitFlapText
                      words={['BUILD', 'IMPACT', 'CLICK', 'LAUNCH']}
                      flipDuration={0.08}
                      stagger={0.03}
                      cycleDelay={1600}
                      flipsPerChar={4}
                      charset="alpha"
                      tileColor="#12071c"
                      textColor="#f8f1ff"
                      tileRadius={12}
                      gap={5}
                      fontSize={18}
                      padTo={7}
                    />
                  </div>

                  <h2 className="final-cta-reveal mt-8 font-display text-4xl leading-[0.94] tracking-[-0.07em] text-white sm:text-5xl md:text-7xl">
                    Vamos construir uma página
                    <span className="block bg-[linear-gradient(180deg,#f8f1ff_10%,#d39cfb_58%,#8a05be_100%)] bg-clip-text text-transparent">
                      impossível de ignorar.
                    </span>
                  </h2>

                  <p className="final-cta-reveal mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-100/80 md:text-lg">
                    Estratégia, visual, motion, frontend e camadas interativas pensadas
                    para fazer o cliente parar, explorar e clicar.
                  </p>

                  <div className="final-cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
                    <OrbitBorderGlow duration={4.2} glowColor="191, 109, 245" className="rounded-full">
                      <SpecularButton
                        href="#contact"
                        className="min-w-[17rem] px-8 py-4 text-base shadow-[0_18px_48px_rgba(138,5,190,0.45)]"
                      >
                        Quero um projeto nesse nível
                      </SpecularButton>
                    </OrbitBorderGlow>

                    <OrbitBorderGlow duration={6.1} glowColor="125, 211, 252" className="rounded-full">
                      <SpecularButton
                        href="#case-study"
                        variant="ghost"
                        className="min-w-[16rem] px-8 py-4 text-base"
                      >
                        Rever cases e interações
                      </SpecularButton>
                    </OrbitBorderGlow>
                  </div>
                </div>
              </div>

              <div className="final-cta-reveal mt-10 grid gap-4 md:grid-cols-3">
                <SignalTile title="LPs premium" description="com presença comercial real" />
                <SignalTile title="Motion systems" description="para dirigir leitura e foco" />
                <SignalTile title="3D + automação" description="para impressionar sem virar gimmick" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SignalTile({ title, description }: { title: string; description: string }) {
  return (
    <OrbitBorderGlow duration={5.8} glowColor="138, 5, 190" className="rounded-[1.5rem]">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 text-left backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,109,245,0.12),transparent_34%)]" />
        <div className="relative z-10">
          <p className="font-display text-2xl tracking-[-0.05em] text-white">{title}</p>
          <p className="mt-2 text-sm leading-6 text-primary-100/70">{description}</p>
        </div>
      </div>
    </OrbitBorderGlow>
  );
}
