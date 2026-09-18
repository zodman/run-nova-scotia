import React, { useState } from 'react';
import { Trophy, Flag, Sparkles, Award, ArrowRight, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';

export default function SeriesTabs({ onExploreRaces, onExplorePerformance, onJoinClick }) {
  const [activeTab, setActiveTab] = useState('road-race');

  const tabs = [
    { id: 'road-race', label: 'Road Race Series', icon: Flag },
    { id: 'performance', label: 'Performance Series', icon: Trophy },
    { id: 'youth', label: 'Youth Running Series', icon: Sparkles },
    { id: 'scoring', label: 'Points & Scoring Rules', icon: Award }
  ];

  return (
    <section id="series-info" className="py-24 bg-slate-50 dark:bg-[#081426] border-y border-slate-200 dark:border-dark-750 relative transition-colors duration-300">
      <div id="series-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div id="series-header" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-ocean dark:text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest">
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
            <span>Provincial Series Programs</span>
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
          </div>
          <h2 id="series-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase tracking-tight text-slate-900 dark:text-white">
            Racing Programs For <span className="text-ocean dark:text-volt">Every Athlete</span>
          </h2>
          <p id="series-subtitle" className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Whether you want to challenge yourself over 5K, qualify for Boston, or get your kids active, 
            Run Nova Scotia coordinates sanctioned road racing across the province.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div id="series-tab-buttons" className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`series-tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-lg font-athletic text-sm sm:text-base tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-volt text-black shadow-lg font-bold' 
                    : 'bg-white dark:bg-dark-850 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-750 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-ocean dark:text-volt'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Display Panel */}
        <div id="series-tab-content-panel" className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl">
          
          {/* Tab 1: Road Race Series */}
          {activeTab === 'road-race' && (
            <div id="tab-content-road-race" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-ocean/15 dark:bg-volt/10 text-ocean dark:text-volt border border-ocean/30 dark:border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Open to All Runners & Walkers
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
                  The Road Race Series
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  The cornerstone of Run Nova Scotia since 1984. Spanning distances from 5K to the full 42.2K marathon, 
                  the series connects community races from Sydney to Yarmouth into one unified calendar. 
                  Every runner earns age-group points, celebrates personal milestones, and enjoys local community hospitality.
                </p>
                <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Points tracked automatically through Atlantic Chip official timing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Run Nova Scotia members receive guaranteed race registration discounts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Age brackets awarded every 5 years from Under-20 to 80+</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    id="road-race-explore-btn"
                    onClick={onExploreRaces}
                    className="bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Browse 2026/2027 Calendar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div id="road-race-stats-card" className="bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700/80 rounded-xl p-6 text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-ocean/15 dark:bg-volt/10 border border-ocean/30 dark:border-volt/30 text-ocean dark:text-volt mx-auto flex items-center justify-center">
                    <Flag className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-athletic font-bold text-slate-900 dark:text-white uppercase">
                    25+ Sanctioned Races Annually
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    From scenic coastal 5Ks in Port Williams and Lunenburg to historic challenges like the Dartmouth Natal Day and Nova Scotia Marathon.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-ocean dark:text-volt font-bold uppercase tracking-wider">
                      5K • 5 Mile • 10K • Half • Marathon • Relays
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Performance Series (Dr. Jeff Ratushny) */}
          {activeTab === 'performance' && (
            <div id="tab-content-performance" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-ocean/15 dark:bg-volt/10 text-ocean dark:text-volt border border-ocean/30 dark:border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Brought to you by Dr. Jeff Ratushny
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
                  Run Nova Scotia <span className="text-ocean dark:text-volt">Performance Series</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  Brought to you by <strong>Dr. Jeff Ratushny</strong>, the Performance Series offers competition and camaraderie for runners looking for a challenge. 
                  Run Nova Scotia members compete across premier certified courses throughout Nova Scotia.
                </p>
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0 mt-1" />
                    <span><strong>Three-Distance Challenge:</strong> Complete at least one 5K, one 10K (or equivalent), and one eligible Half Marathon from designated Performance Series events.</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0 mt-1" />
                    <span><strong>Gun Time Standings:</strong> Series winners (19+) are determined by the fastest combined Gun Time across all three distances, with cash prizes and awards for Open and Masters divisions.</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0 mt-1" />
                    <span><strong>Youth Performance Category:</strong> Dedicated category for runners 18 years of age or younger (two out of three designated 5K events).</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button 
                    id="performance-explore-btn"
                    onClick={onExplorePerformance || onExploreRaces}
                    className="bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                  >
                    <span>View Performance Qualifying Races</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a 
                    id="performance-official-link-btn"
                    href="https://runnovascotia.ca/performance-series/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-750 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-dark-700 font-athletic font-semibold px-5 py-3 rounded text-sm uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Official Rules & Standings</span>
                    <ExternalLink className="w-4 h-4 text-ocean dark:text-volt" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div id="performance-highlights-card" className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700/80 rounded-xl p-6 text-center space-y-4 shadow-md">
                  <div className="w-16 h-16 rounded-full bg-ocean/15 dark:bg-volt/10 border border-ocean/30 dark:border-volt/30 text-ocean dark:text-volt mx-auto flex items-center justify-center">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-athletic font-bold tracking-wider text-ocean dark:text-volt">
                      Sponsored by Dr. Jeff Ratushny
                    </span>
                    <h4 className="text-xl font-athletic font-bold text-slate-900 dark:text-white uppercase">
                      Provincial Championship & Awards
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Compete against Nova Scotia's top competitors. Points and times accumulate across certified 5K, 10K, and Half Marathon races toward the historic Year-End Awards Banquet.
                  </p>
                  <div className="pt-2 border-t border-slate-200 dark:border-dark-800 flex flex-wrap justify-around text-xs">
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">5K • 10K • 21.1K</span>
                      <span className="text-slate-500">Required Distances</span>
                    </div>
                    <div>
                      <span className="block font-bold text-ocean dark:text-volt">Gun Time</span>
                      <span className="text-slate-500">Official Scoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Youth Running Series */}
          {activeTab === 'youth' && (
            <div id="tab-content-youth" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-ocean/15 dark:bg-volt/10 text-ocean dark:text-volt border border-ocean/30 dark:border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Grassroots Athletics • Inspiring the Next Generation
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
                  Youth Running Series
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  Run Nova Scotia is fiercely committed to youth health and athletics. The Youth Running Series 
                  delivers fun, non-intimidating, and exciting races for children and teens across communities, 
                  encouraging a lifelong passion for physical activity.
                </p>
                <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Free or low-cost entry for youth competitors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Distances tailored by age: 500m dash, 1K fun run, up to 5K</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                    <span>Every finisher earns an authentic commemorative medal and post-race snack</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    id="youth-inquire-btn"
                    href="#contact"
                    className="inline-flex items-center space-x-2 bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold px-6 py-3 rounded text-sm uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(254,240,0,0.35)]"
                  >
                    <span>Inquire About Youth Series</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div id="youth-highlights-card" className="bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700/80 rounded-xl p-6 text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-ocean/15 dark:bg-volt/10 border border-ocean/30 dark:border-volt/30 text-ocean dark:text-volt mx-auto flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-athletic font-bold text-slate-900 dark:text-white uppercase">
                    Every Kid Crosses The Line A Champion
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Supported by local sponsors, teachers, and volunteer parents from across the province.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Points & Scoring Rules */}
          {activeTab === 'scoring' && (
            <div id="tab-content-scoring" className="space-y-6">
              <div className="max-w-3xl">
                <div className="inline-block bg-ocean/15 dark:bg-volt/10 text-ocean dark:text-volt border border-ocean/30 dark:border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider mb-2 font-bold">
                  Fair Age-Class Point System
                </div>
                <h3 className="text-2xl sm:text-3xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
                  How Points Accumulation Works
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-2">
                  Members who participate in the Road Race Series are awarded points based on their finish position 
                  <strong className="text-ocean dark:text-volt"> relative to other Run Nova Scotia members in their exact age and gender class</strong>. 
                  A 63-year-old runner is never scored against a 22-year-old!
                </p>
              </div>

              {/* Point Scale Table Grid */}
              <div id="scoring-points-table" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
                {[
                  { place: "1st Place", pts: "55 Pts" },
                  { place: "2nd Place", pts: "48 Pts" },
                  { place: "3rd Place", pts: "42 Pts" },
                  { place: "4th Place", pts: "37 Pts" },
                  { place: "5th Place", pts: "33 Pts" },
                  { place: "6th Place", pts: "30 Pts" },
                  { place: "7th Place", pts: "27 Pts" },
                  { place: "8th Place+", pts: "24-1 Pts" }
                ].map((item, idx) => (
                  <div key={idx} id={`scoring-point-item-${idx}`} className="bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 p-3 rounded text-center shadow-sm">
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">{item.place}</div>
                    <div className="text-lg font-athletic font-bold text-ocean dark:text-volt mt-1">{item.pts}</div>
                  </div>
                ))}
              </div>

              <div id="scoring-eligibility-note" className="bg-slate-100 dark:bg-dark-900/60 border border-slate-200 dark:border-dark-750 p-4 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-3">
                <Award className="w-5 h-5 text-ocean dark:text-volt flex-shrink-0 mt-0.5" />
                <p>
                  To be eligible for year-end series awards, participants must be paid Run Nova Scotia members 
                  before the race date and participate in a minimum number of sanctioned series events. 
                  Trophies and prizes are presented at the Year-End Celebration!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
