import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  ChevronRight,
  Calendar, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Flame,
  Sun,
  Moon,
  Trophy,
  Zap,
  Clock,
  Compass
} from 'lucide-react';

// ============================================================================
// Amazon Mega Dropdown Directional Aiming Algorithm (Ben Kamens / Amazon technique)
// Source: https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown
// Prevents menu flickering or closing when the mouse moves diagonally into submenus.
// ============================================================================

function isPointInTriangle(p, a, b, c) {
  const sign = (p1, p2, p3) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = sign(p, a, b);
  const d2 = sign(p, b, c);
  const d3 = sign(p, c, a);
  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
  return !(hasNeg && hasPos);
}

function isAimingAtMenu(pCurr, pPrev, rect) {
  if (!rect || !pPrev || !pCurr) return false;
  if (pCurr.x >= rect.left && pCurr.x <= rect.right && pCurr.y >= rect.top && pCurr.y <= rect.bottom) {
    return true;
  }
  const topLeft = { x: rect.left, y: rect.top };
  const topRight = { x: rect.right, y: rect.top };
  const bottomLeft = { x: rect.left, y: rect.bottom };
  const bottomRight = { x: rect.right, y: rect.bottom };

  return (
    isPointInTriangle(pCurr, pPrev, topLeft, bottomRight) ||
    isPointInTriangle(pCurr, pPrev, topRight, bottomLeft) ||
    isPointInTriangle(pCurr, pPrev, topLeft, topRight)
  );
}

