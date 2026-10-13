import React, { useState, useEffect } from 'react';
import { Download, Terminal, Menu, X, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'architecture', 'skills', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Skills & Stack', href: '#skills', id: 'skills' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0a0e1a] border-b border-slate-800 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-white font-heading font-extrabold text-2xl tracking-tight"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-600 flex items-center justify-center p-[2px] shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080b12] rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 font-black text-lg">
                  KM
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-bold leading-none tracking-tight">Karl Mendoza</span>
              <span className="text-teal-400 text-[10px] font-mono tracking-widest uppercase">Tech Lead .NET</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 tech-surface px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  activeSection === link.id
                    ? 'text-white bg-slate-800 border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Terminal quick-launch */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-500/30 text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 hover:border-teal-400 text-xs font-mono transition-all group"
              title="Launch Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>CLI</span>
            </button>

            {/* CV Download */}
            <a
              href={PORTFOLIO_DATA.personal.cvUrl}
              download="KarlMendozaCV_2026.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-[#0d121f] text-xs font-medium transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            {/* Contact Trigger */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold text-xs tracking-wide shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg border border-teal-500/30 text-teal-300 bg-teal-500/10 text-xs font-mono"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg tech-surface text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl tech-surface border border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    activeSection === link.id
                      ? 'text-teal-300 bg-teal-500/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.cvUrl}
                  download="KarlMendozaCV_2026.pdf"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-800 text-slate-200 text-xs font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-semibold text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
