import { motion } from 'framer-motion';
import AcidSquares from '@/components/ui/acid-squares';
import { OrbitBorderGlow } from '@/components/ui/orbit-border-glow';
import SplitFlapText from '@/components/ui/split-flap-text';
import { capabilityRows } from '@/data/portfolio';

export function CapabilitySection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0">
        <AcidSquares
          className="absolute inset-0"
          color1="#22062f"
          color2="#8a05be"
          color3="#f3e4ff"
          detail="medium"
          speed={0.42}
          waveDepth={0.72}
          zoom={1.12}
          density={8.4}
          glow={0.82}
          exposure={2500}
          spread={0.28}
          stepSize={0.0022}
          contrast={1.08}
          brightness={1}
          opacity={0.92}
          mouseInteraction
          mouseStrength={0.08}
          mouseRadius={0.32}
          blur={0.08}
          grain
          grainIntensity={0.035}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,3,12,0.42),rgba(7,3,12,0.7)_52%,rgba(7,3,12,0.86))]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-200">
                Capability stack
              </span>
              <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl">
                Capacidade técnica apresentada com presença, movimento e estrutura.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-primary-100/75 md:text-lg">
                A section agora assume mais atmosfera visual: fundo vivo, cards com glow contínuo e leitura mais premium para stack, motion, landing pages e camadas interativas.
              </p>

              <div className="mt-8 flex justify-start">
                <SplitFlapText
                  words={['CONVERT', 'MOTION', 'SYSTEMS', 'WEBGL']}
                  flipDuration={0.08}
                  stagger={0.03}
                  cycleDelay={1700}
                  flipsPerChar={4}
                  charset="alpha"
                  tileColor="#160724"
                  textColor="#f8f1ff"
                  tileRadius={12}
                  gap={5}
                  fontSize={18}
                  padTo={8}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-primary-100/74">
                  React
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-primary-100/74">
                  GSAP
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-primary-100/74">
                  Three.js
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-primary-100/74">
                  Motion systems
                </span>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {capabilityRows.map((row, index) => (
                <motion.div
                  key={row.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[1.7rem]"
                >
                  <OrbitBorderGlow duration={4.5 + index * 0.8} glowColor="191, 109, 245">
                    <div className="relative overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,7,28,0.94),rgba(10,4,16,0.92))] p-5 md:p-6">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,109,245,0.12),transparent_32%)]" />
                      <div className="relative z-10 flex h-full min-h-[15rem] flex-col justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-primary-100/42">
                            Capability {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-white md:text-[1.9rem]">
                            {row.title}
                          </h3>
                        </div>

                        <p className="max-w-[28ch] text-sm leading-7 text-primary-100/72 md:text-base">
                          {row.detail}
                        </p>
                      </div>
                    </div>
                  </OrbitBorderGlow>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
