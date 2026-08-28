import { motion } from 'framer-motion';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { OrbitalSphereBackground } from '@/components/ui/orbital-sphere';
import SplitFlapText from '@/components/ui/split-flap-text';

const metrics = [
  { value: 'Front', label: 'interfaces refinadas com foco em produto e conversão' },
  { value: 'Motion', label: 'animação, ritmo visual e interação com propósito' },
  { value: '3D', label: 'cenas e experiências para elevar percepção de valor' },
];

const cards = [
  {
    title: 'Product-Led UI',
    description:
      'Projetos guiados por clareza de oferta, hierarquia de conteúdo e leitura rápida de valor.',
  },
  {
    title: 'Motion Systems',
    description:
      'GSAP, Framer Motion e transições desenhadas para criar ritmo sem distrair da mensagem.',
  },
  {
    title: 'Frontend Engineering',
    description:
      'Código modular, componentização limpa e base pronta para evoluir features densas com controle.',
  },
  {
    title: 'Interactive Layers',
    description:
      '3D, efeitos visuais e superfícies digitais usados como parte da narrativa, não como ornamento.',
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-x-clip bg-background pt-0">
      <HeroBackground />
      <ContainerScroll
        titleComponent={
          <div className="space-y-7 px-2 pt-0 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mx-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-[0.18em] text-primary-200 backdrop-blur-xl"
            >
              <span className="size-2 rounded-full bg-primary-400 shadow-[0_0_18px_rgba(192,132,252,0.95)]" />
              DEVELOPER CASE STUDY
            </motion.div>

            <div className="mx-auto max-w-5xl space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.08, ease: 'easeOut' }}
                className="font-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-[4.85rem] xl:text-[5.15rem]"
              >
                Creative developer
                <span className="mt-1 block bg-[linear-gradient(180deg,#f6e9ff_0%,#dba6ff_42%,#8a05be_100%)] bg-clip-text text-transparent">
                  para experiências web
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.16, ease: 'easeOut' }}
                className="mx-auto max-w-3xl text-base leading-7 text-primary-100/80 sm:text-lg md:text-xl"
              >
                Este portfólio mostra como eu transformo estratégia, interface
                e implementação em experiências digitais com presença visual,
                performance e intenção comercial.
              </motion.p>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#case-study"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-500 px-6 text-sm font-semibold text-white transition duration-300 hover:bg-primary-400"
              >
                Ver projetos e estudos
              </a>
              <a
                href="#stack"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 backdrop-blur-xl transition duration-300 hover:border-primary-300/60 hover:bg-white/10"
              >
                Explorar processo
              </a>
            </motion.div>
          </div>
        }
      >
        <HeroPreview />
      </ContainerScroll>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,180,254,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(126,34,206,0.2),transparent_32%)]" />
      <div className="absolute inset-y-0 left-[55%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.14),transparent)] md:block" />

      <div className="absolute left-8 top-8 flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.7rem] uppercase tracking-[0.34em] text-primary-100/65 backdrop-blur-xl">
        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]" />
        Portfolio Preview
      </div>

      <div className="grid h-full grid-cols-1 gap-5 p-5 md:grid-cols-[1.12fr_0.88fr] md:p-7">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md md:p-6">
          <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.32em] text-primary-100/50">
            <span>Selected Capabilities</span>
            <span>Portfolio / 2026</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Tag>React</Tag>
            <Tag>Tailwind</Tag>
            <Tag>GSAP</Tag>
            <Tag>Three.js</Tag>
            <Tag>Case Studies</Tag>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.12 + index * 0.08,
                  ease: 'easeOut',
                }}
                className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 md:p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-200">
                  {card.title}
                </p>
                <p className="mt-2.5 text-sm leading-6 text-primary-100/75">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.5rem] border border-primary-300/20 bg-[linear-gradient(180deg,rgba(168,85,247,0.12),rgba(64,16,99,0.08))] p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-primary-100/45">
                What This Portfolio Shows
              </p>
              <p className="mt-3 text-base font-medium leading-7 text-white md:text-lg md:leading-8">
                Produto, landing pages, interfaces ricas em motion, blocos
                interativos e implementação frontend feita para impressionar sem
                perder clareza.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-primary-100/45">
                Positioning
              </p>
              <p className="mt-3 text-sm leading-6 text-primary-100/75 md:leading-7">
                Desenvolvedor focado em experiências web premium, narrativa
                visual e execução técnica ponta a ponta.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 backdrop-blur-sm md:p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-primary-100/45">
              Core Areas
            </p>
            <div className="mt-5 space-y-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-display text-[2.25rem] leading-none tracking-[-0.05em] text-white md:text-4xl">
                    {metric.value}
                  </span>
                  <span className="max-w-[12rem] text-right text-sm leading-6 text-primary-100/70">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[1.8rem] border border-primary-300/20 bg-[linear-gradient(180deg,rgba(117,29,191,0.35),rgba(43,10,67,0.2))] p-5 md:p-6"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)]" />
            <p className="text-xs uppercase tracking-[0.28em] text-primary-100/50">
              Approach
            </p>
            <p className="mt-4 text-base leading-7 text-white/90 md:text-lg md:leading-8">
              Unir estratégia, craft visual e frontend moderno para criar
              interfaces que comunicam valor antes mesmo da primeira explicação
              longa.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-primary-100/70">
      {children}
    </span>
  );
}

function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[48rem] overflow-hidden opacity-85">
        <OrbitalSphereBackground
          className="absolute inset-0 scale-[1.08] md:left-[10%] md:scale-[1.12]"
          hue={-10}
          particleColor={0x9d4edd}
          orbitColor={0x4c1d95}
          nodeColor={0xe9d5ff}
          backgroundOpacity={0.08}
          rotationSpeed={0.38}
          pointSize={0.018}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,3,17,0.88)_0%,rgba(9,3,17,0.62)_26%,rgba(9,3,17,0.18)_54%,rgba(9,3,17,0.42)_100%),radial-gradient(circle_at_center,transparent_18%,rgba(9,3,17,0.14)_54%,rgba(9,3,17,0.74)_100%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[54rem] bg-[radial-gradient(circle_at_top,rgba(138,5,190,0.34),transparent_54%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-14 h-[24rem] w-[24rem] rounded-full blur-3xl"
        animate={{
          x: ['0%', '8%', '-3%'],
          y: ['0%', '5%', '-2%'],
          scale: [0.96, 1.08, 1],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, rgba(86, 6, 122, 0.36), rgba(86, 6, 122, 0.08) 50%, transparent 74%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-8 h-[22rem] w-[22rem] rounded-full blur-3xl"
        animate={{
          x: ['0%', '-6%', '3%'],
          y: ['0%', '4%', '-2%'],
          scale: [1, 1.1, 0.98],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, rgba(210, 103, 255, 0.2), rgba(210, 103, 255, 0.04) 48%, transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
    </>
  );
}