export default function Navbar({ theme = 'dark', onToggleTheme, onOpenJoinModal, onSelectRaceFilter, onExplorePerformance }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const mouseLocsRef = useRef([]);
  const timeoutRef = useRef(null);
  const activeMenuPanelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseLocsRef.current.push({ x: e.clientX, y: e.clientY });
      if (mouseLocsRef.current.length > 5) {
        mouseLocsRef.current.shift();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const clearDelayTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleNavTriggerEnter = (menuName) => {
    clearDelayTimeout();

    if (activeDropdown && activeDropdown !== menuName && activeMenuPanelRef.current) {
      const prevLoc = mouseLocsRef.current[0];
      const currLoc = mouseLocsRef.current[mouseLocsRef.current.length - 1];
      const rect = activeMenuPanelRef.current.getBoundingClientRect();

      if (isAimingAtMenu(currLoc, prevLoc, rect)) {
        timeoutRef.current = setTimeout(() => {
          setActiveDropdown(menuName);
        }, 300);
        return;
      }
    }

    setActiveDropdown(menuName);
  };

  const handleNavTriggerLeave = () => {
    clearDelayTimeout();
    if (!activeDropdown || !activeMenuPanelRef.current) {
      setActiveDropdown(null);
      return;
    }

    const prevLoc = mouseLocsRef.current[0];
    const currLoc = mouseLocsRef.current[mouseLocsRef.current.length - 1];
    const rect = activeMenuPanelRef.current.getBoundingClientRect();

    if (isAimingAtMenu(currLoc, prevLoc, rect)) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 350);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleDropdownEnter = () => {
    clearDelayTimeout();
  };

  const handleDropdownLeave = (e) => {
    clearDelayTimeout();
    const toElement = e.relatedTarget;
    if (toElement && toElement.closest && toElement.closest('#navbar-desktop-menu')) {
      return;
    }
    setActiveDropdown(null);
  };

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
          ? 'bg-white/95 dark:bg-[#040b16]/95 backdrop-blur-md shadow-md dark:shadow-2xl py-3 border-b border-slate-200 dark:border-dark-700/80' 
          : 'bg-white/90 dark:bg-[#040b16] backdrop-blur-sm py-4 border-b border-slate-200/80 dark:border-dark-800'
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

          {/* Desktop Navigation Links with Amazon Mega Dropdown Menu-Aim */}
          <nav 
            id="navbar-desktop-menu" 
            className="hidden lg:flex items-center space-x-8 relative"
          >
            {/* About Dropdown (Protected by Amazon Menu-Aim) */}
            <div 
              id="nav-dropdown-about" 
              className="relative"
              onMouseEnter={() => handleNavTriggerEnter('about')}
              onMouseLeave={handleNavTriggerLeave}
            >
              <button 
                id="nav-btn-about"
                onClick={() => toggleDropdown('about')}
                className={`flex items-center space-x-1.5 text-sm font-semibold tracking-wider uppercase transition-colors py-2 cursor-pointer ${
                  activeDropdown === 'about'
                    ? 'text-ocean dark:text-volt'
                    : 'text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-ocean dark:text-volt' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div 
                  ref={activeMenuPanelRef}
                  id="nav-menu-about-dropdown" 
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-[#0c121d] border border-slate-200 dark:border-dark-700 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn space-y-1.5 backdrop-blur-md"
                >
                  <a 
                    id="nav-link-about-rns" 
                    href="#about" 
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 dark:text-slate-300 dark:hover:text-volt dark:hover:bg-dark-800 transition-colors"
                  >
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">About Run Nova Scotia</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Our mission, 40-year history, and community</div>
                  </a>
                  <a 
                    id="nav-link-about-board" 
                    href="#board" 
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 dark:text-slate-300 dark:hover:text-volt dark:hover:bg-dark-800 transition-colors"
                  >
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">Management Board</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Volunteer leadership and directors</div>
                  </a>
                  <a 
                    id="nav-link-about-life-members" 
                    href="#life-members" 
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 dark:text-slate-300 dark:hover:text-volt dark:hover:bg-dark-800 transition-colors"
                  >
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">Honorary Life Members</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Celebrating 40 years of provincial pioneers</div>
                  </a>
                  <a 
                    id="nav-link-about-sponsors" 
                    href="#sponsors" 
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 dark:text-slate-300 dark:hover:text-volt dark:hover:bg-dark-800 transition-colors"
                  >
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">Official Sponsors & Partners</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Supporting athletes and local road races</div>
                  </a>
                </div>
              )}
            </div>

            {/* Races & Series MEGA DROPDOWN (Protected by Amazon Menu-Aim Technique) */}
            <div 
              id="nav-dropdown-races" 
              className="relative"
              onMouseEnter={() => handleNavTriggerEnter('races')}
              onMouseLeave={handleNavTriggerLeave}
            >
              <button 
                id="nav-btn-races"
                onClick={() => toggleDropdown('races')}
                className={`flex items-center space-x-1.5 text-sm font-semibold tracking-wider uppercase transition-colors py-2 cursor-pointer ${
                  activeDropdown === 'races'
                    ? 'text-ocean dark:text-volt'
                    : 'text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt'
                }`}
              >
                <span>Races & Series</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'races' ? 'rotate-180 text-ocean dark:text-volt' : ''}`} />
              </button>

              {/* Amazon-Style Mega Dropdown Panel */}
              {activeDropdown === 'races' && (
                <div 
                  ref={activeMenuPanelRef}
                  id="nav-menu-races-dropdown" 
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[820px] bg-white dark:bg-[#0c121d] border border-slate-200 dark:border-dark-700 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn backdrop-blur-md"
                >
                  {/* Mega Menu Top Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-dark-800">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-ocean dark:text-volt" />
                      <span className="text-xs uppercase font-athletic font-bold tracking-widest text-slate-900 dark:text-white">
                        Run Nova Scotia Race & Series Directory
                      </span>
                    </div>
                    <a
                      href="#events"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-athletic font-bold uppercase tracking-wider text-ocean dark:text-volt hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Explore All 29 Races</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* 4-Column Structured Mega Grid */}
                  <div className="grid grid-cols-4 gap-6">
                    {/* Column 1: Road Race Series */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-athletic font-bold tracking-wider text-ocean dark:text-volt flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Road Race Series</span>
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a
                            id="nav-link-races-series"
                            href="#events"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">2026 Schedule</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Provincial sanctioned races</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#events"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Boston Qualifiers</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Blue Nose, Cape Breton, Valley</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#series-info"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Series Divisions</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Open, Masters (40+), Senior</div>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: Performance Series (Dr. Jeff Ratushny) */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-athletic font-bold tracking-wider text-ocean dark:text-volt flex items-center space-x-1.5">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Performance Series</span>
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a
                            id="nav-link-races-performance"
                            href="#events"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              if (onExplorePerformance) onExplorePerformance();
                            }}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors cursor-pointer"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Dr. Jeff Ratushny Races</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Qualifying 5K, 10K, Half events</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://runnovascotia.ca/performance-series/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt flex items-center space-x-1">
                              <span>Official Scoring Rules</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Combined Gun Time competition</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#events"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              if (onExplorePerformance) onExplorePerformance();
                            }}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors cursor-pointer"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Cash Prizes & Trophies</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Awarded at annual banquet</div>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: Youth & Special Events */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-athletic font-bold tracking-wider text-ocean dark:text-volt flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>Youth & Special</span>
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a
                            id="nav-link-races-youth"
                            href="#clubs"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Youth Running Series</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Under-18 provincial division</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#events"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Novelty & Fun Runs</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Polar Bear Dip, Beer Run</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#events"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Awards Celebration</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Dartmouth Yacht Club gala</div>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column 4: Timing & Racer Resources */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-athletic font-bold tracking-wider text-ocean dark:text-volt flex items-center space-x-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Timing & Points</span>
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a
                            id="nav-link-races-points"
                            href="#series-info"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Points Accumulation</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Best 7 sanctioned races count</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://atlanticchip.ca/events/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt flex items-center space-x-1">
                              <span>Atlantic Chip Timing</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Live chip results & rankings</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#membership"
                            onClick={() => setActiveDropdown(null)}
                            className="group block text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-ocean dark:group-hover:text-volt">Member Race Discounts</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Save 5%+ on race entries</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Mega Menu Footer Callout */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-dark-800 bg-slate-50/80 dark:bg-dark-900/60 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0" />
                      <span>Official Governing Road Running Association of Nova Scotia since 1984</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenJoinModal();
                      }}
                      className="px-3.5 py-1.5 bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-colors shadow-sm"
                    >
                      Join Run NS
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a id="nav-link-events" href="#events" className="text-sm font-semibold tracking-wider uppercase text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt transition-colors py-2">
              Events Calendar
            </a>

            <a id="nav-link-membership" href="#membership" className="text-sm font-semibold tracking-wider uppercase text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt transition-colors py-2">
              Membership
            </a>

            <a id="nav-link-clubs" href="#clubs" className="text-sm font-semibold tracking-wider uppercase text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt transition-colors py-2">
              Run Clubs
            </a>

            <a id="nav-link-contact" href="#contact" className="text-sm font-semibold tracking-wider uppercase text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt transition-colors py-2">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div id="navbar-cta-container" className="hidden lg:flex items-center space-x-3.5">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
              className="p-2.5 rounded-lg text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-volt dark:bg-dark-800 dark:hover:bg-dark-750 border border-slate-200 dark:border-dark-700 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-volt" />
              ) : (
                <Moon className="w-4 h-4 text-ocean" />
              )}
            </button>

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
          <div id="mobile-menu-btn-container" className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
              className="p-2 rounded-lg text-slate-700 bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-dark-800 dark:border-dark-700 cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-volt" />
              ) : (
                <Moon className="w-5 h-5 text-ocean" />
              )}
            </button>

            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-black bg-slate-100 border border-slate-200 dark:text-slate-200 dark:hover:text-volt dark:border-dark-700 dark:bg-dark-800 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="lg:hidden bg-white dark:bg-[#040b16] border-b border-slate-200 dark:border-dark-700 px-6 py-6 transition-all shadow-2xl">
            <div id="mobile-navigation-links" className="flex flex-col space-y-4">
              <a 
                id="mobile-link-about"
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
              >
                About Run Nova Scotia
              </a>
              <a 
                id="mobile-link-events"
                href="#events" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
              >
                2026 Road Race Series
              </a>
              <a 
                id="mobile-link-performance"
                href="#events" 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onExplorePerformance) {
                    e.preventDefault();
                    onExplorePerformance();
                  }
                }}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
              >
                Performance Series (Dr. Jeff Ratushny)
              </a>
              <a 
                id="mobile-link-membership"
                href="#membership" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
              >
                Membership Plans & Perks
              </a>
              <a 
                id="mobile-link-clubs"
                href="#clubs" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
              >
                Nova Scotia Run Clubs
              </a>
              <a 
                id="mobile-link-contact"
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-athletic tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt"
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
