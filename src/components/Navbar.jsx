import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  Calendar, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';

export default function Navbar({ onOpenJoinModal, onSelectRaceFilter }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Top micro-bar with contact and quick announcements */}
      <div id="top-bar" className="bg-[#040b16] border-b border-dark-750 text-xs py-2 px-4 sm:px-8 hidden md:block">
        <div id="top-small-menu" className="max-w-7xl mx-auto flex justify-between items-center text-slate-300">
          <div id="top-bar-announcements" className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Flame className="w-3.5 h-3.5 text-volt" />
              <span>2026 Run Nova Scotia Road Race Series Registration Is Open!</span>
            </span>
            <span className="text-dark-600">•</span>
            <a href="mailto:admin@runnovascotia.ca" className="flex items-center space-x-1.5 hover:text-volt transition-colors">
              <Mail className="w-3.5 h-3.5 text-volt" />
              <span>admin@runnovascotia.ca</span>
            </a>
          </div>

          <div id="top-bar-right" className="flex items-center space-x-5 text-slate-400">
            <span id="top-bar-tagline" className="hidden lg:inline">Nova Scotia's Road Running Association Since 1984</span>
            <span className="text-dark-600 hidden lg:inline">•</span>
            
            {/* Social Media Links */}
            <div id="top-bar-social-links" className="flex items-center space-x-3 text-slate-300">
              <a 
                id="top-social-facebook"
                href="https://www.facebook.com/RunInNovaScotia" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Follow Run Nova Scotia on Facebook"
                aria-label="Run Nova Scotia on Facebook"
                className="hover:text-volt transition-colors p-1"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                id="top-social-instagram"
                href="https://www.instagram.com/runnovascotia" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Follow Run Nova Scotia on Instagram"
                aria-label="Run Nova Scotia on Instagram"
                className="hover:text-volt transition-colors p-1"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                id="top-social-twitter"
                href="https://x.com/runnovascotia" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Follow Run Nova Scotia on X (Twitter)"
                aria-label="Run Nova Scotia on X"
                className="hover:text-volt transition-colors p-1"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a 
                id="top-social-strava"
                href="https://www.strava.com/clubs/runnovascotia" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Join Run Nova Scotia on Strava"
                aria-label="Run Nova Scotia on Strava"
                className="hover:text-volt transition-colors p-1"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.925 15.65h4.172"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header id="main-header" className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#040b16]/95 backdrop-blur-md shadow-2xl py-3 border-b border-dark-700/80' 
          : 'bg-[#040b16] py-4 border-b border-dark-800'
      }`}>
        <div id="navbar-container" className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a id="navbar-logo" href="#" className="flex items-center space-x-3 group">
            <div className="relative flex items-center">
              <img 
                src="/images/rns-logo.png" 
                alt="Run Nova Scotia" 
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://runnovascotia.ca/wp-content/uploads/2023/02/run-nova-scotia-logo-01.png";
                }}
              />
              <span className="sr-only">Run Nova Scotia</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="navbar-desktop-menu" className="hidden lg:flex items-center space-x-8">
            {/* About Dropdown */}
            <div id="nav-dropdown-about" className="relative group">
              <button 
                id="nav-btn-about"
                onClick={() => toggleDropdown('about')}
                className="flex items-center space-x-1.5 text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2"
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div id="nav-menu-about-dropdown" className="absolute left-0 top-full mt-1 w-64 bg-[#14181d] border border-dark-700 rounded-lg shadow-2xl p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <a id="nav-link-about-rns" href="#about" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  About Run Nova Scotia
                </a>
                <a id="nav-link-about-board" href="#board" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Management Board
                </a>
                <a id="nav-link-about-life-members" href="#life-members" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Honorary Life Members
                </a>
                <a id="nav-link-about-sponsors" href="#sponsors" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Official Sponsors & Partners
                </a>
              </div>
            </div>

            {/* Races & Series Dropdown */}
            <div id="nav-dropdown-races" className="relative group">
              <button 
                id="nav-btn-races"
                onClick={() => toggleDropdown('races')}
                className="flex items-center space-x-1.5 text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2"
              >
                <span>Races & Series</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div id="nav-menu-races-dropdown" className="absolute left-0 top-full mt-1 w-64 bg-[#14181d] border border-dark-700 rounded-lg shadow-2xl p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <a id="nav-link-races-series" href="#events" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  2026 Road Race Series
                </a>
                <a id="nav-link-races-performance" href="#series-info" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Performance Series
                </a>
                <a id="nav-link-races-points" href="#series-info" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Points Accumulation Rules
                </a>
                <a id="nav-link-races-youth" href="#clubs" className="block px-3 py-2 text-sm text-slate-300 hover:text-black hover:bg-volt rounded transition-colors">
                  Youth Running Series
                </a>
              </div>
            </div>

            <a id="nav-link-events" href="#events" className="text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2">
              Events Calendar
            </a>

            <a id="nav-link-membership" href="#membership" className="text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2">
              Membership
            </a>

            <a id="nav-link-clubs" href="#clubs" className="text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2">
              Run Clubs
            </a>

            <a id="nav-link-contact" href="#contact" className="text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-volt transition-colors py-2">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div id="navbar-cta-container" className="hidden lg:flex items-center space-x-3.5">
            <button 
              id="navbar-join-btn"
              onClick={onOpenJoinModal}
              className="relative group overflow-hidden bg-volt hover:bg-[#E5D800] text-black font-athletic text-base tracking-wider uppercase px-6 py-2.5 rounded font-bold transition-all shadow-[0_0_20px_rgba(254,240,0,0.35)] hover:shadow-[0_0_30px_rgba(254,240,0,0.55)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>Join Run NS</span>
                <span className="text-sm">→</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div id="mobile-menu-btn-container" className="flex items-center space-x-2.5 lg:hidden">
            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-volt rounded-lg focus:outline-none border border-dark-700 bg-dark-800 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="lg:hidden bg-[#040b16] border-b border-dark-700 px-6 py-6 transition-all shadow-2xl">
            <div id="mobile-navigation-links" className="flex flex-col space-y-4">
              <a 
                id="mobile-link-about"
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                About Run Nova Scotia
              </a>
              <a 
                id="mobile-link-events"
                href="#events" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                2026 Road Race Series
              </a>
              <a 
                id="mobile-link-series"
                href="#series-info" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                Performance Series & Points
              </a>
              <a 
                id="mobile-link-membership"
                href="#membership" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                Membership Plans & Perks
              </a>
              <a 
                id="mobile-link-clubs"
                href="#clubs" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                Nova Scotia Run Clubs
              </a>
              <a 
                id="mobile-link-contact"
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-200 hover:text-volt"
              >
                Contact & Volunteer
              </a>

              <div id="mobile-join-btn-wrapper" className="pt-4 border-t border-dark-700">
                <button
                  id="mobile-join-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoinModal();
                  }}
                  className="w-full py-3 text-center bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold text-lg tracking-wider uppercase rounded shadow-[0_0_20px_rgba(254,240,0,0.35)] cursor-pointer"
                >
                  Join Run Nova Scotia Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
