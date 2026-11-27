/**
 * calendarUtils.js
 * 
 * Generates Google Calendar, Outlook, and iCalendar (.ics) export URLs & downloads
 * for race participants across Nova Scotia.
 */

function formatIsoForCalendar(isoDate, isAllDay = false) {
  if (!isoDate) return '';
  const cleanDate = isoDate.replace(/-/g, '');
  if (isAllDay) {
    // For all day event, end date is next day
    const d = new Date(isoDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    const nextDay = d.toISOString().split('T')[0].replace(/-/g, '');
    return `${cleanDate}/${nextDay}`;
  }
  // Default morning 09:00 ADT (12:00 UTC) to 12:00 ADT (15:00 UTC)
  return `${cleanDate}T120000Z/${cleanDate}T150000Z`;
}

/**
 * Generates direct Google Calendar web URL
 */
export function createGoogleCalendarUrl(event) {
  if (!event) return '#';
  const dates = formatIsoForCalendar(event.isoDate, false);
  const details = `${event.description || ''}\n\n📍 Distances: ${(event.distances || []).join(', ')}\n🔗 Register: ${event.registrationUrl || event.websiteUrl || ''}\n🏁 Source: ${event.source || 'Run Nova Scotia'}`;
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `🏃 ${event.name}`,
    dates: dates,
    details: details,
    location: event.location || 'Nova Scotia, Canada',
    sprop: 'website:runnovascotia.ca'
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates direct Outlook.com web calendar URL
 */
export function createOutlookCalendarUrl(event) {
  if (!event) return '#';
  const startDt = `${event.isoDate}T09:00:00`;
  const endDt = `${event.isoDate}T12:00:00`;
  const body = `${event.description || ''}\n\nDistances: ${(event.distances || []).join(', ')}\nOfficial Link: ${event.registrationUrl || event.websiteUrl || ''}`;

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `🏃 ${event.name}`,
    startdt: startDt,
    enddt: endDt,
    body: body,
    location: event.location || 'Nova Scotia, Canada'
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Creates RFC-5545 compliant iCalendar content (.ics)
 */
export function createIcsContent(event) {
  const cleanDate = (event.isoDate || '').replace(/-/g, '');
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `${event.id || 'event'}-${cleanDate}@runnovascotia.ca`;
  const summary = (event.name || 'Nova Scotia Running Event').replace(/,/g, '\\,');
  const location = (event.location || 'Nova Scotia, Canada').replace(/,/g, '\\,');
  const description = (event.description || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const url = event.registrationUrl || event.websiteUrl || 'https://runnovascotia.ca';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Run Nova Scotia//Race Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${cleanDate}T120000Z`,
    `DTEND:${cleanDate}T150000Z`,
    `SUMMARY:🏃 ${summary}`,
    `DESCRIPTION:${description}\\n\\nRegistration: ${url}`,
    `LOCATION:${location}`,
    `URL:${url}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Triggers a browser download of the .ics file for Apple Calendar, Outlook, and mobile devices
 */
export function downloadIcsFile(event) {
  if (!event) return;
  const icsData = createIcsContent(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${event.id || 'event'}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
