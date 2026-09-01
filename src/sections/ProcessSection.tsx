import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { InteractiveTechPanel } from '@/components/ui/interactive-tech-panel';
import { processSteps } from '@/data/portfolio';

const layerLabels = [
  'Entendimento',
  'Construção de interface',
  'Fluxo de dados',
  'Estabilidade',
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.55,
  });

  const panelY = useTransform(progress, [0, 1], [36, -24]);
  const glowOpacity = useTransform(progress, [0, 0.35, 1], [0.2, 0.75, 1]);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative overflow-x-clip px-4 pb-24 pt-0 md:px-8 md:pb-32 md:pt-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-24 h-[36rem] bg-[radial-gradient(circle_at_30%_20%,rgba(138,5,190,0.18),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(191,109,245,0.12),transparent_28%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div
            style={{ y: panelY }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-200">
              Como eu trabalho
            </span>

            <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-[3.65rem]">
              Processo orientado a produto, manutenção e evolução contínua.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-primary-100/75 md:text-lg">
              Meu processo parte do entendimento da necessidade e segue até a
              entrega com integração, testes e manutenção. O foco aqui é fazer
              a interface funcionar bem hoje e continuar evoluindo amanhã.
            </p>

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl md:p-7">
              <motion.div
                aria-hidden="true"
                style={{ opacity: glowOpacity }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(191,109,245,0.26),transparent_28%),radial-gradient(circle_at_74%_74%,rgba(94,234,212,0.1),transparent_24%)]"
              />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-primary-100/45">
                    Mapa de entrega
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-[-0.04em] text-white">
                    Do requisito à produção
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-primary-100/72">
                  4 frentes
                </div>
              </div>

              <InteractiveTechPanel />

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Metric label="Stack base" value="React" />
                <Metric label="Foco UI" value="Clareza" />
                <Metric label="Entrega" value="Modular" />
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[1.45rem] top-2 bottom-2 w-px rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
            <motion.div
              style={{ scaleY: progress }}
              className="absolute left-[1.4rem] top-2 bottom-2 w-[3px] origin-top rounded-full bg-[linear-gradient(180deg,#f0c9ff_0%,#bf6df5_45%,#56067a_100%)] shadow-[0_0_24px_rgba(191,109,245,0.55)]"
            />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <ProcessCard
                  key={step.id}
                  index={index}
                  step={step}
                  label={layerLabels[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
  label,
}: {
  step: (typeof processSteps)[number];
  index: number;
  label: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      whileHover={{ y: -6, rotateX: -2, rotateY: index % 2 === 0 ? 2 : -2 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative ml-10 overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl [transform-style:preserve-3d] md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,109,245,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(94,234,212,0.08),transparent_24%)] opacity-70 transition duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -left-[3.05rem] top-7 flex size-10 items-center justify-center rounded-full border border-primary-300/30 bg-primary-500/18 text-xs font-semibold tracking-[0.18em] text-primary-100 shadow-[0_0_30px_rgba(191,109,245,0.25)]">
        {step.id}
      </div>
      <div className="pointer-events-none absolute -left-[1.95rem] top-[3.9rem] size-4 rounded-full border border-white/10 bg-primary-400 shadow-[0_0_24px_rgba(191,109,245,0.75)]" />

      <div className="relative z-10 grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-primary-100/46">
            {label}
          </p>
          <h3 className="mt-3 font-display text-[2rem] leading-none tracking-[-0.05em] text-white md:text-[2.35rem]">
            {step.title}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            <StepPill>
              {index === 0
                ? 'Requisito'
                : index === 1
                  ? 'Responsividade'
                  : index === 2
                    ? 'APIs REST'
                    : 'Testes'}
            </StepPill>
            <StepPill>
              {index === 0
                ? 'Entendimento'
                : index === 1
                  ? 'Componentização'
                  : index === 2
                    ? 'Estado assíncrono'
                    : 'Correções'}
            </StepPill>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5">
          <p className="text-sm leading-7 text-primary-100/76 md:text-base">
            {step.description}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniBar
              widthClass={
                index === 0
                  ? 'w-[92%]'
                  : index === 1
                    ? 'w-[84%]'
                    : index === 2
                      ? 'w-[88%]'
                      : 'w-[96%]'
              }
            />
            <MiniBar
              widthClass={
                index === 0
                  ? 'w-[68%]'
                  : index === 1
                    ? 'w-[76%]'
                    : index === 2
                      ? 'w-[71%]'
                      : 'w-[82%]'
              }
            />
            <MiniBar
              widthClass={
                index === 0
                  ? 'w-[48%]'
                  : index === 1
                    ? 'w-[58%]'
                    : index === 2
                      ? 'w-[64%]'
                      : 'w-[73%]'
              }
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/10 bg-black/18 px-4 py-3">
      <p className="text-[0.64rem] uppercase tracking-[0.24em] text-primary-100/45">
        {label}
      </p>
      <p className="mt-2 font-display text-xl tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  );
}

function StepPill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-primary-100/76">
      {children}
    </span>
  );
}

function MiniBar({ widthClass }: { widthClass: string }) {
  return (
    <div className="rounded-full border border-white/8 bg-white/5 px-2 py-2">
      <div
        className={`h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(242,222,254,0.95),rgba(191,109,245,0.68),rgba(86,6,122,0.5))] ${widthClass}`.trim()}
      />
    </div>
  );
}
