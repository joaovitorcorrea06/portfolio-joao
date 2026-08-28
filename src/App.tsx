import { HeroSection } from '@/sections/HeroSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ShowcaseSection } from '@/sections/ShowcaseSection';
import { CapabilitySection } from '@/sections/CapabilitySection';
import { FinalCtaSection } from '@/sections/FinalCtaSection';
import { CursorGlow } from '@/components/ui/cursor-glow';
import { GridMotionBackground } from '@/components/ui/grid-motion-background';
import { SectionLoopDivider } from '@/components/ui/section-loop-divider';

function App() {
  return (
    <>
      <GridMotionBackground />
      <CursorGlow />
      <main className="relative z-10 min-h-screen bg-transparent text-foreground">
        <HeroSection />
        <SelectedWorkSection />
        {/* <SectionLoopDivider /> */}
        <ProcessSection />
        <ShowcaseSection />
        <CapabilitySection />
        <FinalCtaSection />
      </main>
    </>
  );
}

export default App;
