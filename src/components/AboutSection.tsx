import React from 'react';
import Tilt from 'react-parallax-tilt';
import { 
  Clock, 
  Briefcase, 
  Coffee, 
  Gamepad2, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from './SocialIcons';

export const AboutSection: React.FC = () => {
  const { personal, stats } = PORTFOLIO_DATA;

  const corePillars = [
    { title: 'Clean Architecture & DDD', desc: 'Domain-centric separation of concerns, CQRS patterns, and maintainable enterprise boundaries.' },
    { title: 'High Throughput & Concurrency', desc: 'Lock-free algorithms, async TPL, high-speed caching with Redis, and SQL execution tuning.' },
    { title: 'Cloud-Native Distributed Systems', desc: 'Resilient event-driven microservices with Azure Service Bus, AKS, and Docker containers.' },
    { title: 'Modern Frontend Integration', desc: 'Bridging high-performance C# backends with responsive, stateful React interfaces.' }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#080b12] border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Engineering with Precision & Rigor
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl font-light">
            Behind every dependable system is clean architecture, rigorous database tuning, and relentless puzzle solving.
          </p>
        </div>

        {/* Main Grid: Photo + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Avatar Card with Solid Bento Surface */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              <div className="relative rounded-2xl overflow-hidden tech-surface p-3 shadow-2xl">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-90" />

                  {/* Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#0d121f] border border-slate-800 shadow-lg">
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">{personal.name}</p>
                      <p className="text-teal-400 text-xs font-mono">Pasay City, Philippines</p>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>

                {/* Social Connect bar below image */}
                <div className="flex items-center justify-around py-3 mt-2 border-t border-slate-800">
                  <a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={personal.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="GitHub"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={personal.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                    title="Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={personal.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-colors"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
              A Master Puzzle Solver & Technical Lead
            </h3>
            
            <p className="text-slate-300 text-base leading-relaxed mb-4 font-light">
              My engineering journey began with an insatiable fascination for logic puzzles, system mechanics, and algorithmic challenges. Over the past <span className="text-teal-300 font-semibold">9+ years</span>, that fascination evolved into a deep passion for building resilient, enterprise-grade software.
            </p>

            <p className="text-slate-300 text-base leading-relaxed mb-8 font-light">
              I thrive in the heart of backend architectures: unraveling convoluted legacy codebases, designing microservices with high domain cohesion, tuning SQL queries under heavy concurrent loads, and designing cloud infrastructure on Microsoft Azure. I believe that writing code is like assembling a complex puzzle — every class, interface, and message queue must fit together with elegance, precision, and purpose.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePillars.map((pillar, i) => (
                <div key={i} className="p-4 rounded-xl tech-card">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Statistics Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const isGaming = stat.label.includes('Gaming');
            return (
              <Tilt
                key={idx}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.03}
                transitionSpeed={1200}
                className="preserve-3d h-full"
              >
                <div className="relative p-6 rounded-2xl tech-card h-full flex flex-col justify-between preserve-3d">
                  <div className="flex items-center justify-between mb-4 preserve-3d">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 translate-z-10">
                      {stat.label}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 translate-z-20 shadow-md">
                      {idx === 0 && <Clock className="w-5 h-5" />}
                      {idx === 1 && <Briefcase className="w-5 h-5" />}
                      {idx === 2 && <Coffee className="w-5 h-5" />}
                      {idx === 3 && <Gamepad2 className="w-5 h-5" />}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 translate-z-20">
                    <span className={`text-3xl font-heading font-black ${isGaming ? 'text-teal-300 text-2xl' : 'text-white'}`}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-xs text-slate-400 font-mono">{stat.suffix}</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 font-light translate-z-10">{stat.desc}</p>
                </div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};
