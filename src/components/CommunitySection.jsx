import React, { useState } from 'react';
import { Users, MapPin, Calendar, Heart, ShieldCheck, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { runClubsData, boardMembersData, lifeMembers } from '../data/communityData';

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState('clubs');

  return (
    <section id="community-section" className="py-24 bg-slate-50 dark:bg-[#0b1627] border-y border-slate-200 dark:border-dark-750 relative transition-colors duration-300">
      <div id="clubs" className="absolute -top-12" />
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
            Connect with local training packs across the province, meet our volunteer management board, 
            and honor the pioneers who built running culture in Nova Scotia.
          </p>
        </div>

        {/* Sub-tab selection */}
        <div id="community-tabs" className="flex justify-center mb-10">
          <div className="bg-white dark:bg-dark-850 p-1.5 rounded-xl border border-slate-300 dark:border-dark-750 flex space-x-2 shadow-sm">
            <button
              id="community-tab-clubs"
              onClick={() => setActiveTab('clubs')}
              className={`px-5 py-2 rounded-lg font-athletic text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'clubs'
                  ? 'bg-volt text-black font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Nova Scotia Run Clubs
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
              Management Board
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
              Honorary Life Members
            </button>
          </div>
        </div>

        {/* View 1: Run Clubs Directory */}
        {activeTab === 'clubs' && (
          <div id="community-clubs-view" className="space-y-8">
            <div id="community-clubs-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {runClubsData.map((club, idx) => (
                <div 
                  key={idx}
                  id={`club-card-${idx + 1}`}
                  className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 hover:border-ocean/60 dark:hover:border-volt/60 rounded-2xl p-6 transition-all duration-300 space-y-4 hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        {club.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-ocean dark:text-volt font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{club.location}</span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-dark-750 text-ocean dark:text-volt flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-dark-750">
                    <div>
                      <span className="text-slate-400 dark:text-slate-400 block">Weekly Runs:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{club.meets}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-400 block">Club Focus:</span>
                      <span className="text-slate-700 dark:text-slate-200">{club.focus}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-ocean dark:text-volt font-mono font-semibold flex items-center space-x-1">
                      <span>{club.contact}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
                className="bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl overflow-hidden group hover:border-ocean/60 dark:hover:border-volt/60 transition-all shadow-sm hover:shadow-md"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-dark-850 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 bg-volt text-black text-[11px] font-athletic font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                    {member.role}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-lg font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {member.bio}
                  </p>
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
