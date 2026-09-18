import React from 'react';
import { X, MapPin, Calendar, ExternalLink, ShieldCheck, Award, Flag, ArrowRight, CheckCircle, Trophy, Clock, Globe, Car } from 'lucide-react';
import { isEventPending, getEventDaysDelta, getEventRelativeTime } from '../data/eventsData';

export default function EventModal({ event, onClose, onJoinClick }) {
  if (!event) return null;

  const pending = isEventPending(event.isoDate);
  const daysDelta = getEventDaysDelta(event.isoDate);

  return (
    <div id="event-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="event-modal-dialog"
        className="relative w-full max-w-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Banner */}
        <div id="event-modal-banner" className="relative h-56 flex-shrink-0">
          <img 
            id="event-modal-image"
            src={event.image} 
            alt={event.name} 
            className={`w-full h-full object-cover filter contrast-110 ${
              pending ? 'brightness-90' : 'grayscale-[40%] brightness-75'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <button 
            id="event-modal-close-icon-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-volt hover:text-black text-white flex items-center justify-center transition-colors border border-white/20 z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center space-x-2 text-volt text-xs font-athletic uppercase tracking-widest mb-1">
              <span className="px-1.5 py-0.5 bg-black/80 rounded border border-volt/40 font-bold">{event.year} Season</span>
              <span>•</span>
              <span>{event.type}</span>
              <span>•</span>
              <span>{event.region}</span>
              <span>•</span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                pending ? 'bg-volt text-black' : 'bg-black/80 text-slate-300 border border-dark-600'
              }`}>
                {pending ? (daysDelta === 0 ? 'Today' : `Pending • ${getEventRelativeTime(event.isoDate)}`) : 'Completed / Past Event'}
              </span>
            </div>
            <h2 id="event-modal-title" className="text-2xl sm:text-3xl font-athletic font-bold uppercase text-white tracking-wide flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span>{event.name}</span>
              {event.organizer && (
                <span id="event-modal-organizer" className="text-xs sm:text-sm font-sans font-normal text-slate-300 normal-case tracking-normal">
                  by {event.organizer}
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div id="event-modal-body" className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm">
          
          {/* Quick Details Bar */}
          <div id="event-modal-quick-details" className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-750 p-4 rounded-xl">
            <div id="event-modal-date" className="flex items-center space-x-3">
              <Calendar className={`w-5 h-5 flex-shrink-0 ${pending ? 'text-ocean dark:text-volt' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Event Date</div>
                <div className="font-semibold text-slate-900 dark:text-white">{event.date}</div>
                {pending && (
                  <div className="text-[11px] text-ocean dark:text-volt font-athletic font-bold uppercase tracking-wider">
                    {getEventRelativeTime(event.isoDate)}
                  </div>
                )}
              </div>
            </div>

            <div id="event-modal-location" className="flex items-center space-x-3">
              <MapPin className={`w-5 h-5 flex-shrink-0 ${pending ? 'text-ocean dark:text-volt' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Host Community</div>
                <a
                  id="event-modal-location-link"
                  href={event.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Nova Scotia')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 dark:text-white hover:text-ocean dark:hover:text-volt inline-flex items-center space-x-1 underline decoration-dotted transition-colors"
                  title="Open in Google Maps"
                >
                  <span>{event.location}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
              </div>
            </div>

            <div id="event-modal-drive-time" className="flex items-center space-x-3">
              <Car className={`w-5 h-5 flex-shrink-0 ${pending ? 'text-ocean dark:text-volt' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Drive (Hfx/Dart)</div>
                <a
                  id="event-modal-drive-link"
                  href={event.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Nova Scotia')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 dark:text-white hover:text-ocean dark:hover:text-volt inline-flex items-center space-x-1 text-xs underline decoration-dotted transition-colors"
                  title="View route on Google Maps"
                >
                  <span>{event.driveTimeFromHalifax || '1 hr (tentative - needs confirm)'}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div id="event-modal-overview">
            <h4 className="text-xs uppercase tracking-wider font-athletic font-bold text-ocean dark:text-volt mb-2">Race Overview</h4>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {event.description}
            </p>
          </div>

          {/* Course Details Grid */}
          <div id="event-modal-course-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div id="event-modal-distances" className="bg-slate-50 dark:bg-dark-850 p-3.5 rounded-lg border border-slate-200 dark:border-dark-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Distances</span>
              <div className="flex flex-wrap gap-1">
                {event.distances.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-dark-900 text-ocean dark:text-volt border border-slate-200 dark:border-dark-700 text-xs font-mono rounded font-semibold">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div id="event-modal-terrain" className="bg-slate-50 dark:bg-dark-850 p-3.5 rounded-lg border border-slate-200 dark:border-dark-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Terrain & Course</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">{event.courseType}</span>
            </div>

            <div id="event-modal-elevation" className="bg-slate-50 dark:bg-dark-850 p-3.5 rounded-lg border border-slate-200 dark:border-dark-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Elevation Profile</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">{event.elevation}</span>
            </div>
          </div>

          {/* Member Discount or Results Notice */}
          {pending ? (
            <div id="event-modal-discount-notice" className="bg-volt/15 dark:bg-volt/10 border border-volt/50 dark:border-volt/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-ocean dark:text-volt flex-shrink-0" />
                <div>
                  <span className="font-athletic text-sm uppercase font-bold text-slate-950 dark:text-volt block">
                    Run Nova Scotia Member Discount
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Active RNS members receive at least a 5% discount on registration!
                  </span>
                </div>
              </div>

              <button
                id="event-modal-join-rns-btn"
                onClick={() => {
                  onClose();
                  onJoinClick();
                }}
                className="text-xs uppercase font-athletic font-bold text-black bg-volt hover:bg-[#e5d800] px-3 py-1.5 rounded transition-colors whitespace-nowrap ml-4 cursor-pointer shadow"
              >
                Join RNS
              </button>
            </div>
          ) : (
            <div id="event-modal-results-notice" className="bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-ocean dark:text-volt flex-shrink-0" />
                <div>
                  <span className="font-athletic text-sm uppercase font-bold text-slate-900 dark:text-white block">
                    Race Has Concluded
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Official race results and age-class series points are finalized on Atlantic Chip.
                  </span>
                </div>
              </div>

              <a
                id="event-modal-results-notice-btn"
                href={event.resultsUrl || "https://atlanticchip.ca"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase font-athletic font-bold text-slate-900 dark:text-black bg-white hover:bg-slate-200 dark:bg-slate-200 dark:hover:bg-white border border-slate-300 dark:border-none px-3 py-1.5 rounded transition-colors whitespace-nowrap ml-4 flex items-center space-x-1 cursor-pointer"
              >
                <span>Results</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Price & Organizing Details */}
          <div id="event-modal-organizer-row" className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-dark-750 pt-4 gap-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Organized by: </span>
              <span className="text-slate-900 dark:text-white font-medium">{event.organizer}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Status: </span>
              <span className={pending ? "text-ocean dark:text-volt font-semibold" : "text-slate-500 dark:text-slate-400"}>
                {pending ? `Upcoming (${event.price})` : "Archived Season Result"}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div id="event-modal-footer" className="p-4 sm:p-6 bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-dark-750 flex flex-wrap items-center justify-end gap-3">
          <button
            id="event-modal-close-btn"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-athletic uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-transparent border border-slate-300 dark:border-dark-700 rounded transition-colors cursor-pointer"
          >
            Close
          </button>

          {/* Official Event Website if available */}
          {event.websiteUrl && (
            <a
              id="event-modal-website-btn"
              href={event.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt border border-slate-300 dark:border-dark-650 rounded text-xs font-athletic uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-ocean dark:text-volt" />
              <span>Event Website</span>
            </a>
          )}

          {/* Google Maps Deeplink */}
          <a
            id="event-modal-maps-btn"
            href={event.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Nova Scotia')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white hover:bg-slate-100 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 hover:text-ocean dark:hover:text-volt border border-slate-300 dark:border-dark-650 rounded text-xs font-athletic uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-ocean dark:text-volt" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          
          {pending ? (
            <a
              id="event-modal-register-btn"
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-volt hover:bg-[#e5d800] text-black font-athletic font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center space-x-2 shadow cursor-pointer"
            >
              <span>
                {event.registrationUrl?.includes('raceroster.com')
                  ? 'Register on Race Roster'
                  : event.registrationUrl?.includes('route541.com')
                  ? 'Register on Route541'
                  : event.registrationUrl?.includes('webscorer.com')
                  ? 'Register on Webscorer'
                  : event.registrationUrl?.includes('terryfox.ca')
                  ? 'Join / Donate on Terry Fox'
                  : 'Register for Race'}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a
              id="event-modal-results-btn"
              href={event.resultsUrl || "https://atlanticchip.ca"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-athletic font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center space-x-2 border border-slate-300 dark:border-dark-650 cursor-pointer"
            >
              <span>View Official Chip Results</span>
              <Trophy className="w-3.5 h-3.5 text-ocean dark:text-volt" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
