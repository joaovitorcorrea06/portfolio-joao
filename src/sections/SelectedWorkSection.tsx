import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';

const projectTypes = [
  {
    eyebrow: 'Desenvolvedor Front-End',
    title: 'Rilix',
    body: 'Atuação no desenvolvimento e manutenção do sistema web da empresa, com novas funcionalidades, migração de layouts legados e integração com APIs REST.',
    meta: '2026',
  },
  {
    eyebrow: 'Desenvolvedor Front-End',
    title: 'LM Sistemas',
    body: 'Criação e manutenção de sistemas personalizados com dashboards, formulários, listagens, filtros e telas administrativas para diferentes necessidades de clientes.',
    meta: '2021-2025',
  },
  {
    eyebrow: 'Técnico de Conteúdo e Treinamento',
    title: 'Thomson Reuters',
    body: 'Produção de conteúdos, vídeos e materiais explicativos, além de treinamentos e apoio à melhoria contínua da experiência dos usuários.',
    meta: '2019-2020',
  },
  {
    eyebrow: 'Stack principal',
    title: 'Competências',
    body: 'React.js, JavaScript, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, React Router, Vitest, Testing Library, Docker, Git e GitHub.',
    meta: 'Stack',
  },
  {
    eyebrow: 'Sistemas de Informação · ESUCRI',
    title: 'Formação',
    body: 'Graduação concluída em 2022, consolidando base técnica para atuação em desenvolvimento de software e sistemas web.',
    meta: '2018-2022',
  },
];

export function SelectedWorkSection() {
  return (
    <section id="case-study" className="relative px-4 pb-0 pt-20 md:px-8 md:pb-0 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experiência aplicada"
          title="Trajetória profissional e base técnica apresentadas do jeito certo."
          description="Esta seção resume onde atuei, quais entregas realizei e quais competências sustentam meu trabalho como desenvolvedor front-end."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10"
        >
          <ScrollStack
            useWindowScroll
            itemDistance={48}
            itemScale={0.014}
            itemStackDistance={10}
            stackPosition="12%"
            scaleEndPosition="8%"
            baseScale={0.95}
            rotationAmount={0}
            blurAmount={0}
            className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,6,24,0.42),rgba(8,3,14,0.24))]"
          >
            {projectTypes.map((item) => (
              <ScrollStackItem key={item.title}>
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#14081c] p-6 md:p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)),radial-gradient(circle_at_top,rgba(191,109,245,0.12),transparent_26%)]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-primary-100/52">
                        {item.eyebrow}
                      </p>
                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.18em] text-primary-100/72">
                        {item.meta}
                      </span>
                    </div>

                    <div className="max-w-[36rem]">
                      <h3 className="font-display text-[2.7rem] leading-[0.92] tracking-[-0.06em] text-white md:text-[4.2rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-[34rem] text-base leading-8 text-primary-100/84 md:text-lg">
                        {item.body}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] uppercase tracking-[0.2em] text-primary-100/80">
                        frontend
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] uppercase tracking-[0.2em] text-primary-100/80">
                        integração
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] uppercase tracking-[0.2em] text-primary-100/80">
                        manutenção
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-200">
        {eyebrow}
      </span>
      <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-[3.4rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-primary-100/75 md:text-lg">
        {description}
      </p>
    </div>
  );
}
