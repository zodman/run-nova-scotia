import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ExternalLink, 
  SlidersHorizontal,
  Clock,
  CheckCircle,
  Trophy,
  Flame,
  Layers,
  Car
} from 'lucide-react';
import { eventsData, isEventPending, getEventDaysDelta } from '../data/eventsData';

export default function EventExplorer({ 
  onSelectEvent, 
  onJoinClick,
  selectedCategory: externalCategory,
  onSelectCategory
}) {
  const currentYear = String(new Date().getFullYear());
  const yearFilters = [
    { value: '2026', label: '2026 Season' },
    { value: '2027', label: '2027 Season' },
    { value: 'ALL', label: 'All Seasons' }
  ];

  // Default season to actual year if available, otherwise '2026'
  const defaultYear = yearFilters.some(y => y.value === currentYear) ? currentYear : '2026';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'PENDING', 'PAST'
  const [selectedYear, setSelectedYear] = useState(defaultYear); // Default to actual year
  
  // Controlled or uncontrolled category state ('ALL', 'PERFORMANCE', 'NORMAL', 'EXTRA')
  const [internalCategory, setInternalCategory] = useState('ALL');
  const selectedCategory = externalCategory !== undefined ? externalCategory : internalCategory;
  const setSelectedCategory = onSelectCategory || setInternalCategory;

  const distanceFilters = ['ALL', '5K', '10K', 'Half Marathon', 'Full Marathon'];
  const regionFilters = [
    { value: 'ALL', label: 'All Nova Scotia' },
    { value: 'Halifax Metro', label: 'Halifax Metro' },
    { value: 'South Shore', label: 'South Shore' },
    { value: 'Annapolis Valley', label: 'Annapolis Valley' },
    { value: 'Cape Breton', label: 'Cape Breton' },
    { value: 'Northern NS', label: 'Northern NS' }
  ];

  // Separate and sort events: Pending events first (soonest first), then past events (most recent first)
  const { filteredEvents, pendingCount, pastCount, count2026, count2027, countPerformance, countNormal, countExtra } = useMemo(() => {
    let pending = [];
    let past = [];
    let c2026 = 0;
    let c2027 = 0;

    eventsData.forEach(event => {
      if (event.year === 2026) c2026++;
      if (event.year === 2027) c2027++;

      const isPending = isEventPending(event.isoDate);
      if (isPending) {
        pending.push(event);
      } else {
        past.push(event);
      }
    });

    // Sort pending: soonest date first
    pending.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));

    // Sort past: most recently completed first
    past.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

    let combined = [];
    if (statusFilter === 'PENDING') {
      combined = pending;
    } else if (statusFilter === 'PAST') {
      combined = past;
    } else {
      // Default: ALL (Still pending events FIRST, followed by past events)
      combined = [...pending, ...past];
    }

    // Apply filters
    const filtered = combined.filter(event => {
      // Year filter
      const matchYear = selectedYear === 'ALL' || String(event.year) === selectedYear;

      // Category filter ('NORMAL', 'PERFORMANCE', 'EXTRA')
      const matchCategory = selectedCategory === 'ALL' || event.category === selectedCategory;

      // Search text match
      const matchSearch = 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(event.year).includes(searchTerm);

      // Distance match
      const matchDistance = selectedDistance === 'ALL' || 
        event.distances.some(d => d.toLowerCase().includes(selectedDistance.toLowerCase()));

      // Region match
      const matchRegion = selectedRegion === 'ALL' || event.region === selectedRegion;

      return matchYear && matchCategory && matchSearch && matchDistance && matchRegion;
    });

    // Season-scoped counts for status and category buttons
    const seasonEvents = eventsData.filter(e => selectedYear === 'ALL' || String(e.year) === selectedYear);
    const seasonPendingCount = seasonEvents.filter(e => isEventPending(e.isoDate)).length;
    const seasonPastCount = seasonEvents.filter(e => !isEventPending(e.isoDate)).length;
    const perfCount = seasonEvents.filter(e => e.category === 'PERFORMANCE').length;
    const normCount = seasonEvents.filter(e => e.category === 'NORMAL').length;
    const extCount = seasonEvents.filter(e => e.category === 'EXTRA').length;

    return { 
      filteredEvents: filtered, 
      pendingCount: seasonPendingCount, 
      pastCount: seasonPastCount,
      totalPendingCount: pending.length,
      count2026: c2026,
      count2027: c2027,
      countPerformance: perfCount,
      countNormal: normCount,
      countExtra: extCount
    };
  }, [searchTerm, selectedDistance, selectedRegion, statusFilter, selectedYear, selectedCategory]);

  return (
    <section id="events" className="py-24 bg-white dark:bg-[#040b17] relative transition-colors duration-300">
      <div id="events-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header (Zunzo Style) */}
        <div id="events-header" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div id="events-header-text">
            <div id="events-header-eyebrow" className="inline-flex items-center space-x-2 text-ocean dark:text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest mb-2">
              <span className="w-8 h-0.5 bg-ocean dark:bg-volt" />
              <span>Provincial Series Calendar</span>
            </div>
            <h2 id="events-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              Nova Scotia Road <span className="text-ocean dark:text-volt">Race Calendar</span>
            </h2>
            <p id="events-subtitle" className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Sanctioned events across <strong className="text-slate-900 dark:text-white">2026 and 2027</strong>. 
              Ordered with <strong className="text-ocean dark:text-volt">still pending / upcoming races first</strong>, 
              followed by completed events.
            </p>
          </div>

          {/* Status & Season Badges */}
          <div id="events-header-badges" className="flex flex-wrap items-center gap-2 text-xs uppercase font-athletic tracking-wider">
            <span id="badge-upcoming-count" className="px-3 py-1.5 bg-volt/20 text-slate-950 dark:text-volt border border-volt/60 dark:border-volt/40 rounded-lg flex items-center space-x-1.5 font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 text-ocean dark:text-volt" />
              <span>{pendingCount} Upcoming</span>
            </span>
            <span id="badge-2026-count" className="px-3 py-1.5 bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 rounded-lg flex items-center space-x-1.5 font-semibold">
              <span>{count2026} Races in 2026</span>
            </span>
            <span id="badge-2027-count" className="px-3 py-1.5 bg-slate-100 dark:bg-dark-800 text-ocean dark:text-volt border border-slate-200 dark:border-dark-700 rounded-lg flex items-center space-x-1.5 font-semibold">
              <span>{count2027} Races in 2027</span>
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div id="events-filter-bar" className="bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-750 p-4 sm:p-5 rounded-2xl mb-10 shadow-lg dark:shadow-2xl space-y-4">
          
          {/* Row 1: Year Selector & Status Filter Tabs */}
          <div id="events-filter-row-1" className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-dark-750">
            
            {/* Season Selector */}
            <div id="events-season-selector" className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-athletic text-slate-500 dark:text-slate-400 font-semibold mr-1 flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                <span>Season:</span>
              </span>
              {yearFilters.map((y) => (
                <button
                  key={y.value}
                  id={`season-filter-btn-${y.value.toLowerCase()}`}
                  onClick={() => setSelectedYear(y.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-athletic uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    selectedYear === y.value
                      ? 'bg-volt text-black shadow-md'
                      : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div id="events-status-selector" className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-athletic text-slate-500 dark:text-slate-400 font-semibold mr-1">
                Status:
              </span>
              <button
                id="status-filter-btn-all"
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-athletic uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-volt text-black shadow-md font-bold'
                    : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                }`}
              >
                All (Pending First)
              </button>
              <button
                id="status-filter-btn-pending"
                onClick={() => setStatusFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg text-xs font-athletic uppercase tracking-wider font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  statusFilter === 'PENDING'
                    ? 'bg-volt text-black shadow-md font-bold'
                    : 'bg-white dark:bg-dark-800 text-ocean dark:text-volt hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-volt" />
                <span>Upcoming ({pendingCount})</span>
              </button>
              <button
                id="status-filter-btn-past"
                onClick={() => setStatusFilter('PAST')}
                className={`px-3 py-1.5 rounded-lg text-xs font-athletic uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  statusFilter === 'PAST'
                    ? 'bg-slate-800 text-white dark:bg-dark-700 dark:text-white border border-slate-700 dark:border-dark-600 shadow-md font-bold'
                    : 'bg-white dark:bg-dark-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                }`}
              >
                Past ({pastCount})
              </button>
            </div>

          </div>

          {/* Row 2: Search and Region Grid */}
          <div id="events-filter-row-2" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div id="events-search-wrapper" className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="events-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search race title, town, year, or organizer..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-ocean dark:focus:border-volt transition-colors shadow-sm"
              />
              {searchTerm && (
                <button 
                  id="events-search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Select */}
            <div id="events-region-wrapper" className="md:col-span-6 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-ocean dark:text-volt flex-shrink-0 hidden sm:block" />
              <select
                id="events-region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-ocean dark:focus:border-volt transition-colors shadow-sm"
              >
                {regionFilters.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white dark:bg-dark-900 text-slate-900 dark:text-white">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 3: Category / Series Selector */}
          <div id="events-category-filters" className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-dark-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-athletic mr-2 flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5 text-ocean dark:text-volt" />
              <span>Series / Category:</span>
            </span>
            {[
              { value: 'ALL', label: 'All Events' },
              { value: 'PERFORMANCE', label: 'Performance Series (Dr. Jeff Ratushny)', count: countPerformance },
              { value: 'NORMAL', label: 'Road Race Series', count: countNormal },
              { value: 'EXTRA', label: 'Special & Fun Events', count: countExtra }
            ].map((cat) => (
              <button
                key={cat.value}
                id={`category-filter-btn-${cat.value.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedCategory === cat.value
                    ? 'bg-volt text-black shadow-md font-bold'
                    : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                }`}
              >
                {cat.value === 'PERFORMANCE' && <Trophy className="w-3 h-3 text-black" />}
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === cat.value ? 'bg-black/15 text-black' : 'bg-slate-100 dark:bg-dark-900 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Row 4: Distance Filter Badges */}
          <div id="events-distance-filters" className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-dark-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-athletic mr-2 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-ocean dark:text-volt" />
              <span>Distance:</span>
            </span>
            {distanceFilters.map((dist) => (
              <button
                key={dist}
                id={`distance-filter-btn-${dist.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedDistance(dist)}
                className={`px-3 py-1 rounded text-xs font-athletic uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedDistance === dist
                    ? 'bg-volt text-black shadow-md'
                    : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-dark-700 shadow-sm'
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div id="events-empty-state" className="bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xl dark:shadow-2xl">
            <p className="text-slate-800 dark:text-slate-300 font-athletic text-lg uppercase">No races match your filters</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the series, season, status, or search terms.</p>
            <button
              id="events-reset-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedDistance('ALL');
                setSelectedRegion('ALL');
                setStatusFilter('ALL');
                setSelectedCategory('ALL');
                setSelectedYear(defaultYear);
              }}
              className="mt-4 px-4 py-2 bg-volt hover:bg-[#e5d800] text-black text-xs font-athletic font-bold uppercase tracking-wider rounded cursor-pointer shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((race) => {
              const pending = isEventPending(race.isoDate);
              const daysDelta = getEventDaysDelta(race.isoDate);

              return (
                <div 
                  key={race.id}
                  id={`event-card-${race.id}`}
                  onClick={() => onSelectEvent(race)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 border cursor-pointer ${
                    pending 
                      ? 'bg-white hover:bg-slate-50 dark:bg-dark-850 dark:hover:bg-dark-800 border-2 border-ocean/40 hover:border-ocean dark:border-volt/60 dark:hover:border-volt shadow-lg dark:shadow-[0_0_25px_rgba(254,240,0,0.22)]' 
                      : 'bg-slate-50 hover:bg-white dark:bg-dark-900/90 dark:hover:bg-dark-850 border border-slate-200 dark:border-dark-750/80 opacity-90 hover:opacity-100 shadow-md'
                  }`}
                >
                  {/* Top Image & Status Ribbons */}
                  <div id={`event-card-media-${race.id}`} className="relative h-48 overflow-hidden">
                    <img 
                      id={`event-card-image-${race.id}`}
                      src={race.image} 
                      alt={race.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        pending 
                          ? 'filter brightness-90 contrast-110' 
                          : 'filter grayscale-[40%] brightness-75 contrast-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

                    {/* Top Left: Date Ribbon with Year */}
                    <div id={`event-card-date-${race.id}`} className="absolute top-3 left-3 bg-[#040b16]/90 backdrop-blur-sm border border-dark-650 text-white px-3 py-1.5 rounded-lg flex items-center space-x-2 shadow-sm">
                      <Calendar className={`w-3.5 h-3.5 ${pending ? 'text-volt' : 'text-slate-400'}`} />
                      <span className="text-xs font-athletic font-bold uppercase tracking-wider">
                        {race.date.split(',')[0]} • {race.date.split(',')[1]}
                      </span>
                    </div>

                    {/* Top Right: Year & Status Badge */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {/* Year pill */}
                      <span className="px-2 py-0.5 bg-black/80 text-volt border border-volt/40 rounded text-[10px] font-athletic font-bold tracking-wider uppercase">
                        {race.year} Season
                      </span>

                      {/* Performance Series Ribbon */}
                      {race.category === 'PERFORMANCE' && (
                        <div className="bg-ocean dark:bg-volt text-white dark:text-black font-athletic font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center space-x-1 shadow">
                          <Trophy className="w-3 h-3 text-white dark:text-black" />
                          <span>Performance Series</span>
                        </div>
                      )}

                      {pending ? (
                        <div className="bg-volt text-black px-2.5 py-0.5 rounded text-[11px] font-athletic font-bold uppercase tracking-wider shadow flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                          <span>
                            {daysDelta === 0 
                              ? 'Today!' 
                              : daysDelta === 1 
                                ? 'Tomorrow!' 
                                : `Upcoming (${daysDelta}d)`}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-dark-900/95 text-slate-400 border border-dark-650 px-2 py-0.5 rounded text-[10px] font-athletic uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                          <CheckCircle className="w-3 h-3 text-slate-500" />
                          <span>Past Event</span>
                        </div>
                      )}

                      {/* Custom Race Badge (BQ, Heritage, etc.) */}
                      {race.badge && race.badge !== 'Past Event' && (
                        <div className="bg-black/80 text-slate-200 border border-dark-700 px-2 py-0.5 rounded text-[10px] font-athletic uppercase tracking-wider">
                          {race.badge}
                        </div>
                      )}
                    </div>

                    {/* Region Location Pill with Google Maps Deeplink */}
                    <a
                      id={`event-card-location-${race.id}`}
                      href={race.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(race.location + ', Nova Scotia')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2 left-3 flex items-center space-x-1 text-xs text-slate-200 hover:text-volt bg-black/75 hover:bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded transition-colors cursor-pointer border border-white/10"
                      title="Open location in Google Maps"
                    >
                      <MapPin className={`w-3 h-3 ${pending ? 'text-volt' : 'text-slate-400'}`} />
                      <span>{race.location}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                    </a>

                    {/* Watermark label for past events */}
                    {!pending && (
                      <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/80 text-slate-300 text-[10px] font-athletic uppercase tracking-wider rounded border border-white/10">
                        {race.year} Completed
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <span className="text-[11px] uppercase font-athletic tracking-wider font-semibold text-ocean dark:text-volt">
                            {race.type}
                          </span>
                          {race.category === 'PERFORMANCE' && (
                            <span className="px-1.5 py-0.2 bg-ocean/10 dark:bg-volt/15 text-ocean dark:text-volt border border-ocean/30 dark:border-volt/30 rounded text-[9px] font-athletic font-bold uppercase tracking-wider flex items-center space-x-1">
                              <span>Dr. Jeff Ratushny</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          Year: {race.year}
                        </span>
                      </div>

                      <h3 id={`event-card-title-${race.id}`} className={`text-xl font-athletic font-bold transition-colors uppercase tracking-wide leading-tight ${
                        pending 
                          ? 'text-slate-900 group-hover:text-ocean dark:text-white dark:group-hover:text-volt' 
                          : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {race.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {race.description}
                      </p>
                    </div>

                    {/* Distances and Course details */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-dark-750">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Distances:</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {race.distances.map((dist, i) => (
                            <span 
                              key={i} 
                              className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                                pending 
                                  ? 'bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 text-ocean dark:text-volt font-medium' 
                                  : 'bg-slate-200/80 dark:bg-dark-950 border border-slate-300 dark:border-dark-750 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {dist}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                          <Car className="w-3.5 h-3.5 text-ocean dark:text-volt" />
                          <span>Drive (Hfx/Dart):</span>
                        </span>
                        <a
                          id={`event-card-drive-link-${race.id}`}
                          href={race.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(race.location + ', Nova Scotia')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-700 dark:text-slate-300 hover:text-ocean dark:hover:text-volt font-medium text-right text-[11px] underline decoration-dotted flex items-center space-x-1 cursor-pointer transition-colors"
                          title="Open route in Google Maps"
                        >
                          <span>{race.driveTimeFromHalifax || '1 hr (tentative - needs confirm)'}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Course / Elevation:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-right text-[11px]">{race.elevation}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Status:</span>
                        {pending ? (
                          <span className="text-ocean dark:text-volt font-semibold flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-ocean dark:text-volt" />
                            <span>{race.year} Registration Open</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-slate-500" />
                            <span>{race.year} Results Finalized</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        id={`event-card-details-btn-${race.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(race);
                        }}
                        className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-dark-750 dark:hover:bg-dark-700 text-slate-800 hover:text-ocean dark:text-white dark:hover:text-volt border border-slate-200 dark:border-dark-650 rounded text-xs font-athletic uppercase tracking-wider transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {pending ? (
                        <a
                          id={`event-card-register-btn-${race.id}`}
                          href={race.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2.5 px-3 bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold rounded text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1 shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <span>Register</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <a
                          id={`event-card-results-btn-${race.id}`}
                          href={race.resultsUrl || "https://atlanticchip.ca"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-athletic font-semibold rounded text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1 border border-slate-200 dark:border-dark-700 cursor-pointer"
                        >
                          <span>View Results</span>
                          <Trophy className="w-3 h-3 text-ocean dark:text-volt" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
