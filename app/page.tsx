import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { SectionCarousel } from '@/components/section-carousel';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SectionCarousel>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </SectionCarousel>
    </main>
  );
}