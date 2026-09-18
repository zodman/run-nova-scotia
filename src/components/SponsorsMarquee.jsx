import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { sponsorsData } from '../data/sponsorsData';

export default function SponsorsMarquee() {
  return (
    <section id="sponsors-section" className="py-20 bg-white dark:bg-[#081324] relative overflow-hidden transition-colors duration-300">
      <div id="sponsors" className="absolute -top-12" />
      <div id="sponsors-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title */}
        <div id="sponsors-header" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span id="sponsors-badge" className="text-xs uppercase font-athletic font-bold text-ocean dark:text-volt tracking-widest block">
            Official 2026/2027 Partners & Sponsors
          </span>
          <h3 id="sponsors-title" className="text-2xl sm:text-4xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
            Support Those Who Support <span className="text-ocean dark:text-volt">Nova Scotia Running</span>
          </h3>
          <p id="sponsors-description" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Special thanks to our generous corporate sponsors, healthcare partners, timing technicians, and local businesses powering every mile of the Road Race &amp; Performance Series across Nova Scotia.
          </p>
          <div className="pt-2">
            <a 
              id="sponsors-directory-link"
              href="https://runnovascotia.ca/our-sponsors/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-athletic uppercase tracking-wider font-semibold text-ocean hover:text-ocean-dark dark:text-volt dark:hover:text-[#e5d800] transition-colors"
            >
              <span>View Official Run Nova Scotia Sponsors Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sponsors Grid */}
        <div id="sponsors-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {sponsorsData.map((sponsor, idx) => {
            const CardWrapper = sponsor.website ? 'a' : 'div';
            const wrapperProps = sponsor.website ? {
              href: sponsor.website,
              target: '_blank',
              rel: 'noopener noreferrer',
              title: `Visit ${sponsor.name} website`
            } : {};

            return (
              <CardWrapper
                key={sponsor.id || idx}
                id={`sponsor-card-${sponsor.id || idx + 1}`}
                {...wrapperProps}
                className="bg-slate-50 hover:bg-white dark:bg-dark-850 dark:hover:bg-dark-800 border border-slate-200 dark:border-dark-750 hover:border-ocean/60 dark:hover:border-volt/60 rounded-2xl p-4 sm:p-5 text-center flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Company Logo Container */}
                  <div 
                    id={`sponsor-logo-wrap-${sponsor.id || idx + 1}`}
                    className="h-24 sm:h-28 w-full bg-white dark:bg-dark-900/95 rounded-xl p-3 flex items-center justify-center border border-slate-100 dark:border-dark-750/70 mb-4 overflow-hidden group-hover:border-ocean/40 dark:group-hover:border-volt/40 shadow-inner transition-colors"
                  >
                    <img 
                      id={`sponsor-logo-${sponsor.id || idx + 1}`}
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`}
                      className="max-h-16 sm:max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        if (sponsor.remoteLogo && e.target.src !== sponsor.remoteLogo) {
                          e.target.src = sponsor.remoteLogo;
                        }
                      }}
                    />
                  </div>

                  {/* Tier */}
                  <span className="text-[10px] uppercase font-athletic font-bold text-ocean dark:text-volt tracking-wider block mb-1">
                    {sponsor.tier}
                  </span>

                  {/* Company Name */}
                  <h4 className="text-sm sm:text-base font-athletic font-bold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt uppercase transition-colors line-clamp-2">
                    {sponsor.name}
                  </h4>

                  {/* Category */}
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight mt-1 line-clamp-2">
                    {sponsor.category}
                  </span>

                  {/* Member Perk / Highlight if present */}
                  {sponsor.description && (
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 bg-ocean/5 dark:bg-volt/10 border border-ocean/10 dark:border-volt/20 rounded-md p-1.5 mt-2.5 leading-snug line-clamp-3">
                      {sponsor.description}
                    </p>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-slate-200 dark:border-dark-750/70 mt-3 flex items-center justify-center space-x-1 text-[11px] font-athletic uppercase text-slate-500 dark:text-slate-400 group-hover:text-ocean dark:group-hover:text-volt font-semibold transition-colors">
                  {sponsor.website ? (
                    <>
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 group-hover:opacity-100" />
                    </>
                  ) : (
                    <span>{sponsor.location || 'Nova Scotia'}</span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
