import React, { useState } from 'react';
import { X, Search, UserCheck, ShieldAlert, Mail, ArrowRight, User } from 'lucide-react';
import { mockMembers } from '../data/sponsorsData';

export default function MemberLookupModal({ isOpen, onClose, onJoinClick }) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const results = query.trim().length >= 2 
    ? mockMembers.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) || 
        m.id.toLowerCase().includes(query.toLowerCase()) ||
        m.city.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div id="member-lookup-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        id="member-lookup-modal-dialog"
        className="relative w-full max-w-xl bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div id="member-lookup-modal-header" className="p-6 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-volt/10 border border-volt/30 flex items-center justify-center text-volt">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 id="member-lookup-modal-title" className="text-xl font-athletic font-bold uppercase text-white">
                Find Your Member #
              </h3>
              <p className="text-xs text-slate-400">
                Official Run Nova Scotia Membership Roster Lookup
              </p>
            </div>
          </div>

          <button 
            id="member-lookup-modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-dark-800 hover:bg-volt hover:text-black text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div id="member-lookup-modal-body" className="p-6 space-y-5">
          <form id="member-lookup-modal-form" onSubmit={handleSearchSubmit} className="relative">
            <input
              id="member-lookup-modal-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(true);
              }}
              placeholder="Enter your first name, last name, or city..."
              autoFocus
              className="w-full pl-10 pr-24 py-3 bg-dark-950 border border-dark-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              id="member-lookup-modal-submit-btn"
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-volt text-black font-athletic font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded hover:bg-[#E5D800] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Prompt / hint */}
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Try searching: <button onClick={() => { setQuery('Sarah'); setSearched(true); }} className="text-volt hover:underline cursor-pointer">Sarah</button>, <button onClick={() => { setQuery('MacKenzie'); setSearched(true); }} className="text-volt hover:underline cursor-pointer">MacKenzie</button>, <button onClick={() => { setQuery('Halifax'); setSearched(true); }} className="text-volt hover:underline cursor-pointer">Halifax</button></span>
            <span className="text-slate-500">2026/2027 Season</span>
          </div>

          {/* Search Results */}
          {searched && query.trim().length >= 2 && (
            <div id="member-lookup-modal-results" className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {results.length > 0 ? (
                results.map((member) => (
                  <div 
                    key={member.id}
                    id={`member-result-${member.id}`}
                    className="p-3.5 bg-dark-850 hover:bg-dark-800 border border-dark-750 hover:border-volt/50 rounded-xl transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white text-sm">{member.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-volt/15 text-volt border border-volt/30 rounded font-mono">
                          {member.id}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {member.city}, NS • Division: {member.ageGroup}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-[11px] font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                        {member.status}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {member.racesCompleted} Series Finishes
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div id="member-lookup-no-match" className="p-6 bg-dark-850/50 border border-dark-750 rounded-xl text-center space-y-2">
                  <ShieldAlert className="w-6 h-6 text-amber-400 mx-auto" />
                  <p className="text-sm font-semibold text-white">No exact match found for "{query}"</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Recent registrations via e-transfer or Race Roster take 24–48 hours to appear on the official roster.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Need assistance box */}
          <div id="member-lookup-assistance-box" className="bg-dark-850 p-4 rounded-xl border border-dark-750 space-y-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2 font-semibold text-white">
              <Mail className="w-4 h-4 text-volt" />
              <span>Can't find your number or need to register?</span>
            </div>
            <p className="text-slate-400">
              Email Registrar Pam Dimock at <strong className="text-volt">admin@runnovascotia.ca</strong> with your full name, date of birth, and date of fee payment.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div id="member-lookup-modal-footer" className="p-4 bg-dark-950 border-t border-dark-750 flex items-center justify-between">
          <button
            id="member-lookup-modal-join-btn"
            onClick={() => {
              onClose();
              onJoinClick();
            }}
            className="text-xs uppercase font-athletic font-bold text-volt hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Not a member yet? Join for $35/yr</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="member-lookup-modal-done-btn"
            onClick={onClose}
            className="px-4 py-2 text-xs font-athletic uppercase tracking-wider text-slate-300 hover:text-white border border-dark-700 rounded transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
