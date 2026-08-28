import TextLoop from '@/components/ui/text-loop';

export function SectionLoopDivider() {
  return (
    <div className="relative w-full overflow-hidden py-0.5 md:py-1 mt-0 mb-0">
      <TextLoop
        text="Landing Pages ✦ Automação n8n ✦ ERPs ✦ Sistemas para vendas ✦ Motion systems"
        shape="line"
        speed={82}
        direction="forward"
        separator="✦"
        curviness={0}
        fontSize={26}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        color="#f8f1ff"
        ribbon
        ribbonColor="#2a0f3d"
        ribbonWidth={58}
        pauseOnHover
        className="relative z-10"
      />
    </div>
  );
}
