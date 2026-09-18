import React, { useState } from 'react';
import { Trophy, Flag, Sparkles, Award, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export default function SeriesTabs({ onExploreRaces, onJoinClick }) {
  const [activeTab, setActiveTab] = useState('road-race');

  const tabs = [
    { id: 'road-race', label: 'Road Race Series', icon: Flag },
    { id: 'performance', label: 'Performance Series', icon: Trophy },
    { id: 'youth', label: 'Youth Running Series', icon: Sparkles },
    { id: 'scoring', label: 'Points & Scoring Rules', icon: Award }
  ];

  return (
    <section id="series-info" className="py-24 bg-[#081426] border-y border-dark-750 relative">
      <div id="series-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div id="series-header" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest">
            <span className="w-6 h-0.5 bg-volt" />
            <span>Provincial Series Programs</span>
            <span className="w-6 h-0.5 bg-volt" />
          </div>
          <h2 id="series-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase tracking-tight text-white">
            Racing Programs For <span className="text-volt">Every Athlete</span>
          </h2>
          <p id="series-subtitle" className="text-slate-400 text-sm sm:text-base">
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
                    ? 'bg-volt text-black shadow-[0_0_20px_rgba(254,240,0,0.35)] translate-y-[-2px]' 
                    : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-dark-750'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-volt'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div id="series-tab-content-display" className="bg-dark-850 border border-dark-750 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          {/* Tab 1: Road Race Series */}
          {activeTab === 'road-race' && (
            <div id="tab-content-road-race" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-volt/10 text-volt border border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Core Provincial Series • 20+ Sanctioned Races
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-white">
                  The Run Nova Scotia Road Race Series
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Every year, Run Nova Scotia supports road races from Yarmouth to Sydney. The Road Race Series 
                  is open to all comers — elite competitors and weekend warriors, members and non-members alike. 
                  Each race delivers the thrill of participation and the joy of crossing the finish line.
                </p>
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Certified courses from 1.6K (1-mile) sprints to full 42.2K marathons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Guaranteed 5%+ discount for active Run Nova Scotia members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Official chip timing with results uploaded to Atlantic Chip & Race Roster</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={onExploreRaces}
                    className="bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(254,240,0,0.35)]"
                  >
                    <span>Browse 2026 Calendar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={onJoinClick}
                    className="border border-dark-600 hover:border-volt text-white hover:text-volt font-athletic font-semibold px-6 py-3 rounded text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Join to Save 5% On Every Race
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div id="road-race-highlights-card" className="bg-dark-900 border border-dark-700/80 rounded-xl p-6 space-y-4">
                  <h4 className="text-base font-athletic font-bold text-white uppercase tracking-wider border-b border-dark-750 pb-3 flex items-center justify-between">
                    <span>Key Series Highlights</span>
                    <span className="text-volt font-mono text-xs">2026 Season</span>
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex justify-between pb-2 border-b border-dark-800">
                      <span className="text-slate-400">Season Opener:</span>
                      <span className="font-medium text-white">Bee Hive Fives (April 18, Port Williams)</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-dark-800">
                      <span className="text-slate-400">Oldest Continuous:</span>
                      <span className="font-medium text-white">119th Dartmouth Natal Day (Aug 3)</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-dark-800">
                      <span className="text-slate-400">Most Brutal Hill:</span>
                      <span className="font-medium text-white">Nasty Nuttby Killer 5K (Sept 12)</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-dark-800">
                      <span className="text-slate-400">Crown Jewel BQ:</span>
                      <span className="font-medium text-white">Cape Breton Fiddlers Marathon (Oct 18)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Season Finale:</span>
                      <span className="font-medium text-white">Annual Awards Celebration & Banquet (Nov 7)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Performance Series */}
          {activeTab === 'performance' && (
            <div id="tab-content-performance" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-volt/10 text-volt border border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Provincial Championship • Elite Standings
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-white">
                  The Performance Series
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  For competitive road racers seeking provincial championships, the Performance Series 
                  tracks head-to-head racing records and overall rankings across premier certified courses. 
                  Top performers in each age and open category are recognized at the annual banquet.
                </p>
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Sanctioned Boston Qualifier marathons & half marathons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Provincial leaderboard updated continuously after each sanctioned race</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Annual championship trophies for overall male, female, and age-class victors</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    id="performance-explore-btn"
                    onClick={onExploreRaces}
                    className="bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(254,240,0,0.35)]"
                  >
                    <span>View Performance Qualifying Races</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div id="performance-highlights-card" className="bg-dark-900 border border-dark-700/80 rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-volt/10 border border-volt/30 text-volt mx-auto flex items-center justify-center">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-athletic font-bold text-white uppercase">
                    Provincial Records & Trophies
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Compete against Nova Scotia's fastest road racers. Points accumulate throughout the season 
                    toward the historic Run Nova Scotia Year-End Awards Banquet.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-volt font-bold uppercase tracking-wider">
                      Open to all registered Run NS members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Youth Running Series */}
          {activeTab === 'youth' && (
            <div id="tab-content-youth" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-volt/10 text-volt border border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-bold">
                  Grassroots Athletics • Inspiring the Next Generation
                </div>
                <h3 className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-white">
                  Youth Running Series
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Run Nova Scotia is fiercely committed to youth health and athletics. The Youth Running Series 
                  delivers fun, non-intimidating, and exciting races for children and teens across communities, 
                  encouraging a lifelong passion for physical activity.
                </p>
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Free or low-cost entry for youth competitors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                    <span>Distances tailored by age: 500m dash, 1K fun run, up to 5K</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
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
                <div id="youth-highlights-card" className="bg-dark-900 border border-dark-700/80 rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-volt/10 border border-volt/30 text-volt mx-auto flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-athletic font-bold text-white uppercase">
                    Every Kid Crosses The Line A Champion
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
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
                <div className="inline-block bg-volt/10 text-volt border border-volt/40 px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider mb-2 font-bold">
                  Fair Age-Class Point System
                </div>
                <h3 className="text-2xl sm:text-3xl font-athletic font-bold uppercase text-white">
                  How Points Accumulation Works
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2">
                  Members who participate in the Road Race Series are awarded points based on their finish position 
                  <strong className="text-volt"> relative to other Run Nova Scotia members in their exact age and gender class</strong>. 
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
                  <div key={idx} id={`scoring-point-item-${idx}`} className="bg-dark-900 border border-dark-700 p-3 rounded text-center">
                    <div className="text-xs text-slate-400 uppercase font-semibold">{item.place}</div>
                    <div className="text-lg font-athletic font-bold text-volt mt-1">{item.pts}</div>
                  </div>
                ))}
              </div>

              <div id="scoring-eligibility-note" className="bg-dark-900/60 border border-dark-750 p-4 rounded-xl text-xs sm:text-sm text-slate-300 flex items-start space-x-3">
                <Award className="w-5 h-5 text-volt flex-shrink-0 mt-0.5" />
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
