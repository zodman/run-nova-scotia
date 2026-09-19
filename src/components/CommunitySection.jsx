import React, { useState, useMemo, useEffect } from 'react';
import { Users, MapPin, Calendar, ShieldCheck, Mail, ArrowRight, ExternalLink, Search, Clock, Phone, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { runClubsData, boardMembersData, lifeMembers } from '../data/communityData';

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const CLUBS_PER_PAGE = 6;

  // Sync hash routing (#board, #clubs, #life)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#board') {
        setActiveTab('board');
      } else if (hash === '#life') {
        setActiveTab('life');
      } else if (hash === '#clubs') {
        setActiveTab('clubs');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Calculate counts per region
  const regionCounts = useMemo(() => {
    const counts = { ALL: runClubsData.length };
    runClubsData.forEach(club => {
      counts[club.region] = (counts[club.region] || 0) + 1;
    });
    return counts;
  }, []);

  const regions = [
    { key: 'ALL', label: 'All NS Clubs' },
    { key: 'Halifax Metro', label: 'Halifax Metro' },
    { key: 'Annapolis Valley', label: 'Annapolis Valley' },
    { key: 'South Shore', label: 'South Shore' },
    { key: 'Northern NS', label: 'Northern NS' },
    { key: 'Cape Breton', label: 'Cape Breton' },
    { key: 'Province-wide', label: 'Province-wide / Youth' },
  ];

  const filteredClubs = useMemo(() => {
    return runClubsData.filter(club => {
      const matchesRegion = selectedRegion === 'ALL' || club.region === selectedRegion;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesRegion;
      const matchesQuery =
        club.name.toLowerCase().includes(query) ||
        club.city.toLowerCase().includes(query) ||
        club.location.toLowerCase().includes(query) ||
        club.focus.toLowerCase().includes(query) ||
        (club.tags && club.tags.some(t => t.toLowerCase().includes(query)));
      return matchesRegion && matchesQuery;
    });
  }, [selectedRegion, searchQuery]);

  // Pagination calculations (6 clubs per page -> 2 rows of 3 on desktop)
  const totalPages = Math.ceil(filteredClubs.length / CLUBS_PER_PAGE) || 1;
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (clampedPage - 1) * CLUBS_PER_PAGE;
  const endIndex = Math.min(startIndex + CLUBS_PER_PAGE, filteredClubs.length);
  const paginatedClubs = filteredClubs.slice(startIndex, startIndex + CLUBS_PER_PAGE);

  const handlePageChange = (newPage) => {
    const targetPage = Math.min(Math.max(1, newPage), totalPages);
    setCurrentPage(targetPage);
    const container = document.getElementById('community-clubs-view');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegionSelect = (regionKey) => {
    setSelectedRegion(regionKey);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section id="community-section" className="py-24 bg-slate-50 dark:bg-[#0b1627] border-y border-slate-200 dark:border-dark-750 relative transition-colors duration-300">
      <div id="clubs" className="absolute -top-12" />
      <div id="board" className="absolute -top-12" />
      <div id="life" className="absolute -top-12" />
      <div id="community-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div id="community-header" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div id="community-badge" className="inline-flex items-center space-x-2 text-ocean dark:text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest">
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
            <span>Community & Leadership</span>
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
          </div>
          <h2 id="community-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase tracking-tight text-slate-900 dark:text-white">
            The Nova Scotia <span className="text-ocean dark:text-volt">Running Network</span>
          </h2>
          <p id="community-description" className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Connect with {runClubsData.length}+ local training packs across every region of the province, meet our volunteer management board, 
            and honor the pioneers who built running culture in Nova Scotia.
          </p>
        </div>

        {/* Sub-tab selection */}
        <div id="community-tabs" className="flex justify-center mb-10">
          <div className="bg-white dark:bg-dark-850 p-1.5 rounded-xl border border-slate-300 dark:border-dark-750 flex flex-wrap justify-center gap-2 shadow-sm">
            <button
              id="community-tab-clubs"
              onClick={() => setActiveTab('clubs')}
              className={`px-5 py-2 rounded-lg font-athletic text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'clubs'
                  ? 'bg-volt text-black font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Nova Scotia Run Clubs ({runClubsData.length})
            </button>
            <button
              id="community-tab-board"
              onClick={() => setActiveTab('board')}
              className={`px-5 py-2 rounded-lg font-athletic text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'board'
                  ? 'bg-volt text-black font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Management Board ({boardMembersData.length})
            </button>
            <button
              id="community-tab-life"
              onClick={() => setActiveTab('life')}
              className={`px-5 py-2 rounded-lg font-athletic text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'life'
                  ? 'bg-volt text-black font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Honorary Life Members ({lifeMembers.length})
            </button>
          </div>
        </div>

        {/* View 1: Run Clubs Directory */}
        {activeTab === 'clubs' && (
          <div id="community-clubs-view" className="space-y-8">

            {/* Filter and Search Bar */}
            <div id="community-clubs-controls" className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
                  <input
                    id="community-clubs-search-input"
                    type="text"
                    placeholder="Search clubs by name, town, route, or focus (e.g. Halifax, trail, women, marathon)..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-ocean dark:focus:border-volt transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="text-xs font-athletic font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center justify-end whitespace-nowrap">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                  {filteredClubs.length > 0
                    ? `Showing ${startIndex + 1}–${endIndex} of ${filteredClubs.length} Clubs`
                    : `0 Clubs found`}
                </div>
              </div>

              {/* Region Filter Buttons */}
              <div id="community-region-filters" className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
                <span className="text-slate-400 dark:text-slate-400 flex items-center gap-1 font-semibold uppercase text-[11px] pr-1">
                  <Filter className="w-3.5 h-3.5" /> Region:
                </span>
                {regions.map((region) => (
                  <button
                    key={region.key}
                    id={`filter-region-${region.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleRegionSelect(region.key)}
                    className={`px-3 py-1.5 rounded-lg font-athletic text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      selectedRegion === region.key
                        ? 'bg-slate-900 text-white dark:bg-volt dark:text-black font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    {region.label} <span className="opacity-75 text-[10px]">({regionCounts[region.key] || 0})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clubs Grid (6 elements in 2 rows on desktop) */}
            {filteredClubs.length > 0 ? (
              <div className="space-y-8">
                <div id="community-clubs-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedClubs.map((club, idx) => (
                    <div 
                      key={club.id || idx}
                      id={`club-card-${club.id || startIndex + idx + 1}`}
                      className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 hover:border-ocean/60 dark:hover:border-volt/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-4">
                        {/* Card Header: Name + Region/City Badges */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-athletic font-bold uppercase tracking-wider bg-volt text-black shadow-xs">
                                {club.city}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-athletic font-semibold uppercase tracking-wider bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-slate-300">
                                {club.region}
                              </span>
                            </div>
                            <h3 className="text-xl font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide pt-1">
                              {club.name}
                            </h3>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-dark-750 text-ocean dark:text-volt flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Location & Times */}
                        <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-dark-750">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-ocean dark:text-volt shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-400 dark:text-slate-400 block font-semibold text-[11px] uppercase tracking-wider">Location:</span>
                              <span className="text-slate-800 dark:text-slate-200">{club.location || 'Various local meetup points'}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-ocean dark:text-volt shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-400 dark:text-slate-400 block font-semibold text-[11px] uppercase tracking-wider">Weekly Schedule:</span>
                              <span className="text-slate-800 dark:text-slate-200 font-medium">{club.meets}</span>
                            </div>
                          </div>
                        </div>

                        {/* Club Focus */}
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-dark-900/60 p-3 rounded-xl border border-slate-100 dark:border-dark-800">
                          {club.focus}
                        </div>

                        {/* Tags */}
                        {club.tags && club.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {club.tags.map((tag, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="text-[10px] font-athletic uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Direct Club Link Button */}
                      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-dark-750">
                        {club.website ? (
                          <a
                            id={`club-link-${club.id || startIndex + idx + 1}`}
                            href={club.website}
                            target={club.linkType === 'email' || club.linkType === 'phone' ? undefined : "_blank"}
                            rel={club.linkType === 'email' || club.linkType === 'phone' ? undefined : "noopener noreferrer"}
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-dark-750 hover:bg-volt hover:text-black dark:hover:bg-volt dark:hover:text-black text-slate-800 dark:text-slate-200 font-athletic text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between group/btn cursor-pointer shadow-xs"
                          >
                            <span className="flex items-center gap-2 truncate">
                              {club.linkType === 'email' ? (
                                <Mail className="w-3.5 h-3.5 shrink-0" />
                              ) : club.linkType === 'phone' ? (
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                              ) : (
                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              )}
                              <span className="truncate">{club.contact}</span>
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                          </a>
                        ) : (
                          <div className="text-xs text-slate-400 italic text-center py-2">
                            Contact via Run Nova Scotia
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls (Next / Prev + Page Numbers) */}
                {totalPages > 1 && (
                  <div id="community-clubs-pagination" className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-dark-750">
                    <div className="text-xs font-athletic font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 text-center sm:text-left">
                      Showing <span className="text-slate-900 dark:text-white font-bold">{startIndex + 1}–{endIndex}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredClubs.length}</span> clubs &bull; Page <span className="text-ocean dark:text-volt font-bold">{clampedPage}</span> of {totalPages}
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Prev Button */}
                      <button
                        id="community-clubs-pagination-prev"
                        onClick={() => handlePageChange(clampedPage - 1)}
                        disabled={clampedPage === 1}
                        className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-athletic font-bold uppercase tracking-wider transition-all ${
                          clampedPage === 1
                            ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-dark-800 text-slate-400'
                            : 'bg-white dark:bg-dark-850 hover:bg-volt hover:text-black dark:hover:bg-volt dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-dark-750 shadow-xs cursor-pointer'
                        }`}
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1.5">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            id={`community-clubs-page-${pageNum}`}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-9 h-9 rounded-xl text-xs font-athletic font-bold transition-all flex items-center justify-center cursor-pointer ${
                              pageNum === clampedPage
                                ? 'bg-volt text-black shadow-md font-extrabold scale-105'
                                : 'bg-white dark:bg-dark-850 hover:bg-slate-100 dark:hover:bg-dark-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-750'
                            }`}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={pageNum === clampedPage ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        id="community-clubs-pagination-next"
                        onClick={() => handlePageChange(clampedPage + 1)}
                        disabled={clampedPage === totalPages}
                        className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-athletic font-bold uppercase tracking-wider transition-all ${
                          clampedPage === totalPages
                            ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-dark-800 text-slate-400'
                            : 'bg-white dark:bg-dark-850 hover:bg-volt hover:text-black dark:hover:bg-volt dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-dark-750 shadow-xs cursor-pointer'
                        }`}
                        aria-label="Next Page"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-dark-850 rounded-2xl border border-slate-200 dark:border-dark-750 p-8 space-y-4">
                <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                <h3 className="text-xl font-athletic font-bold uppercase text-slate-800 dark:text-white">
                  No Running Clubs Match Your Search
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting your search query or selecting "All NS Clubs" to view all {runClubsData.length} clubs across Nova Scotia.
                </p>
                <button
                  onClick={() => { handleRegionSelect('ALL'); handleSearchChange(''); }}
                  className="px-5 py-2 bg-volt text-black text-xs font-athletic font-bold uppercase tracking-wider rounded-lg shadow hover:bg-[#e5d800] transition-colors"
                >
                  Clear Filters & Search
                </button>
              </div>
            )}

            {/* Run Club Registration CTA */}
            <div id="community-club-partner-cta" className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-athletic text-lg uppercase text-slate-900 dark:text-white font-bold">
                  Represent a Nova Scotia Run Club or Group?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Run Nova Scotia offers series partnerships, liability insurance guidance, and event calendar promotion for local groups.
                </p>
              </div>
              <a 
                id="community-club-partner-btn"
                href="#contact"
                className="px-5 py-2.5 bg-volt hover:bg-[#e5d800] text-black text-xs font-athletic font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow cursor-pointer"
              >
                Connect With Run NS
              </a>
            </div>
          </div>
        )}

        {/* View 2: Management Board */}
        {activeTab === 'board' && (
          <div id="community-board-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembersData.map((member, idx) => (
              <div 
                key={idx}
                id={`board-member-card-${idx + 1}`}
                className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl overflow-hidden group hover:border-ocean/60 dark:hover:border-volt/60 transition-all shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-dark-800">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0284C7&color=CCFF00&size=512&font-size=0.33`;
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 bg-volt text-black text-[11px] font-athletic font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                    {member.role}
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 3: Honorary Life Members */}
        {activeTab === 'life' && (
          <div id="community-life-members-view" className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-8 sm:p-12 space-y-8 shadow-xl dark:shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-athletic font-bold text-ocean dark:text-volt tracking-widest block mb-1">
                Hall of Distinction
              </span>
              <h3 className="text-2xl sm:text-3xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
                Run Nova Scotia Life Members
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                Honoring individuals whose lifelong volunteer service, competitive excellence, and selfless dedication 
                laid the foundation for road racing in our province over four decades.
              </p>
            </div>

            <div id="community-life-members-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {lifeMembers.map((name, idx) => (
                <div 
                  key={idx}
                  id={`life-member-card-${idx + 1}`}
                  className="bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 p-4 rounded-xl text-center hover:border-ocean dark:hover:border-volt transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-volt/20 dark:bg-volt/10 text-ocean dark:text-volt mx-auto flex items-center justify-center font-bold text-xs mb-2">
                    ★
                  </div>
                  <div className="text-sm font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    {name}
                  </div>
                  <div className="text-[10px] text-ocean dark:text-volt font-semibold tracking-wider uppercase mt-0.5">
                    Life Member
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
