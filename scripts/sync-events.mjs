#!/usr/bin/env node

/**
 * sync-events.mjs
 * 
 * Multi-source event synchronization & search audit tool for Run Nova Scotia:
 * 1. https://runnovascotia.ca/events/list/ (Tribe Events API)
 * 2. https://runnovascotia.ca/road-race-series/ (Road Race Series Table)
 * 3. https://timer.raceroster.com/widgets/api/g7QHLyu5Ejpahe7MWgnqXcz?offset=0 (Atlantic Chip direct API)
 * 4. https://www.route541.com/Events/UpcomingEvents (Route 541 Upcoming Events)
 * 5. https://search.raceroster.com/search?q=nova%20scotia&t=upcoming (Race Roster NS Search API)
 */

import { eventsData } from '../src/data/eventsData.js';

console.log('🏁 Run Nova Scotia — Multi-Source Event Synchronization & Audit');
console.log('================================================================\n');

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.json();
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.text();
}

function clean(s) {
  return (s || '').toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/&#8217;/g, "'")
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchLocal(name, dateStr, url) {
  const n = clean(name);
  for (const le of eventsData) {
    const leName = clean(le.name);
    if (url && le.websiteUrl && le.websiteUrl.replace(/\/$/, '') === url.replace(/\/$/, '')) return le;
    if (url && le.registrationUrl && le.registrationUrl.split('?')[0] === url.split('?')[0]) return le;
    if (leName.includes(n) || n.includes(leName)) return le;
    
    const w1 = n.split(' ').filter(w => w.length > 3 && !['road', 'race', 'series', 'annual'].includes(w));
    const w2 = leName.split(' ').filter(w => w.length > 3 && !['road', 'race', 'series', 'annual'].includes(w));
    const overlap = w1.filter(w => w2.includes(w));
    if (w1.length > 0 && overlap.length >= Math.min(w1.length, 2)) return le;
  }
  return null;
}

async function run() {
  console.log(`📊 Local events in eventsData.js: ${eventsData.length}`);

  // 1. Run NS Events Calendar API
  console.log('\n[1/4] Fetching https://runnovascotia.ca/events/list/...');
  let tribeEvents = [];
  try {
    const data = await fetchJson('https://runnovascotia.ca/wp-json/tribe/events/v1/events?start_date=2026-01-01%2000:00:00&per_page=100');
    tribeEvents = data.events || [];
    console.log(`  Found ${tribeEvents.length} events from Events Calendar API.`);
  } catch (err) {
    console.error('  Failed to fetch Tribe Events API:', err.message);
  }

  // 2. Road Race Series
  console.log('\n[2/4] Fetching https://runnovascotia.ca/road-race-series/...');
  const rrsEvents = [];
  try {
    const html = await fetchHtml('https://runnovascotia.ca/road-race-series/');
    const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
    let match;
    while ((match = tableRegex.exec(html)) !== null) {
      const tableContent = match[1];
      if (tableContent.includes('Event Name') && tableContent.includes('Distance(s)')) {
        const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        let rowMatch;
        let isFirst = true;
        while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
          if (isFirst) { isFirst = false; continue; }
          const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
          const cells = [];
          let cellMatch;
          while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
            cells.push(cellMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
          }
          if (cells.length >= 4 && cells[0]) {
            const linkMatch = rowMatch[1].match(/href="([^"]+)"/);
            rrsEvents.push({
              name: cells[0],
              distances: cells[1],
              date: cells[2],
              location: cells[3],
              url: linkMatch ? linkMatch[1].trim() : ''
            });
          }
        }
      }
    }
    console.log(`  Found ${rrsEvents.length} sanctioned races from Road Race Series table.`);
  } catch (err) {
    console.error('  Failed to fetch Road Race Series table:', err.message);
  }

  // 3. Atlantic Chip Direct API
  console.log('\n[3/4] Fetching Atlantic Chip direct API (https://timer.raceroster.com/widgets/api/g7QHLyu5Ejpahe7MWgnqXcz?offset=0)...');
  let acEvents = [];
  try {
    const data = await fetchJson('https://timer.raceroster.com/widgets/api/g7QHLyu5Ejpahe7MWgnqXcz?offset=0');
    const rows = data.rows || [];
    acEvents = rows.map(r => {
      const info = r[0] || {};
      return {
        name: info.name || '',
        url: info.url || '',
        date: r[1] || '',
        location: r[2] || '',
        logo: info.logo || ''
      };
    });
    console.log(`  Found ${acEvents.length} events from Atlantic Chip live timer API.`);
  } catch (err) {
    console.error('  Failed to fetch Atlantic Chip API:', err.message);
  }

  // 4. Route 541 Upcoming Events
  console.log('\n[4/5] Fetching Route 541 (https://www.route541.com/Events/UpcomingEvents)...');
  const r541Events = [];
  try {
    const html = await fetchHtml('https://www.route541.com/Events/UpcomingEvents');
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let match;
    while ((match = trRegex.exec(html)) !== null) {
      const rowContent = match[1];
      if (rowContent.includes('/Events/Summary?EVENT_ID=')) {
        const linkMatch = rowContent.match(/href="([^"]*\/Events\/Summary\?EVENT_ID=[^"]*)"/);
        const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        const cells = [];
        let cMatch;
        while ((cMatch = cellRegex.exec(rowContent)) !== null) {
          cells.push(cMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
        }
        if (cells.length >= 4) {
          r541Events.push({
            name: cells[1],
            host: cells[2],
            location: cells[3],
            date: cells[4],
            url: linkMatch ? 'https://www.route541.com' + linkMatch[1] : ''
          });
        }
      }
    }
    console.log(`  Found ${r541Events.length} events from Route 541 Upcoming Events.`);
  } catch (err) {
    console.error('  Failed to fetch Route 541:', err.message);
  }

  // 5. Race Roster Nova Scotia Search
  console.log('\n[5/5] Fetching Race Roster (https://search.raceroster.com/search?q=nova%20scotia&t=upcoming)...');
  let rrEvents = [];
  try {
    let rrUrl = 'https://search.raceroster.com/search?q=nova%20scotia&t=upcoming';
    while (rrUrl) {
      const json = await fetchJson(rrUrl);
      const items = json.data || [];
      rrEvents.push(...items);
      rrUrl = json.meta?.nextPage || null;
    }
    console.log(`  Found ${rrEvents.length} events from Race Roster search API.`);
  } catch (err) {
    console.error('  Failed to fetch Race Roster search:', err.message);
  }

  // Audit
  console.log('\n================ AUDIT SUMMARY ================');
  let missingCount = 0;

  for (const te of tribeEvents) {
    if (!matchLocal(te.title, te.start_date, te.url)) {
      console.log(`❌ Run NS Calendar missing: "${te.title}" (${te.url})`);
      missingCount++;
    }
  }

  for (const rrs of rrsEvents) {
    if (!matchLocal(rrs.name, rrs.date, rrs.url)) {
      console.log(`❌ Road Race Series missing: "${rrs.name}" (${rrs.location})`);
      missingCount++;
    }
  }

  for (const ac of acEvents) {
    if (!matchLocal(ac.name, ac.date, ac.url)) {
      console.log(`ℹ️ Atlantic Chip external: "${ac.name}" (${ac.location})`);
    }
  }

  for (const r of r541Events) {
    if (!matchLocal(r.name, r.date, r.url)) {
      console.log(`ℹ️ Route 541 external: "${r.name}" (${r.location})`);
    }
  }

  for (const rr of rrEvents) {
    if (rr.name && !rr.name.toLowerCase().includes('membership')) {
      if (!matchLocal(rr.name, rr.date, rr.url)) {
        console.log(`ℹ️ Race Roster event: "${rr.name}" (${rr.location?.city || ''})`);
      }
    }
  }

  if (missingCount === 0) {
    console.log(`\n✅ 100% of official series events and published calendar events are synchronized!`);
    console.log(`Total database events: ${eventsData.length}`);
  }
}

run().catch(console.error);
