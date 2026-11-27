import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteImages } from "@/lib/images";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Array of images for the carousel
  const images = siteImages.heroSlides;

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects - smoother and more subtle
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.9), 1);

  // Subtle zoom effect: gentle scale up when scrolling down
  const imageScale = 1 + (scrollProgress * 0.15); // Gentle zoom from 1x to 1.15x

  // Text stays in place after initial animation - no scroll effects
  const textTranslateX = 0; // No scroll-based movement
  const textOpacity = 1; // No scroll-based opacity changes

  return (
    <section className="relative min-h-screen flex items-center justify-start bg-background overflow-hidden pt-32">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-3000 ease-in-out ${
              index === currentImageIndex ? 'opacity-70' : 'opacity-0'
            }`}
            style={{
              transform: `scale(${imageScale})`,
              transition: 'transform 0.8s ease-out, opacity 3s ease-in-out'
            }}
          >
            <img
              src={image}
              alt={`ChEA Department ${index + 1}`}
              className="w-full h-full object-cover object-center"
              style={{
                filter: 'blur(0.5px) brightness(0.8) contrast(1.05)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Background overlay for better text readability - reduced for more image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/45 to-background/20"></div>
      
      {/* Background chemical imagery overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/30"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-primary/20"></div>
        <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-primary/25"></div>
        {/* Molecular dots */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/2 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      {/* Animated Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div
          className="max-w-3xl ml-8 md:ml-16 lg:ml-24 xl:ml-32"
          style={{
            transform: `translateX(${isLoaded ? textTranslateX : -100}vw)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: 'transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2.5s ease-out'
          }}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-tight mb-6"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <span
              className="inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.5) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s'
              }}
            >
              Welcome to ChEA -
            </span>
            <br />
            <span
              className="text-foreground inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.6) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s'
              }}
            >
              Chemical
            </span>
            <br />
            <span
              className="text-foreground inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.7) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s'
              }}
            >
              Engineering
            </span>
            <br />
            <span
              className="text-foreground inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.8) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s'
              }}
            >
              Association
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-light">
            <span
              className="inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.3) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s',
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
              }}
            >
              Empowering Students of
            </span>
            <br />
            <span
              className="inline-block transition-all duration-2500 ease-out"
              style={{
                transform: `translateX(${isLoaded ? (textTranslateX * 0.4) : -100}vw)`,
                opacity: isLoaded ? textOpacity : 0,
                transitionDelay: '0.4s',
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
              }}
            >
              Chemical Engineering
            </span>
          </div>

          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light transition-all duration-2500 ease-out shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{
              transform: `translateX(${isLoaded ? (textTranslateX * 0.2) : -100}vw) scale(${isLoaded ? 1 : 0.95})`,
              opacity: isLoaded ? textOpacity : 0,
              transitionDelay: '0.4s'
            }}
          >
            <Link to="/vision">Discover More</Link>
          </Button>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === currentImageIndex}
              className={`w-3 h-3 rounded-full transition-all duration-700 ease-out ${
                index === currentImageIndex
                  ? 'bg-primary scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/70 hover:scale-110'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              style={{ backdropFilter: 'blur(2px)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
