import React, { useState, useRef, useEffect } from 'react';
import { CalendarPlus, Calendar, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { createGoogleCalendarUrl, createOutlookCalendarUrl, downloadIcsFile } from '../utils/calendarUtils';

export default function AddToCalendarButton({ 
  event, 
  compact = false, 
  className = '',
  direction = 'up' // Opens UPWARDS above the button by default so it never clips below cards or footers
}) {
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
        className={`inline-flex items-center justify-center font-athletic uppercase tracking-wider transition-all duration-200 rounded border focus:outline-none focus:ring-2 focus:ring-volt/50 cursor-pointer ${
          compact
            ? 'px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-700 hover:text-ocean dark:text-slate-200 dark:hover:text-volt border-slate-200 dark:border-dark-650'
            : 'px-5 py-2.5 text-xs bg-white hover:bg-slate-100 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 hover:text-ocean dark:text-slate-200 dark:hover:text-volt border-slate-300 dark:border-dark-650 shadow-sm'
        }`}
      >
        <CalendarPlus className="w-3.5 h-3.5 mr-1.5 text-ocean dark:text-volt" />
        <span>Add to Calendar</span>
        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 w-60 rounded-xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md max-h-64 overflow-y-auto ${
            direction === 'up'
              ? 'bottom-full mb-2'
              : 'top-full mt-2'
          }`}
        >
          <div className="sticky top-0 bg-white/95 dark:bg-dark-850/95 backdrop-blur-sm px-3 py-1.5 border-b border-slate-100 dark:border-dark-750 z-10 flex items-center justify-between">
            <p className="text-[10px] font-athletic uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Select Calendar App
            </p>
            <span className="text-[9px] uppercase tracking-wider font-athletic text-ocean dark:text-volt font-bold">
              Add Event
            </span>
          </div>

          {/* Google Calendar */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-ocean dark:hover:text-volt transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ocean dark:group-hover:text-volt" />
          </a>

          {/* Apple / iCal (.ics) */}
          <button
            type="button"
            onClick={() => {
              downloadIcsFile(event);
              setIsOpen(false);
            }}
            className="w-full flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-ocean dark:hover:text-volt transition-colors group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Apple Calendar / iCal</span>
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-ocean dark:group-hover:text-volt" />
          </button>

          {/* Outlook */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-ocean dark:hover:text-volt transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 mr-2.5 group-hover:scale-125 transition-transform" />
            <span className="flex-1">Outlook / Office 365</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ocean dark:group-hover:text-volt" />
          </a>
        </div>
      )}
    </div>
  );
}
