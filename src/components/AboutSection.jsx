import React from 'react';
import { CheckCircle2, ShieldCheck, Heart, Users, MapPin } from 'lucide-react';

export default function AboutSection({ onJoinClick }) {
  const pillars = [
    {
      title: "Inclusive to All Ages & Abilities",
      desc: "From 12-minute milers to sub-3-hour marathoners, everyone has a place on the starting line."
    },
    {
      title: "Sanctioned Provincial Series",
      desc: "20+ certified events scored fairly in 5-year age brackets so you compete with your peers."
    },
    {
      title: "Grassroots Community Impact",
      desc: "Supporting local run clubs, high school runners, youth events, and community charities."
    },
    {
      title: "Iconic Tradition & Camaraderie",
      desc: "Legendary annual tech shirts, post-race banquets, and genuine Maritime camaraderie."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#040b17] relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-ocean/15 dark:bg-ocean/20 rounded-full blur-3xl pointer-events-none" />

      <div id="about-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div id="about-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Montage */}
          <div id="about-visual-column" className="lg:col-span-6 relative">
            
            {/* Primary Image Container */}
            <div id="about-image-card" className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-700 shadow-xl dark:shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1000&q=80" 
                alt="Nova Scotia woman athlete running on coastal road" 
                className="w-full h-[450px] object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#040b17] via-transparent to-transparent opacity-80" />

              {/* Floating Quote Badge on Image */}
              <div id="about-quote-badge" className="absolute bottom-6 left-6 right-6 bg-slate-900/90 dark:bg-dark-900/95 backdrop-blur-md border border-volt/40 p-4 rounded-xl shadow-xl">
                <p className="text-sm italic text-slate-200">
                  "For 40 years, we’ve supported anyone from Yarmouth to Sydney who has decided to lace up a pair of running shoes and join the thousands of other Nova Scotians running the roads."
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-volt font-athletic font-semibold uppercase">
                  <span>Run Nova Scotia Mission</span>
                  <span>Est. 1984</span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Graphic Box (Zunzo Style) */}
            <div id="about-years-badge" className="hidden sm:block absolute -top-6 -left-6 z-20 bg-volt text-black p-4 rounded-xl font-athletic uppercase shadow-xl transform -rotate-3">
              <div className="text-2xl font-bold leading-none">40+ YEARS</div>
              <div className="text-xs font-semibold tracking-wider">MARITIME RUNNING PRIDE</div>
            </div>

            {/* Subtle background border decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-slate-200 dark:border-dark-700/80 rounded-2xl -z-0 pointer-events-none" />

          </div>

          {/* Right Column: Mission and Content */}
          <div id="about-content-column" className="lg:col-span-6 space-y-6">
            
            {/* Subtitle tag */}
            <div id="about-subtitle-tag" className="inline-flex items-center space-x-2 text-ocean dark:text-volt text-sm font-athletic font-bold uppercase tracking-widest">
              <span className="w-8 h-0.5 bg-ocean dark:bg-volt" />
              <span>Welcome to Run Nova Scotia</span>
            </div>

            {/* Heading */}
            <h2 id="about-heading" className="text-3xl sm:text-5xl font-athletic font-bold uppercase leading-tight text-slate-900 dark:text-white">
              Nova Scotia's Ultimate <br />
              <span className="text-ocean dark:text-volt">Road Running Community</span>
            </h2>

            <p id="about-lead-text" className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Run Nova Scotia is the non-profit provincial organization dedicated to road racing in Nova Scotia. 
              We support road races around the province, track age-class performance standings, support youth athletics, 
              and champion runners of every background.
            </p>

            {/* 4 Pillars Grid */}
            <div id="about-pillars-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} id={`about-pillar-${idx}`} className="bg-slate-50 dark:bg-dark-850/80 border border-slate-200 dark:border-dark-750 p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-ocean dark:text-volt flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div id="about-actions" className="pt-4 flex flex-wrap items-center gap-4">
              <button 
                id="about-join-btn"
                onClick={onJoinClick}
                className="bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold text-base uppercase tracking-wider px-7 py-3.5 rounded shadow-[0_0_20px_rgba(254,240,0,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Join the Pack for $35/Year
              </button>

              <a 
                id="about-points-link"
                href="#series-info"
                className="text-slate-700 hover:text-ocean dark:text-slate-300 dark:hover:text-volt font-athletic text-base uppercase tracking-wider px-4 py-3.5 transition-colors flex items-center space-x-1.5"
              >
                <span>How Points & Awards Work</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
