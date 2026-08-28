export const featuredProjects = [
  {
    id: 'premium-landing-pages',
    title: 'Landing pages de alta conversão',
    category: 'Acquisition / Launch',
    year: '2025-2026',
    summary:
      'Páginas pensadas para transformar tráfego em conversa comercial, combinando direção visual, clareza de oferta e motion controlado.',
    problem:
      'Marcas com boa oferta, mas páginas que pareciam genéricas, pouco memoráveis e fracas na percepção de valor.',
    outcome:
      'Entregas com hero forte, narrativa mais convincente, CTA melhor contextualizado e presença visual suficiente para elevar a leitura da oferta.',
    deliverables: ['Arquitetura da LP', 'Hero em motion', 'Sistema visual', 'CTA comercial'],
    stack: ['React', 'Tailwind', 'GSAP', 'Framer Motion'],
    accent: 'from-fuchsia-500/35 via-violet-500/20 to-transparent',
    panel: ['Hero impactante', 'Blocos autorais', 'Copy + direção', 'CTA orientado à ação'],
    layout: 'feature',
  },
  {
    id: 'internal-management',
    title: 'Sistemas internos de gestão',
    category: 'Operations / Admin',
    year: '2024-2026',
    summary:
      'Painéis administrativos e fluxos internos para operação diária, com foco em produtividade, legibilidade de dados e manutenção escalável.',
    problem:
      'Operações espalhadas em telas confusas, rotinas manuais e módulos sem consistência entre gestão, notificações e permissões.',
    outcome:
      'Interfaces mais claras para times operacionais, navegação mais previsível, componentes reutilizáveis e ganho de velocidade para evoluir novos módulos.',
    deliverables: ['Dashboards internos', 'Módulos de notificações', 'Permissões e licenças', 'Fluxos operacionais'],
    stack: ['React', 'TypeScript', 'Design System', 'APIs internas'],
    accent: 'from-purple-500/35 via-pink-500/15 to-transparent',
    panel: ['Dashboards', 'Licenças', 'Notificações', 'Fluxos internos'],
    layout: 'vertical',
  },
  {
    id: 'erp-financial',
    title: 'ERP e módulos financeiros',
    category: 'ERP / Backoffice',
    year: '2024-2026',
    summary:
      'Construção de módulos orientados a operação comercial e financeira, cobrindo cadastros, licenças, cobranças, devedores e visão administrativa.',
    problem:
      'Rotinas críticas dependiam de telas densas, baixa hierarquia visual e pouca previsibilidade para times que precisavam operar rápido.',
    outcome:
      'Módulos mais consistentes, leitura mais objetiva para dados críticos e estrutura frontend mais pronta para crescer sem virar legado cedo.',
    deliverables: ['Módulos ERP', 'Cobrança e devedores', 'Gestão comercial', 'Frontend escalável'],
    stack: ['React', 'TypeScript', 'Backoffice UI', 'Integração com dados'],
    accent: 'from-violet-400/30 via-fuchsia-500/10 to-transparent',
    panel: ['ERP core', 'Financeiro', 'Devedores', 'Admin'],
    layout: 'horizontal',
  },
  {
    id: 'n8n-automation',
    title: 'Automações e integrações com n8n',
    category: 'Automation / Workflow',
    year: '2025-2026',
    summary:
      'Fluxos de automação para reduzir tarefas manuais, conectar sistemas e acelerar operações comerciais e internas.',
    problem:
      'Processos dependiam de repetição operacional, atualizações manuais e pouca integração entre plataformas, atendimento e backoffice.',
    outcome:
      'Automação de rotinas, sincronização entre ferramentas, disparos condicionais e redução de atrito operacional em fluxos que precisavam rodar com confiabilidade.',
    deliverables: ['Workflows n8n', 'Integrações entre sistemas', 'Disparos e webhooks', 'Automação operacional'],
    stack: ['n8n', 'Webhooks', 'APIs', 'Integrações'],
    accent: 'from-cyan-400/20 via-fuchsia-500/14 to-transparent',
    panel: ['Triggers', 'Pipelines', 'APIs', 'Ops'],
    layout: 'square',
  },
];

export const processSteps = [
  {
    id: '01',
    title: 'Direction',
    description:
      'Defino o argumento da página, o que precisa ficar óbvio e quais objeções o layout precisa neutralizar.',
  },
  {
    id: '02',
    title: 'Interface',
    description:
      'Traduzo posicionamento em hierarquia, composição, tipografia e textura para a página parecer construída, não montada.',
  },
  {
    id: '03',
    title: 'Motion',
    description:
      'Uso transições para orientar leitura, intensificar foco e dar ritmo sem transformar a experiência em demo técnica.',
  },
  {
    id: '04',
    title: 'Build',
    description:
      'Entrego componentes limpos, responsivos e prontos para evoluir novas sections, casos e interações.',
  },
];

export const capabilityRows = [
  {
    title: 'Frontend systems',
    detail: 'React, TypeScript, componentização e estrutura para iterar rápido sem perder consistência.',
  },
  {
    title: 'Motion design',
    detail: 'GSAP, Framer Motion e microinterações que reforçam narrativa e percepção de valor.',
  },
  {
    title: 'Premium landing pages',
    detail: 'Heroes, sections de conversão, showcases e CTA com direção mais autoral e comercial.',
  },
  {
    title: 'Interactive layers',
    detail: '3D, efeitos de profundidade, superfícies responsivas e momentos de destaque sem excesso.',
  },
];
