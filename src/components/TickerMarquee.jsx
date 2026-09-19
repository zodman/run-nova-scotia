import React from 'react';

export default function TickerMarquee() {
  const items = [
    "RUN NOVA SCOTIA",
    "2026 ROAD RACE SERIES",
    "40+ YEARS PROMOTING RUNNING",
    "5K • 10K • HALF • MARATHON",
    "YARMOUTH TO SYDNEY",
    "SANCTIONED AGE-CLASS SCORING",
    "ANNUAL MEMBER TECH SHIRT",
    "BOSTON QUALIFIERS",
    "YOUTH RUNNING SERIES",
    "NON-PROFIT & 100% VOLUNTEER"
  ];

  return (
    <div id="ticker-marquee-container" className="bg-volt text-black py-3.5 overflow-hidden select-none border-y-2 border-dark-950 relative z-20 shadow-[0_0_25px_rgba(254,240,0,0.3)]">
      <div id="ticker-marquee-track-wrapper" className="flex w-max animate-marquee font-athletic font-black text-lg sm:text-xl tracking-wider uppercase">
        
        {/* First track */}
        <div id="ticker-marquee-track-1" className="flex items-center space-x-8 px-4">
          {items.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center space-x-8">
              <span>{item}</span>
              <span className="inline-block w-2.5 h-2.5 rotate-45 bg-black" />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless loop */}
        <div id="ticker-marquee-track-2" className="flex items-center space-x-8 px-4" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center space-x-8">
              <span>{item}</span>
              <span className="inline-block w-2.5 h-2.5 rotate-45 bg-black" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
