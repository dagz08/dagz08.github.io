import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ChevronRight, 
  Box, 
  LayoutGrid, 
  Sidebar 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TechStack3DCloud } from './TechStack3DCloud';

export const SkillsBentoGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'master-detail' | '3d'>('grid');
  
  // For master-detail view
  const [selectedSubSkillIndex, setSelectedSubSkillIndex] = useState<number>(0);

  const categories = PORTFOLIO_DATA.skillCategories;

  const filterTabs = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'backend', label: '.NET & Backend' },
    { id: 'cloud', label: 'Cloud & Azure' },
    { id: 'database', label: 'Database & SQL' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'security', label: 'API Security' },
    { id: 'frontend', label: 'Frontend & React' },
    { id: 'tools', label: 'Tools & Agile' },
    { id: 'soft-skills', label: 'Leadership' },
  ];

  // Flattened sub-category items for balanced multi-column grid
  interface FlattenedSkillGroup {
    categoryId: string;
    categoryTitle: string;
    categoryIcon: string;
    categoryImage: string;
    categoryType: string;
    groupTitle: string;
    items: string[];
  }

  const flattenedSkills = useMemo<FlattenedSkillGroup[]>(() => {
    const list: FlattenedSkillGroup[] = [];
    categories.forEach((cat) => {
      cat.skills.forEach((group) => {
        list.push({
          categoryId: cat.id,
          categoryTitle: cat.title,
          categoryIcon: cat.icon,
          categoryImage: cat.image,
          categoryType: cat.category,
          groupTitle: group.title,
          items: group.items,
        });
      });
    });
    return list;
  }, [categories]);

  // Filter logic
  const filteredSubSkills = useMemo(() => {
    return flattenedSkills.filter((item) => {
      const matchesCategory = activeFilter === 'all' || item.categoryType === activeFilter;
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const inTitle = item.groupTitle.toLowerCase().includes(q) || item.categoryTitle.toLowerCase().includes(q);
      const inItems = item.items.some((bullet) => bullet.toLowerCase().includes(q));

      return matchesCategory && (inTitle || inItems);
    });
  }, [flattenedSkills, activeFilter, searchQuery]);

  // Active Category for Master-Detail View
  const currentCategory = useMemo(() => {
    if (activeFilter === 'all') return categories[0];
    return categories.find((c) => c.category === activeFilter) || categories[0];
  }, [categories, activeFilter]);

  const currentSubSkill = currentCategory.skills[selectedSubSkillIndex] || currentCategory.skills[0];

  return (
    <section id="skills" className="relative py-24 bg-[#080b12] border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Technical Expertise & Stack
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl font-light">
            Every capability, framework, and engineering practice from my 9+ years of enterprise delivery. Explore in Grid, Master-Detail, or Interactive 3D mode.
          </p>
        </div>

        {/* View Mode Switcher + Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl tech-surface border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Multi-Card Grid</span>
            </button>

            <button
              onClick={() => setViewMode('master-detail')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'master-detail'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sidebar className="w-3.5 h-3.5" />
              <span>Master-Detail</span>
            </button>

            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === '3d'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-teal-400" />
              <span>3D Cloud</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. CQRS, Dapper, AKS, React)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0d121f] border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400 transition-all font-mono"
            />
          </div>
        </div>

        {/* Filter Navigation Pills (only when not in 3D mode) */}
        {viewMode !== '3d' && (
          <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setSelectedSubSkillIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                  activeFilter === tab.id
                    ? 'bg-teal-500/10 border-teal-400 text-teal-300 font-bold shadow-sm'
                    : 'tech-surface border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* VIEW 1: 3D Tech Stack Cloud (Step 3) */}
        {viewMode === '3d' && (
          <div className="animate-in fade-in duration-200">
            <TechStack3DCloud />
          </div>
        )}

        {/* VIEW 2: Balanced Multi-Column CSS Grid (Fixes single narrow card on left) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredSubSkills.map((sub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl tech-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#080b12] border border-slate-800 p-1 flex items-center justify-center">
                        <img src={sub.categoryImage} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {sub.categoryTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-400 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                      {sub.categoryType}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{sub.groupTitle}</span>
                  </h3>

                  <ul className="space-y-2.5">
                    {sub.items.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-teal-400 font-bold mt-0.5">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: Master-Detail Layout */}
        {viewMode === 'master-detail' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Left Sidebar (col-span-4): Sub-categories list */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <div className="p-4 rounded-xl tech-surface border-slate-800 mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#080b12] border border-slate-800 p-1">
                    <img src={currentCategory.image} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{currentCategory.title}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{currentCategory.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1 pt-1">
                Select Discipline Area:
              </p>

              {currentCategory.skills.map((skillGroup, sIdx) => {
                const isSelected = selectedSubSkillIndex === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedSubSkillIndex(sIdx)}
                    className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'tech-card-selected text-white'
                        : 'tech-surface text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-teal-400' : 'bg-slate-600'}`} />
                      <span className="text-xs font-semibold">{skillGroup.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Pane (col-span-8): Expanded Details & Bullets */}
            <div className="lg:col-span-8 p-8 rounded-2xl tech-surface shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                    {currentCategory.title}
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white mt-1">
                    {currentSubSkill.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#080b12] border border-slate-800 p-2 flex items-center justify-center">
                  <img src={currentCategory.image} alt="" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Core Competencies & Tools:
                </span>
                <div className="space-y-3">
                  {currentSubSkill.items.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#111726] border border-slate-800 flex items-start gap-3 text-xs text-slate-200 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredSubSkills.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-mono text-sm tech-surface rounded-2xl border-slate-800">
            No technical skills found matching "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
