import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function FinalCTA() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects for this section
  const sectionElement =
    typeof document !== "undefined"
      ? document.getElementById("final-cta")
      : null;
  const sectionTop = sectionElement?.offsetTop || 4000;
  const scrollProgress = Math.max(
    0,
    Math.min(
      (scrollY - sectionTop + window.innerHeight) / window.innerHeight,
      1,
    ),
  );

  // Text animation effects
  const textTranslateX = scrollProgress * -20;
  const textOpacity = Math.max(0.6, 1 - scrollProgress * 0.4);

  return (
    <section
      id="final-cta"
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Background molecular patterns */}
      <div className="absolute inset-0 opacity-20">
        {/* Scattered molecular elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-primary/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 border border-primary/25 rounded-full"></div>

        {/* Molecular dots */}
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-primary/50 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-primary/60 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/2 right-1/2 w-2 h-2 bg-primary/55 rounded-full"></div>

        {/* Additional scattered dots */}
        <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-primary/45 rounded-full"></div>
        <div className="absolute bottom-1/5 left-1/5 w-2 h-2 bg-primary/50 rounded-full"></div>
        <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Heading */}
          <div
            style={{
              transform: `translateX(${isLoaded ? textTranslateX : -50}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition:
                "transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1.5s ease-out",
            }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight transition-all duration-1500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : -40}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: "0.4s",
              }}
            >
              Join ChEA and Ignite Your
              <br />
              Potential
            </h2>
          </div>

          {/* Description and CTA */}
          <div
            style={{
              transform: `translateX(${isLoaded ? textTranslateX * -0.5 : 50}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition:
                "transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1.5s ease-out",
            }}
          >
            <p
              className="text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-1500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : 40}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: "0.6s",
              }}
            >
              Take the first step towards a successful career in chemical
              engineering. Join ChEA to access a world of opportunities, enrich
              your learning, and connect with a community of passionate
              individuals.
            </p>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light transition-all duration-1500 ease-out shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                transform: `translateX(${isLoaded ? 0 : 40}px) scale(${isLoaded ? 1 : 0.95})`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: "0.8s",
              }}
            >
              Become a Member
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
