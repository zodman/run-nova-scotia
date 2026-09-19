import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, ShieldCheck, Send, ExternalLink } from 'lucide-react';

export default function Footer({ onJoinClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer-section" className="bg-slate-950 dark:bg-[#040b16] text-slate-400 border-t border-slate-800 dark:border-dark-800 pt-16 pb-10 relative transition-colors duration-300">
      <div id="contact" className="absolute -top-12" />
      <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Grid */}
        <div id="footer-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-dark-800">
          
          {/* Col 1: Brand & Mission */}
          <div id="footer-col-brand" className="lg:col-span-4 space-y-4">
            <a id="footer-logo-link" href="#" className="inline-block">
              <img 
                id="footer-logo"
                src="./images/rns-logo.png" 
                alt="Run Nova Scotia" 
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./images/rns-logo.png";
                }}
              />
            </a>
            <p id="footer-mission" className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Run Nova Scotia is a volunteer-led, non-profit society dedicated to promoting health, fitness, 
              and camaraderie through the sport of road running since 1984.
            </p>
            <div id="footer-society-reg" className="pt-2 text-xs text-slate-500 font-mono">
              Society Registration: #1181285
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div id="footer-col-explore" className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-athletic font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul id="footer-explore-links" className="space-y-2 text-xs sm:text-sm">
              <li><a id="footer-link-about" href="#about" className="hover:text-volt transition-colors">About Run NS</a></li>
              <li><a id="footer-link-events" href="#events" className="hover:text-volt transition-colors">2026 Race Calendar</a></li>
              <li><a id="footer-link-series-info" href="#series-info" className="hover:text-volt transition-colors">Road Race Series</a></li>
              <li><a id="footer-link-performance" href="#series-info" className="hover:text-volt transition-colors">Performance Series</a></li>
              <li><a id="footer-link-membership" href="#membership" className="hover:text-volt transition-colors">Membership Perks</a></li>
            </ul>
          </div>

          {/* Col 3: Programs & Community */}
          <div id="footer-col-community" className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-athletic font-bold uppercase tracking-wider text-white">
              Community & Series
            </h4>
            <ul id="footer-community-links" className="space-y-2 text-xs sm:text-sm">
              <li><a id="footer-link-points" href="#series-info" className="hover:text-volt transition-colors">Points Accumulation Rules</a></li>
              <li><a id="footer-link-youth" href="#clubs" className="hover:text-volt transition-colors">Youth Running Series</a></li>
              <li><a id="footer-link-clubs" href="#clubs" className="hover:text-volt transition-colors">Nova Scotia Run Clubs</a></li>
              <li><a id="footer-link-board" href="#clubs" className="hover:text-volt transition-colors">Management Board</a></li>
              <li><a id="footer-link-life-members" href="#clubs" className="hover:text-volt transition-colors">Honorary Life Members</a></li>
              <li><a id="footer-link-sponsors" href="#sponsors" className="hover:text-volt transition-colors">Our Official Sponsors</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div id="footer-col-newsletter" className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-athletic font-bold uppercase tracking-wider text-white">
              Members Newsletter
            </h4>
            <p id="footer-newsletter-desc" className="text-xs text-slate-400">
              Get road race registration alerts, course updates, and provincial standings in your inbox.
            </p>

            {subscribed ? (
              <div id="footer-newsletter-success" className="p-3 bg-dark-850 border border-volt/40 rounded-lg text-xs text-volt font-medium flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-volt flex-shrink-0" />
                <span>Thank you! You are subscribed to Run NS updates.</span>
              </div>
            ) : (
              <form id="footer-newsletter-form" onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  id="footer-newsletter-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  required
                  className="w-full pl-3.5 pr-12 py-2.5 bg-dark-900 border border-dark-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
                />
                <button
                  id="footer-newsletter-submit-btn"
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-volt hover:bg-[#e5d800] text-black flex items-center justify-center transition-colors shadow"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div id="footer-contact-info" className="pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-volt" />
                <a id="footer-contact-email" href="mailto:admin@runnovascotia.ca" className="hover:text-white transition-colors">
                  admin@runnovascotia.ca
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-volt" />
                <span id="footer-contact-location">Halifax / Dartmouth, Nova Scotia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div id="footer-bottom-bar" className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div id="footer-copyright" className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} Run Nova Scotia. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1">
              <span>👟 Coded at a 4:30/km pace by</span>{' '}
              <a 
                id="footer-attribution-andres"
                href="https://www.strava.com/athletes/zodman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-volt font-medium inline-flex items-center gap-1 transition-colors underline decoration-slate-600 hover:decoration-volt underline-offset-2 cursor-pointer"
                title="Andres Vargas on Strava"
              >
                <span>Andres Vargas</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </span>
          </div>
          <div id="footer-bottom-links" className="flex items-center space-x-6">
            <a id="footer-link-constitution" href="#about" className="hover:text-slate-300 transition-colors">Constitution & By-Laws</a>
            <span>•</span>
            <a id="footer-link-volunteer" href="#contact" className="hover:text-slate-300 transition-colors">Volunteer With Us</a>
            <span>•</span>
            <button id="footer-join-roster-btn" onClick={onJoinClick} className="text-volt hover:underline cursor-pointer">
              Join the 2026/2027 Roster
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
