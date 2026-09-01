import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MacbookScene } from '@/scenes/MacbookScene';
import { SpecularButton } from '@/components/ui/specular-button';

gsap.registerPlugin(ScrollTrigger);

const detailCards = [
  {
    label: 'Interfaces responsivas',
    text: 'Desenvolvimento de telas com React.js e Tailwind CSS, incluindo migração de layouts legados para componentes modernos.',
  },
  {
    label: 'Integração com APIs REST',
    text: 'Consumo de dados com organização de estado assíncrono e suporte a fluxos administrativos reais no sistema.',
  },
  {
    label: 'Testes e evolução contínua',
    text: 'Aplicação de Vitest, correção de bugs e ajustes pontuais para sustentar estabilidade e crescimento do produto.',
  },
];

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const laptopRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const laptop = laptopRef.current;
    if (!section || !laptop) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(laptop, {
        rotateX: 18,
        rotateY: -18,
        y: 90,
        scale: 0.92,
        transformPerspective: 1400,
        transformOrigin: 'center center',
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 40,
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          end: 'bottom 32%',
          scrub: 1.1,
        },
      });

      timeline
        .to(laptop, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          scale: 1,
          duration: 1.4,
        })
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.18,
            duration: 0.9,
          },
          0.4
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-20 md:px-8 md:py-30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-200">
              React.js + Tailwind CSS
            </span>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl">
              Front-end orientado a clareza, manutenção e evolução contínua.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-primary-100/76 md:text-lg">
              Meu foco está na construção e manutenção de aplicações web com
              interfaces responsivas, integrações com APIs REST e base técnica
              preparada para evolução constante sem perder legibilidade.
            </p>

            <div className="mt-8 space-y-4">
              {detailCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  ref={(element) => {
                    cardsRef.current[index] = element;
                  }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-primary-200">
                    {card.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-primary-100/74 md:text-base">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* <div className="mt-8 flex flex-wrap gap-4">
              <SpecularButton href="#stack">Ver competências reais</SpecularButton>
              <SpecularButton href="#stack" variant="ghost">
                Ver o processo por trás
              </SpecularButton>
            </div> */}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(191,109,245,0.14),transparent_54%)] blur-3xl" />
            <div
              ref={laptopRef}
              className="relative mx-auto max-w-4xl [transform-style:preserve-3d]"
            >
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(32,11,47,0.96),rgba(9,3,17,0.96))] p-3 shadow-[0_50px_110px_rgba(0,0,0,0.4)] md:rounded-[2.4rem] md:p-4">
                <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#05010b]">
                  <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                    <div className="h-2 w-24 rounded-full bg-black/40" />
                  </div>
                  <div className="relative h-[22rem] md:h-[30rem]">
                    <MacbookScene />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,1,11,0.02),rgba(5,1,11,0.14))]" />
                  </div>
                </div>
              </div>

              <div className="mx-auto h-5 w-[82%] rounded-b-[2rem] bg-[linear-gradient(180deg,rgba(208,208,216,0.24),rgba(84,84,98,0.2))] shadow-[0_30px_55px_rgba(0,0,0,0.35)] md:h-6">
                <div className="mx-auto mt-1 h-1.5 w-28 rounded-full bg-black/30 md:mt-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
