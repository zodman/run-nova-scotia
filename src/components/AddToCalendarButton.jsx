import React, { useState, useRef, useEffect } from 'react';
import { CalendarPlus, Calendar, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { createGoogleCalendarUrl, createOutlookCalendarUrl, downloadIcsFile } from '../utils/calendarUtils';

export default function AddToCalendarButton({ event, compact = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!event) return null;

  const googleUrl = createGoogleCalendarUrl(event);
  const outlookUrl = createOutlookCalendarUrl(event);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="Add to personal calendar"
        className={`inline-flex items-center justify-center font-athletic uppercase tracking-wider transition-all duration-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-volt/50 ${
          compact
            ? 'px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10'
            : 'px-4 py-2.5 text-xs md:text-sm bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-white/15 shadow-sm'
        }`}
      >
        <CalendarPlus className="w-4 h-4 mr-1.5 text-ocean-500 dark:text-volt" />
        <span>Add to Calendar</span>
        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-56 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-white/15 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/10">
            <p className="text-[10px] font-athletic uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Select Calendar App
            </p>
          </div>

          {/* Google Calendar */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
          </a>

          {/* Apple / iCal (.ics) */}
          <button
            type="button"
            onClick={() => {
              downloadIcsFile(event);
              setIsOpen(false);
            }}
            className="w-full flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group text-left"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Apple Calendar / iCal</span>
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
          </button>

          {/* Outlook */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Outlook / Office 365</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
          </a>
        </div>
      )}
    </div>
  );
}
