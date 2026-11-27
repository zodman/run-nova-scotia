#!/usr/bin/env node

/**
 * generate-calendar.mjs
 * 
 * Compiles all sanctioned and multi-source races from src/data/eventsData.js
 * into a standard RFC-5545 compliant public/events.ics calendar feed.
 * 
 * Supports live auto-updating subscriptions via webcal:// and https:// feeds:
 * - Apple Calendar / iOS / macOS
 * - Google Calendar
 * - Microsoft Outlook / Office 365
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { eventsData } from '../src/data/eventsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const outputFile = path.join(publicDir, 'events.ics');

function escapeIcsText(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function generateIcs(events) {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Run Nova Scotia//Race Calendar 2026-2027//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Run Nova Scotia Race Calendar',
    'X-WR-CALDESC:Official Nova Scotia Road Race & Partner Calendar. Live subscription feed.',
    'X-WR-TIMEZONE:America/Halifax',
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    'X-PUBLISHED-TTL:P1D'
  ];

  events.forEach(event => {
    if (!event.isoDate) return;
    const cleanDate = event.isoDate.replace(/-/g, '');
    const uid = `${event.id || 'race'}-${cleanDate}@runnovascotia.ca`;
    const summary = escapeIcsText(`🏃 ${event.name}`);
    const location = escapeIcsText(event.location || 'Nova Scotia, Canada');
    const url = event.registrationUrl || event.websiteUrl || 'https://runnovascotia.ca';

    let descParts = [];
    if (event.description) descParts.push(event.description);
    if (event.distances && event.distances.length > 0) descParts.push(`📍 Distances: ${event.distances.join(', ')}`);
    if (event.category) descParts.push(`🏆 Category: ${event.category}`);
    if (event.source) descParts.push(`🏁 Source: ${event.source}`);
    if (event.organizer) descParts.push(`👤 Host: ${event.organizer}`);
    descParts.push(`🔗 Registration & Details: ${url}`);
    
    const description = escapeIcsText(descParts.join('\n\n'));

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART:${cleanDate}T120000Z`);
    lines.push(`DTEND:${cleanDate}T150000Z`);
    lines.push(`SUMMARY:${summary}`);
    lines.push(`DESCRIPTION:${description}`);
    lines.push(`LOCATION:${location}`);
    lines.push(`URL:${url}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:TRANSPARENT');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

const icsContent = generateIcs(eventsData);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(outputFile, icsContent, 'utf8');

console.log(`✅ Generated live calendar subscription feed: ${outputFile}`);
console.log(`   Total events compiled: ${eventsData.length}`);
console.log(`   File size: ${(icsContent.length / 1024).toFixed(2)} KB`);
