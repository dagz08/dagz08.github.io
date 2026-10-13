import React, { useState, useEffect } from 'react';
import { Download, ChevronRight, Terminal, ArrowDown, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroR3F } from './HeroR3F';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenTerminal }) => {
  const roles = PORTFOLIO_DATA.personal.subRoles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        if (displayText.length === currentFullRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Technical Lead & Senior Roles</span>
            </div>

            <p className="text-slate-400 text-base md:text-lg font-medium tracking-wide mb-2">
              Hello, I am
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white mb-4">
              Karl Mendoza
            </h1>

            {/* Dynamic Typing Title */}
            <div className="h-12 flex items-center mb-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-slate-200">
                <span>I build enterprise systems as a </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400 font-bold border-b-2 border-teal-400/50 pb-0.5">
                  {displayText}
                </span>
                <span className="animate-ping font-mono text-teal-400">|</span>
              </p>
            </div>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl mb-8 font-light">
              Technical Lead & Senior Software Engineer with <strong className="text-white font-semibold">more than 10 years</strong> of experience designing and shipping mission-critical backends, high-throughput ASP.NET Core microservices, Azure distributed systems, and responsive modern web experiences with React.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href={PORTFOLIO_DATA.personal.cvUrl}
                download="KarlMendozaCV_2026.pdf"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (2026)</span>
              </a>

              <button
                onClick={onOpenContact}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl tech-surface border-slate-800 text-teal-300 hover:border-teal-500/50 hover:bg-slate-800/80 font-semibold text-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              <a
                href="#architecture"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl tech-surface border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Architecture</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-teal-500/20 text-teal-300 bg-teal-500/5 hover:bg-teal-500/15 text-sm font-mono transition-all"
                title="Open interactive terminal"
              >
                <Terminal className="w-4 h-4" />
                <span>karl --cli</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">10+</span>
                <span className="text-xs text-slate-400 font-mono">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-heading font-black text-teal-400">30+</span>
                <span className="text-xs text-slate-400 font-mono">Shipped Projects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-heading font-black text-cyan-400">.NET 9</span>
                <span className="text-xs text-slate-400 font-mono">Azure & React</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <HeroR3F />
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors pointer-events-auto"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-teal-400" />
      </a>
    </section>
  );
};
