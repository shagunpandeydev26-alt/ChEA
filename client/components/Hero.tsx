import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Array of images for the carousel
  const images = [
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F6772b371f4814bc98b2cf668c8b63c85?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F7f76d15846714e82b37da415ec914a8f?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4722d5d1ce014a308bb79a3a758dd8ac?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F00108060be0b49f38e94860468ddbfef?format=webp&width=800"
  ];

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

  // Calculate scroll-based effects
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);
  
  // Zoom effect: scale up when scrolling down, scale down when scrolling up
  const imageScale = 1 + (scrollProgress * 0.3); // Zoom from 1x to 1.3x
  
  // Text animation: slide left when scrolling down
  const textTranslateX = scrollProgress * -150; // Move left up to -150px
  const textOpacity = Math.max(0, 1 - (scrollProgress * 1.5)); // Fade out as scrolling

  return (
    <section className="relative min-h-screen flex items-center justify-start bg-background overflow-hidden pt-32">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-15' : 'opacity-0'
            }`}
            style={{
              transform: `scale(${imageScale})`,
              transition: 'transform 0.1s ease-out, opacity 1s ease-in-out'
            }}
          >
            <img
              src={image}
              alt={`ChEA Department ${index + 1}`}
              className="w-full h-full object-cover object-center"
              style={{
                filter: 'blur(1px) brightness(0.7) contrast(1.1)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/70 to-background/40"></div>
      
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
          className="max-w-3xl transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${isLoaded ? textTranslateX : -200}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-out'
          }}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-tight mb-6"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <span 
              className="inline-block transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : -100}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: '0.2s'
              }}
            >
              Welcome to ChEA -
            </span>
            <br />
            <span 
              className="text-foreground inline-block transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : -100}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: '0.4s'
              }}
            >
              Chemical
            </span>
            <br />
            <span 
              className="text-foreground inline-block transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : -100}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: '0.6s'
              }}
            >
              Engineering
            </span>
            <br />
            <span 
              className="text-foreground inline-block transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(${isLoaded ? 0 : -100}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: '0.8s'
              }}
            >
              Association
            </span>
          </h1>

          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-light transition-all duration-1000 ease-out"
            style={{
              transform: `translateX(${isLoaded ? 0 : -100}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '1s',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Empowering Students of
            <br />
            Chemical Engineering
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light transition-all duration-1000 ease-out shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{
              transform: `translateX(${isLoaded ? 0 : -100}px) scale(${isLoaded ? 1 : 0.8})`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '1.2s'
            }}
          >
            Discover More
          </Button>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
