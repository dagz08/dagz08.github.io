import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { InteractiveArchitecture } from './components/InteractiveArchitecture';
import { SkillsBentoGrid } from './components/SkillsBentoGrid';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navbar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <HeroSection
          onOpenContact={() => setContactModalOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <AboutSection />
        <InteractiveArchitecture />
        <SkillsBentoGrid />
        <ServicesSection onOpenContact={() => setContactModalOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive CLI Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Direct Contact Modal (when triggered from quick buttons) */}
      {contactModalOpen && (
        <ContactSection
          isModal={true}
          onClose={() => setContactModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
