import React, { useState, useRef } from 'react';
import { Check, ShieldCheck, Shirt, Award, ArrowRight, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { membershipPlans, membershipBenefitsList } from '../data/membershipData';

export default function MembershipPricing({ onSelectPlan }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('[id^="pricing-card-"]')?.offsetWidth || 340;
      const scrollAmount = (cardWidth + 24) * (direction === 'left' ? -1 : 1);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="membership" className="py-24 bg-white dark:bg-[#040b17] relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-ocean/10 dark:bg-ocean/20 rounded-full blur-3xl pointer-events-none" />

      <div id="pricing-container" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div id="pricing-header" className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div id="pricing-header-eyebrow" className="inline-flex items-center space-x-2 text-ocean dark:text-volt text-xs sm:text-sm font-athletic font-bold uppercase tracking-widest">
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
            <span>Membership 2027</span>
            <span className="w-6 h-0.5 bg-ocean dark:bg-volt" />
          </div>
          <h2 id="pricing-title" className="text-3xl sm:text-5xl font-athletic font-bold uppercase tracking-tight text-slate-900 dark:text-white">
            Join The <span className="text-ocean dark:text-volt">Run Nova Scotia</span> Family
          </h2>
          <p id="pricing-subtitle" className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Open to all comers — whether you are an individual runner, active family, or senior master. 
            All amounts include mandatory fees and provide complete Road Race & Performance Series perks.
          </p>
        </div>

        {/* Carousel Container with Left & Right Navigation Buttons */}
        <div className="relative group mb-16">
          
          {/* Left / Prev Button */}
          <button
            id="pricing-carousel-prev-btn"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-dark-800 border-2 border-slate-200 dark:border-dark-700 text-slate-800 dark:text-slate-100 disabled:opacity-0 disabled:pointer-events-none hover:border-ocean dark:hover:border-volt hover:text-ocean dark:hover:text-volt hover:scale-110 flex items-center justify-center transition-all shadow-xl cursor-pointer"
            aria-label="Previous membership options"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right / Next Button */}
          <button
            id="pricing-carousel-next-btn"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-dark-800 border-2 border-slate-200 dark:border-dark-700 text-slate-800 dark:text-slate-100 disabled:opacity-0 disabled:pointer-events-none hover:border-ocean dark:hover:border-volt hover:text-ocean dark:hover:text-volt hover:scale-110 flex items-center justify-center transition-all shadow-xl cursor-pointer"
            aria-label="Next membership options"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pricing Cards Horizontal Row / Carousel */}
          <div 
            id="pricing-cards-carousel"
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-6 items-stretch pt-6 px-4 pb-6 snap-x snap-mandatory scrollbar-none focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: 'none' }}
          >
          {membershipPlans.map((plan) => (
            <div 
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`flex-none w-[300px] sm:w-[340px] snap-start relative rounded-2xl flex flex-col justify-between p-7 transition-all duration-300 transform hover:-translate-y-1 ${
                plan.isPopular 
                  ? 'bg-white dark:bg-dark-850 border-2 border-ocean dark:border-volt shadow-xl dark:shadow-[0_0_30px_rgba(254,240,0,0.22)]' 
                  : 'bg-slate-50 dark:bg-dark-850/70 border border-slate-200 dark:border-dark-750 hover:border-ocean/50 dark:hover:border-volt/50 shadow-md'
              }`}
            >
              {/* Badge for Popular/Featured Plan */}
              {plan.badge && (
                <div 
                  id={`pricing-badge-${plan.id}`}
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-athletic font-bold uppercase tracking-wider whitespace-nowrap z-10 ${
                    plan.isPopular ? 'bg-volt text-black shadow-lg' : 'bg-slate-200 dark:bg-dark-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-dark-650'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Card Header */}
              <div className="space-y-4">
                <h3 id={`pricing-plan-title-${plan.id}`} className="text-xl font-athletic font-bold uppercase text-slate-900 dark:text-white tracking-wide">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline space-x-1.5">
                  <span id={`pricing-plan-price-${plan.id}`} className="text-4xl font-athletic font-extrabold text-ocean dark:text-volt tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-athletic uppercase text-slate-500 dark:text-slate-400">
                    {plan.period}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[44px]">
                  {plan.description}
                </p>

                {/* Features List */}
                <div id={`pricing-plan-features-${plan.id}`} className="pt-4 border-t border-slate-200 dark:border-dark-750 space-y-2.5">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-volt/20 dark:bg-volt/15 text-slate-950 dark:text-volt flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-6 mt-4">
                <button
                  id={`pricing-plan-btn-${plan.id}`}
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 rounded font-athletic text-sm uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-volt hover:bg-[#E5D800] text-black shadow-md hover:shadow-lg'
                      : 'bg-slate-200 hover:bg-slate-300 dark:bg-dark-750 dark:hover:bg-volt dark:hover:text-black text-slate-800 dark:text-white border border-slate-300 dark:border-dark-650'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Benefits Breakdown Banner (Zunzo Style) */}
        <div id="pricing-benefits-banner" className="bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-750 rounded-2xl p-8 sm:p-10 shadow-xl dark:shadow-2xl">
          <div id="pricing-benefits-header" className="text-center max-w-2xl mx-auto mb-10">
            <h3 id="pricing-benefits-title" className="text-2xl sm:text-3xl font-athletic font-bold uppercase text-slate-900 dark:text-white">
              Why Join <span className="text-ocean dark:text-volt">Run Nova Scotia</span>?
            </h3>
            <p id="pricing-benefits-subtitle" className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Your $35 membership fee directly supports grassroots road running, permits, chip timing equipment, and youth series throughout Nova Scotia.
            </p>
          </div>

          <div id="pricing-benefits-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipBenefitsList.map((item, idx) => (
              <div key={idx} id={`pricing-benefit-${idx}`} className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-750 p-5 rounded-xl hover:border-ocean/50 dark:hover:border-volt/50 shadow-sm transition-colors">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-lg bg-volt/20 dark:bg-volt/10 text-ocean dark:text-volt flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-athletic font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
