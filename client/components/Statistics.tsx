import { useState, useEffect } from "react";

export default function Statistics() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const stats = [
    { number: "2022", label: "Established" },
    { number: "10+", label: "annually" },
    { number: "3+", label: "Conferences per year" },
    { number: "5+", label: "No. of workshops" },
    { number: "50+", label: "Members" },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects for this section
  const sectionElement = typeof document !== 'undefined' ? document.getElementById('statistics') : null;
  const sectionTop = sectionElement?.offsetTop || 3000;
  const scrollProgress = Math.max(0, Math.min((scrollY - sectionTop + window.innerHeight) / window.innerHeight, 1));
  
  // Text animation effects
  const textTranslateY = scrollProgress * -15;
  const textOpacity = Math.max(0.7, 1 - (scrollProgress * 0.3));

  return (
    <section id="statistics" className="py-24 bg-background relative overflow-hidden">
      {/* Background wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-primary/20"
        >
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div 
          className="text-center mb-16"
          style={{
            transform: `translateY(${isLoaded ? textTranslateY : 30}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1.5s ease-out'
          }}
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground transition-all duration-1500 ease-out"
            style={{
              transform: `translateY(${isLoaded ? 0 : 30}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '0.3s'
            }}
          >
            ChEA in Numbers
          </h2>
        </div>

        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12"
          style={{
            transform: `translateY(${isLoaded ? (textTranslateY * 0.5) : 40}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1.5s ease-out'
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center transition-all duration-1500 ease-out"
              style={{
                transform: `translateY(${isLoaded ? 0 : 30}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: `${0.5 + (index * 0.1)}s`
              }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
