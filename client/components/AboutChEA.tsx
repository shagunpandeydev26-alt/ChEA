import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";

export default function AboutChEA() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Single background image
  const backgroundImage = "data:image/jpeg;base64,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?format=webp&width=800";

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
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/30 to-background/20"></div>
      
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

    </section>
  );
}
