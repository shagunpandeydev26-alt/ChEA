import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";

export default function AboutChEA() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects for this section
  const sectionElement = typeof document !== 'undefined' ? document.getElementById('about-chea') : null;
  const sectionTop = sectionElement?.offsetTop || 1000;
  const scrollProgress = Math.max(0, Math.min((scrollY - sectionTop + window.innerHeight) / window.innerHeight, 1));
  
  // Image sliding effect - slides left when scrolling down, right when scrolling up
  const imageTranslateX = scrollProgress * -100; // Move left up to -100px when scrolling down

  return (
    <section id="about-chea" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 min-h-[800px]">
          {/* Left Side - Vertical About ChEA Box */}
          <div className="lg:col-span-2">
            <Card 
              className="relative overflow-hidden border-border/20 h-full"
              style={{
                transform: `translateX(${isLoaded ? 0 : -100}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out',
                transitionDelay: '0.2s'
              }}
            >
              {/* Background Image with Scroll Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg/v1/fill/w_828,h_1338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg"
                  alt="About ChEA Background"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translateX(${imageTranslateX}px)`,
                    transition: 'transform 0.1s ease-out',
                    minWidth: '120%', // Make image wider to allow sliding
                  }}
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>

              {/* Content Overlay */}
              <CardContent className="relative z-10 p-8 h-full flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                  About ChEA
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ChEA (Chemical Engineering Association) is dedicated to fostering 
                  the growth and development of aspiring chemical engineers. We 
                  provide a platform for students to enhance their knowledge, skills, and 
                  understanding of the field through various events, workshops, and 
                  networking opportunities.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Four Cards Stacked */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            {/* Student's Corner Card */}
            <Card 
              className="bg-card/80 border-border/30 backdrop-blur-sm hover:bg-card/90 transition-all duration-[2000ms] ease-out flex-1"
              style={{
                transform: `translateX(${isLoaded ? 0 : 100}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out',
                transitionDelay: '0.4s'
              }}
            >
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Student's Corner
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      The student's corner is where our members can access resources, articles, 
                      and educational materials related to chemical engineering. It's a space 
                      designed to support and guide students in their academic and professional 
                      journey.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events Card */}
            <Card 
              className="bg-card/80 border-border/30 backdrop-blur-sm hover:bg-card/90 transition-all duration-[2000ms] ease-out flex-1"
              style={{
                transform: `translateX(${isLoaded ? 0 : 100}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out',
                transitionDelay: '0.6s'
              }}
            >
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Events
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Stay updated with our past and upcoming events. We 
                      host workshops, seminars, and industry visits to give students 
                      practical exposure and insights into the world of 
                      chemical engineering.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facility Details Card */}
            <Card 
              className="bg-card/80 border-border/30 backdrop-blur-sm hover:bg-card/90 transition-all duration-[2000ms] ease-out flex-1"
              style={{
                transform: `translateX(${isLoaded ? 0 : 100}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out',
                transitionDelay: '0.8s'
              }}
            >
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Facility Details
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Our state-of-the-art facilities are equipped with the latest tools and 
                      technologies to provide students with a hands-on learning experience. From 
                      laboratories to research centers, we ensure that our members have access to 
                      the best resources.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Registration Card */}
            <Card 
              className="bg-card/80 border-border/30 backdrop-blur-sm hover:bg-card/90 transition-all duration-[2000ms] ease-out flex-1"
              style={{
                transform: `translateX(${isLoaded ? 0 : 100}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out',
                transitionDelay: '1.0s'
              }}
            >
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Event Registration
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Register for our upcoming events and secure your spot. Take advantage of this 
                      opportunity to network with industry professionals and expand your 
                      knowledge to further your career in chemical engineering.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
