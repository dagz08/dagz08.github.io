import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Server, Cpu, Database, Cloud, Sparkles, Check, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const { services } = PORTFOLIO_DATA;

const renderServiceIcon = (index: number) => {
  switch (index % 4) {
    case 0: return <Server className="w-6 h-6 text-teal-400" />;
    case 1: return <Cloud className="w-6 h-6 text-cyan-400" />;
    case 2: return <Database className="w-6 h-6 text-purple-400" />;
    default: return <Cpu className="w-6 h-6 text-amber-400" />;
  }
};

  return (
    <section id="services" className="relative py-24 bg-[#080b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solutions & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            What I Deliver
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl font-light">
            Architecting and implementing mission-critical software solutions from conception to production operations.
          </p>
        </div>

        {/* Services Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1200}
              className="preserve-3d h-full"
            >
              <div className="p-8 rounded-2xl tech-card h-full flex flex-col justify-between preserve-3d">
                <div className="preserve-3d">
                  <div className="flex items-center justify-between mb-6 preserve-3d">
                    <div className="w-12 h-12 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-center translate-z-20 shadow-lg">
                      {renderServiceIcon(index)}
                    </div>
                    <span className="text-xs font-mono text-teal-400 px-3 py-1 rounded-full bg-[#090d16] border border-teal-500/30 translate-z-10">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white transition-colors mb-3 translate-z-10">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6 translate-z-10">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800 translate-z-10">
                    {service.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* High-Impact Freelance & Enterprise Banner */}
        <div className="rounded-2xl tech-surface border-teal-500/40 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-2">
                Available for Global Opportunities
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Looking for a Technical Lead .NET Developer or Full-Stack Lead?
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-xl font-light">
                Whether you need high-throughput backend microservices, Azure cloud migrations, or modern React applications, let's build something exceptional.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 transition-all flex items-center gap-2 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Initiate Discussion</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
