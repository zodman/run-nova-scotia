import React, { useMemo } from 'react';
import { ChevronRight, Calendar, Award, ShieldCheck, Flame, ArrowUpRight, MapPin, ExternalLink, Car } from 'lucide-react';
import { eventsData, isEventPending, getEventDaysDelta, getEventRelativeTime } from '../data/eventsData';

export default function HeroBanner({ onExploreRaces, onJoinClick, onSelectEvent }) {
  // Dynamically select the NEXT upcoming event from today
  const nextEvent = useMemo(() => {
    const upcoming = eventsData
      .filter(e => isEventPending(e.isoDate))
      .sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    return upcoming.length > 0 ? upcoming[0] : eventsData[0];
  }, []);

  const daysDelta = nextEvent ? getEventDaysDelta(nextEvent.isoDate) : 0;
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center bg-slate-100 dark:bg-[#040b17] overflow-hidden transition-colors duration-300">
      
      {/* Background with runner action image with vivid clarity and subtle readability mask */}
      <div id="hero-background" className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=2000&q=90" 
          alt="Road runners in Nova Scotia" 
          className="w-full h-full object-cover object-center sm:object-[center_35%] opacity-80 sm:opacity-90 dark:opacity-75 sm:dark:opacity-85 filter brightness-100 contrast-105 saturate-105 transition-opacity duration-500"
        />
        {/* Soft horizontal gradient prioritizing text legibility on left while keeping runners clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-slate-100/60 to-slate-100/20 lg:to-transparent dark:from-[#040b17]/90 dark:via-[#040b17]/55 dark:to-[#040b17]/15 dark:lg:to-transparent" />
        
        {/* Subtle vertical edge blends for seamless section transitions */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-100 dark:from-[#040b17] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-100/60 dark:from-[#040b17]/60 to-transparent pointer-events-none" />
      </div>

      {/* Decorative Subtle Glowing Accents */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-volt/10 dark:bg-volt/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-ocean/10 dark:bg-ocean/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Hero Content */}
      <div id="hero-content-wrapper" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
        <div id="hero-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings & CTAs */}
          <div id="hero-intro-column" className="lg:col-span-8 space-y-6">
            
            {/* Athletic Badge Pill */}
            <div id="hero-badge-pill" className="inline-flex items-center space-x-2.5 bg-white/80 dark:bg-dark-900/60 backdrop-blur-md border border-volt/60 dark:border-volt/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-800 dark:text-slate-200 shadow-sm dark:shadow-[0_0_15px_rgba(254,240,0,0.2)]">
              <span className="w-2.5 h-2.5 rounded-full bg-volt animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-volt -ml-4" />
              <span className="text-volt-800 dark:text-volt font-bold">40+ Years of Running</span>
              <span className="text-slate-300 dark:text-dark-500">|</span>
              <span className="text-ocean dark:text-ice font-medium">Yarmouth to Sydney</span>
            </div>

            {/* Main Headline */}
            <div id="hero-headline-wrapper" className="space-y-2">
              <h1 id="hero-headline" className="text-4xl sm:text-6xl xl:text-7xl font-athletic font-extrabold tracking-tight uppercase leading-[0.95] text-slate-900 dark:text-white">
                Promoting Road <br className="hidden sm:inline" />
                Running in <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean via-ocean-600 to-ocean-800 dark:from-volt dark:via-amber-300 dark:to-ice">Nova Scotia</span>
              </h1>
              <p id="hero-subtitle" className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed pt-2">
                Health, fitness, and camaraderie for runners of <strong className="text-slate-900 dark:text-white font-semibold">all ages and abilities</strong>. 
                Supporting everyone from first-time 5K finishers to Boston Marathon qualifiers across our beautiful ocean province.
              </p>
            </div>

            {/* Action Buttons */}
            <div id="hero-actions" className="flex flex-wrap gap-4 pt-4">
              <button 
                id="hero-explore-races-btn"
                onClick={onExploreRaces}
                className="group relative inline-flex items-center space-x-3 bg-volt hover:bg-[#e5d800] text-black font-athletic text-lg font-bold uppercase tracking-wider px-8 py-4 rounded transition-all duration-300 shadow-[0_0_25px_rgba(254,240,0,0.35)] hover:shadow-[0_0_40px_rgba(254,240,0,0.6)] transform hover:-translate-y-1 cursor-pointer"
              >
                <span>Explore 2026 Races</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button 
                id="hero-join-rns-btn"
                onClick={onJoinClick}
                className="group inline-flex items-center space-x-3 bg-white/80 hover:bg-white text-slate-900 hover:text-ocean dark:bg-dark-900/60 dark:hover:bg-dark-800/80 dark:text-white dark:hover:text-volt font-athletic text-lg font-semibold uppercase tracking-wider px-8 py-4 rounded border border-slate-300 dark:border-dark-600/70 hover:border-ocean dark:hover:border-volt/60 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>Join Run NS ($35/yr)</span>
                <ArrowUpRight className="w-5 h-5 text-ocean dark:text-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Quick Feature Tickers */}
            <div id="hero-feature-tickers" className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200 dark:border-dark-750 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div id="ticker-sanctioned" className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                <span>Sanctioned Race Timing</span>
              </div>
              <div id="ticker-banquet" className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                <span>Annual Awards Banquet</span>
              </div>
              <div id="ticker-points" className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                <span>Provincial Age-Class Points</span>
              </div>
            </div>

          </div>

          {/* Right Column: Next Upcoming Event Card */}
          <div id="hero-signature-column" className="lg:col-span-4 relative">
            <div id="hero-featured-card" className="relative bg-white/85 dark:bg-dark-900/60 backdrop-blur-md border border-slate-200/90 dark:border-dark-700/70 rounded-2xl p-6 shadow-xl dark:shadow-2xl overflow-hidden group hover:border-ocean/40 dark:hover:border-volt/50 transition-all">
              
              {/* Top Accent Stripe with Gold and Ocean Blue */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-volt via-ice to-ocean" />

              <div id="hero-featured-card-header" className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-dark-750/70">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                    <span id="hero-featured-eyebrow" className="text-xs font-semibold tracking-wider uppercase text-ocean dark:text-volt">
                      Next Event From Today
                    </span>
                  </div>
                  <h3 id="hero-featured-card-title" className="text-xl font-athletic font-bold text-slate-900 dark:text-white uppercase mt-1 line-clamp-2">
                    {nextEvent.name}
                  </h3>
                </div>
                <div id="hero-featured-badge" className="w-12 h-12 rounded-xl bg-volt/20 dark:bg-volt/10 border border-volt/50 dark:border-volt/40 flex flex-col items-center justify-center text-slate-900 dark:text-volt font-bold text-xs flex-shrink-0 ml-2">
                  <span className="text-[10px] uppercase font-mono font-normal text-slate-500 dark:text-slate-300">Days</span>
                  <span className="font-athletic text-base font-extrabold text-black dark:text-volt leading-none">{daysDelta}d</span>
                </div>
              </div>

              <div id="hero-featured-card-details" className="py-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                    <span>Date:</span>
                  </span>
                  <span id="hero-featured-date" className="font-medium text-slate-900 dark:text-white text-right">{nextEvent.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                    <Flame className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                    <span>Happens:</span>
                  </span>
                  <span id="hero-featured-relative-time" className="font-bold text-ocean dark:text-volt text-right font-athletic uppercase tracking-wider text-xs">
                    {getEventRelativeTime(nextEvent.isoDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                    <span>Location:</span>
                  </span>
                  <a
                    id="hero-featured-location"
                    href={nextEvent.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextEvent.location + ', Nova Scotia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-900 dark:text-white hover:text-ocean dark:hover:text-volt text-right flex items-center space-x-1 underline decoration-dotted transition-colors"
                    title="Open location in Google Maps"
                  >
                    <span>{nextEvent.location}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                    <Car className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                    <span>Drive (Hfx/Dart):</span>
                  </span>
                  <a
                    id="hero-featured-drive-link"
                    href={nextEvent.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextEvent.location + ', Nova Scotia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-900 dark:text-white hover:text-ocean dark:hover:text-volt text-right flex items-center space-x-1 text-xs underline decoration-dotted transition-colors"
                    title="View route on Google Maps"
                  >
                    <span>{nextEvent.driveTimeFromHalifax || '1 hr (tentative - needs confirm)'}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Distances:</span>
                  <div id="hero-featured-distances" className="flex flex-wrap gap-1 justify-end">
                    {nextEvent.distances.slice(0, 4).map((dist, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-dark-800/80 text-slate-800 dark:text-volt rounded font-mono border border-slate-200 dark:border-dark-700/50">
                        {dist}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">RNS Discount:</span>
                  <span className="text-ocean-700 dark:text-volt font-semibold">Members save 5%+</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  id="hero-featured-card-details-btn"
                  onClick={() => onSelectEvent ? onSelectEvent(nextEvent) : onExploreRaces()}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-dark-800/80 dark:hover:bg-dark-700/90 dark:text-slate-200 dark:hover:text-volt text-center font-athletic text-xs uppercase tracking-wider rounded transition-colors duration-200 flex items-center justify-center space-x-1 cursor-pointer border border-slate-300 dark:border-dark-700/70 backdrop-blur-sm"
                >
                  <span>Race Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a 
                  id="hero-featured-card-register-btn"
                  href={nextEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold text-xs uppercase tracking-wider rounded transition-colors duration-200 flex items-center justify-center space-x-1 cursor-pointer shadow-[0_0_15px_rgba(254,240,0,0.3)]"
                >
                  <span>Register</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Floating Mini-badge */}
              <div id="hero-anniversary-badge" className="mt-4 p-3 bg-slate-100/90 dark:bg-dark-950/60 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-dark-700/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-volt text-black flex items-center justify-center font-bold text-xs">
                  40
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <p className="font-medium text-slate-900 dark:text-white">1984 – 2026 & Beyond</p>
                  <p className="text-slate-500 dark:text-slate-400">Celebrating four decades on the road</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
