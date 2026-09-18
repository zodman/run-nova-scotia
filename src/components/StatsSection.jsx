import React from 'react';
import { Award, Calendar, Users, HeartHandshake } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      value: "40+",
      label: "Years of Road Running",
      subtext: "Guiding runners since 1984",
      icon: Award
    },
    {
      value: "20+",
      label: "Sanctioned Series Races",
      subtext: "From 1-mile sprints to full marathons",
      icon: Calendar
    },
    {
      value: "3,500+",
      label: "Annual Series Finishers",
      subtext: "Across every Nova Scotia county",
      icon: Users
    },
    {
      value: "100%",
      label: "Volunteer-Driven",
      subtext: "By runners, for runners",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="stats-section" className="bg-[#081426] border-b border-dark-750 py-16 px-4 sm:px-8 relative">
      <div id="stats-container" className="max-w-7xl mx-auto">
        <div id="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                id={`stat-card-${idx}`}
                className="group relative bg-dark-850/70 hover:bg-dark-800 border border-dark-700/80 hover:border-volt/50 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl sm:text-5xl font-athletic font-bold text-volt tracking-tight">
                    {stat.value}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-dark-750 group-hover:bg-volt/15 group-hover:text-volt text-slate-400 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-base font-athletic font-bold text-white uppercase tracking-wider mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-normal">
                  {stat.subtext}
                </p>

                {/* Micro accent dot */}
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-dark-700 group-hover:bg-volt transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
