import React from 'react';
import { Flame, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CtaBanner({ onJoinClick }) {
  return (
    <section id="cta-section" className="relative py-20 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-t border-dark-750 overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-volt/10 rounded-full blur-3xl pointer-events-none" />

      <div id="cta-container" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div id="cta-card" className="bg-dark-950/80 border border-volt/30 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-volt to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div id="cta-badge" className="inline-flex items-center space-x-2 text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest">
                <Flame className="w-4 h-4 text-volt" />
                <span>2026/2027 Season Is Here</span>
              </div>

              <h2 id="cta-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase text-white tracking-tight leading-none">
                Ready to Lace Up With <br />
                <span className="text-volt">Nova Scotia's Running Pack?</span>
              </h2>

              <p id="cta-description" className="text-slate-300 text-sm sm:text-base max-w-xl">
                Become a Run Nova Scotia member today for just $35. Receive your exclusive annual technical race shirt, 
                save on all 20+ road races, and earn points towards provincial awards!
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                id="cta-join-btn"
                onClick={onJoinClick}
                className="w-full py-4 px-8 bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold text-lg uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(254,240,0,0.35)] hover:shadow-[0_0_40px_rgba(254,240,0,0.6)] transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Join Run NS Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                id="cta-contact-email-btn"
                href="mailto:admin@runnovascotia.ca"
                className="w-full py-3.5 px-6 bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-dark-700 rounded-xl font-athletic text-sm uppercase tracking-wider text-center transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4 text-volt" />
                <span>admin@runnovascotia.ca</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
