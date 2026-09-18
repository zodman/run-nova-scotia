import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TickerMarquee from './components/TickerMarquee';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import SeriesTabs from './components/SeriesTabs';
import EventExplorer from './components/EventExplorer';
import EventModal from './components/EventModal';
import MembershipPricing from './components/MembershipPricing';
import MembershipModal from './components/MembershipModal';
import CommunitySection from './components/CommunitySection';
import SponsorsMarquee from './components/SponsorsMarquee';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Theme state: default to 'dark', or retrieve saved choice
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('rns_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Sync theme with <html> class and localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    try {
      localStorage.setItem('rns_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const handleOpenJoinModal = (plan = null) => {
    setSelectedPlan(plan);
    setIsJoinModalOpen(true);
  };

  const handleScrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplorePerformance = () => {
    setSelectedCategory('PERFORMANCE');
    handleScrollToEvents();
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 dark:bg-[#000000] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-volt selection:text-black transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenJoinModal={() => handleOpenJoinModal()}
        onExplorePerformance={handleExplorePerformance}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Athletic Hero Slider / Banner */}
        <HeroBanner 
          onExploreRaces={handleScrollToEvents}
          onJoinClick={() => handleOpenJoinModal()}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

        {/* Dynamic Running Ticker */}
        <TickerMarquee />

        {/* 4-Stat Impact Counters */}
        <StatsSection />

        {/* About & Mission Section */}
        <AboutSection 
          onJoinClick={() => handleOpenJoinModal()}
        />

        {/* Provincial Series Tabs (Road Race vs Performance vs Youth vs Points) */}
        <SeriesTabs 
          onExploreRaces={handleScrollToEvents}
          onExplorePerformance={handleExplorePerformance}
          onJoinClick={() => handleOpenJoinModal()}
        />

        {/* 2026/2027 Interactive Race Calendar & Filter */}
        <EventExplorer 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectEvent={(event) => setSelectedEvent(event)}
          onJoinClick={() => handleOpenJoinModal()}
        />

        {/* Membership Tiers & Benefits */}
        <MembershipPricing 
          onSelectPlan={(plan) => handleOpenJoinModal(plan)}
        />

        {/* Run Clubs, Board & Life Members */}
        <CommunitySection />

        {/* Sponsors & Partners Marquee */}
        <SponsorsMarquee />

        {/* Call to Action Banner */}
        <CtaBanner 
          onJoinClick={() => handleOpenJoinModal()}
        />
      </main>

      {/* Footer */}
      <Footer 
        onJoinClick={() => handleOpenJoinModal()}
      />

      {/* Interactive Modals */}
      <EventModal 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onJoinClick={() => handleOpenJoinModal()}
      />

      <MembershipModal 
        plan={selectedPlan}
        isOpen={isJoinModalOpen}
        onClose={() => {
          setIsJoinModalOpen(false);
          setSelectedPlan(null);
        }}
      />

    </div>
  );
}
