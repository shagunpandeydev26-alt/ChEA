import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";

export default function AboutChEA() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Single background image
  const backgroundImage = "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F6772b371f4814bc98b2cf668c8b63c85?format=webp&width=800";

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // No carousel effect needed

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects for this section
  const sectionElement = typeof document !== 'undefined' ? document.getElementById('about-chea') : null;
  const sectionTop = sectionElement?.offsetTop || 1000;
  const scrollProgress = Math.max(0, Math.min((scrollY - sectionTop + window.innerHeight) / window.innerHeight, 1));
  
  // Background image scaling effect (same as hero)
  const backgroundScale = 1 + (scrollProgress * 0.15); // Gentle zoom from 1x to 1.15x

  return (
    <section id="about-chea" className="py-24 bg-background relative overflow-hidden">
      {/* Single Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${backgroundScale})`,
            transition: 'transform 0.8s ease-out'
          }}
        >
          <img
            src={backgroundImage}
            alt="About ChEA Background"
            className="w-full h-full object-cover object-center opacity-100"
            style={{
              filter: 'brightness(1.0) contrast(1.0)',
            }}
          />
        </div>
      </div>

      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/60"></div>
      
      {/* Background chemical imagery overlay - Same as Hero */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-primary/30"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-primary/20"></div>
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full border border-primary/25"></div>
        {/* Molecular dots */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 h-screen max-h-[800px]">
          {/* About ChEA Card - Top Left */}
          <Card 
            className="relative group overflow-hidden border-border/20 hover:scale-105 transition-all duration-[2000ms] ease-out"
            style={{
              transform: `translateX(${isLoaded ? 0 : -40}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '0.2s'
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F6772b371f4814bc98b2cf668c8b63c85?format=webp&width=800"
                alt="Chemical Engineering Lab"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-primary rounded-md"></div>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                About ChEA
              </h3>
              <p className="text-gray-300 leading-relaxed">
                ChEA (Chemical Engineering Association) is dedicated to fostering 
                the growth and development of aspiring chemical engineers. We 
                provide a platform for students to enhance their knowledge, skills, and 
                understanding of the field through various events, workshops, and 
                networking opportunities.
              </p>
            </CardContent>
          </Card>

          {/* Student's Corner Card - Top Right */}
          <Card 
            className="relative group overflow-hidden border-border/20 hover:scale-105 transition-all duration-[2000ms] ease-out"
            style={{
              transform: `translateX(${isLoaded ? 0 : 40}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '0.4s'
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F7f76d15846714e82b37da415ec914a8f?format=webp&width=800"
                alt="Students Learning"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Student's Corner
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The student's corner is where our members can access resources, articles, 
                and educational materials related to chemical engineering. It's a space 
                designed to support and guide students in their academic and professional 
                journey.
              </p>
            </CardContent>
          </Card>

          {/* Events Card - Bottom Left */}
          <Card 
            className="relative group overflow-hidden border-border/20 hover:scale-105 transition-all duration-[2000ms] ease-out"
            style={{
              transform: `translateX(${isLoaded ? 0 : -40}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '0.6s'
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4722d5d1ce014a308bb79a3a758dd8ac?format=webp&width=800"
                alt="Chemical Engineering Events"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 9V7.5c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5V9c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-1 0h-2V7.5c0-.28.22-.5.5-.5s.5.22.5.5V9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Events
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Stay updated with our past and upcoming events. We 
                host workshops, seminars, and industry visits to give students 
                practical exposure and insights into the world of 
                chemical engineering.
              </p>
            </CardContent>
          </Card>

          {/* Facility Details Card - Bottom Right */}
          <Card 
            className="relative group overflow-hidden border-border/20 hover:scale-105 transition-all duration-[2000ms] ease-out"
            style={{
              transform: `translateX(${isLoaded ? 0 : 40}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '0.8s'
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F00108060be0b49f38e94860468ddbfef?format=webp&width=800"
                alt="Chemical Engineering Facilities"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Facility Details
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our state-of-the-art facilities are equipped with the latest tools and 
                technologies to provide students with a hands-on learning experience. From 
                laboratories to research centers, we ensure that our members have access to 
                the best resources.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Event Registration Section */}
        <div className="mt-16">
          <Card 
            className="relative group overflow-hidden border-border/20 hover:scale-[1.02] transition-all duration-[2000ms] ease-out"
            style={{
              transform: `translateY(${isLoaded ? 0 : 40}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: '1.0s'
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F6772b371f4814bc98b2cf668c8b63c85?format=webp&width=800"
                alt="Event Registration"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/75"></div>
            </div>
            <CardContent className="relative z-10 p-12 text-center">
              <div className="inline-block mb-6">
                <div className="w-20 h-20 bg-red-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-light text-white mb-6">
                Event Registration
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-lg">
                Register for our upcoming events and secure your spot. Take advantage of this 
                opportunity to network with industry professionals and expand your 
                knowledge to further your career in chemical engineering.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Carousel indicators - Same as Hero */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex space-x-3">
          {backgroundImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-700 ease-out ${
                index === currentImageIndex
                  ? 'bg-primary scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/70 hover:scale-110'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                cursor: 'pointer',
                backdropFilter: 'blur(2px)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
