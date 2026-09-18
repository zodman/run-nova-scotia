import React from 'react';
import { sponsorsData } from '../data/sponsorsData';

export default function SponsorsMarquee() {
  return (
    <section id="sponsors-section" className="py-20 bg-white dark:bg-[#081324] relative overflow-hidden transition-colors duration-300">
      <div id="sponsors" className="absolute -top-12" />
      <div id="sponsors-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title */}
        <div id="sponsors-header" className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span id="sponsors-badge" className="text-xs uppercase font-athletic font-bold text-ocean dark:text-volt tracking-widest block">
            Official 2026/2027 Partners
          </span>
          <h3 id="sponsors-title" className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
            Support Those Who Support <span className="text-ocean dark:text-volt">Nova Scotia Running</span>
          </h3>
          <p id="sponsors-description" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Special thanks to our generous sponsors and technical partners powering every mile of the Road Race & Performance Series.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div id="sponsors-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sponsorsData.map((sponsor, idx) => (
            <div 
              key={idx}
              id={`sponsor-card-${idx + 1}`}
              className="bg-slate-50 hover:bg-white dark:bg-dark-850 dark:hover:bg-dark-800 border border-slate-200 dark:border-dark-750 hover:border-ocean/60 dark:hover:border-volt/60 rounded-xl p-5 text-center flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-ocean dark:text-volt tracking-wider block mb-1">
                  {sponsor.tier}
                </span>
                <h4 className="text-base font-athletic font-bold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt uppercase transition-colors">
                  {sponsor.name}
                </h4>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-dark-750/70 mt-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">
                  {sponsor.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
