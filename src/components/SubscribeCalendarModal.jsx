import React, { useState } from 'react';
import { Calendar, CalendarPlus, Download, ExternalLink, Check, Copy, X, RefreshCw } from 'lucide-react';
import { getCalendarSubscriptionUrls, downloadAllEventsIcsFile } from '../utils/calendarUtils';
import { eventsData } from '../data/eventsData';

export default function SubscribeCalendarModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { icsUrl, webcalUrl, googleSubscribeUrl, outlookSubscribeUrl, appleSubscribeUrl } = getCalendarSubscriptionUrls();

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(icsUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div 
      id="subscribe-calendar-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="subscribe-calendar-dialog"
        className="relative w-full max-w-xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-[#111722] border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-volt/20 text-ocean dark:text-volt border border-volt/40 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-athletic font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Subscribe to Race Calendar
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All {eventsData.length} events across Nova Scotia &bull; Auto-syncs live updates
              </p>
            </div>
          </div>

          <button
            id="subscribe-modal-close-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Live Auto-Update Notice */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl flex items-start space-x-3 text-xs text-emerald-900 dark:text-emerald-300">
            <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-athletic uppercase tracking-wider block font-bold mb-0.5">
                Live Auto-Updating Calendar Feed
              </strong>
              <span>
                When you subscribe, your calendar will automatically refresh and receive date updates, new sanctioned races, and registration link changes as they are announced!
              </span>
            </div>
          </div>

          {/* 1-Click Subscription Options */}
          <div className="space-y-3">
            <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-slate-400">
              1-Click Calendar Subscription
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              {/* Apple Calendar */}
              <a
                href={appleSubscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col justify-between group transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-athletic">Apple / iOS</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Mac, iPhone, iPad</p>
                </div>
              </a>

              {/* Google Calendar */}
              <a
                href={googleSubscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col justify-between group transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-athletic">Google Calendar</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Web & Android</p>
                </div>
              </a>

              {/* Outlook */}
              <a
                href={outlookSubscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col justify-between group transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-athletic">Outlook / 365</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Office & Web</p>
                </div>
              </a>

            </div>
          </div>

          {/* Copy Live Feed URL */}
          <div className="space-y-2">
            <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-slate-400">
              Subscription Feed URL (.ics)
            </h3>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                readOnly 
                value={icsUrl}
                className="flex-1 bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-lg px-3 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none select-all"
              />
              <button
                onClick={handleCopyUrl}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-white/15 dark:hover:bg-white/20 text-white rounded-lg text-xs font-athletic uppercase tracking-wider font-bold transition-colors flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Feed URL!' : 'Copy URL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Use this URL in any calendar app that supports iCal / ICS subscriptions (e.g. Thunderbird, Fantastical, Yahoo).
            </p>
          </div>

          {/* Single Offline Download (.ics) */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-athletic">
                Offline Snapshot Download
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Download a static .ics file with all {eventsData.length} events (does not auto-update).
              </p>
            </div>
            <button
              onClick={() => downloadAllEventsIcsFile(eventsData)}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt border border-slate-300 dark:border-dark-650 rounded text-xs font-athletic uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-ocean dark:text-volt" />
              <span>Download .ics File</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
