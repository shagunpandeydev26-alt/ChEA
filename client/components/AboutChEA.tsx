import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AboutChEA() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (currentUser) {
      // User is already a member, navigate to programs
      navigate('/programs');
    } else {
      // User is not logged in, navigate to auth page for registration
      navigate('/auth', { state: { defaultTab: 'register' } });
    }
  };

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
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate scroll-based effects for this section
  const sectionElement =
    typeof document !== "undefined"
      ? document.getElementById("about-chea")
      : null;
  const sectionTop = sectionElement?.offsetTop || 1000;
  const sectionHeight = sectionElement?.offsetHeight || 800;

  // Extended scroll progress - starts when section appears and continues until it completely passes
  const startPoint = sectionTop - window.innerHeight; // Section starts appearing
  const endPoint = sectionTop + sectionHeight; // Section completely passes
  const totalDistance = endPoint - startPoint;
  const currentDistance = scrollY - startPoint;
  const extendedScrollProgress = Math.max(
    0,
    Math.min(currentDistance / totalDistance, 1),
  );

  // Image sliding effect - slides throughout the entire time section is visible
  const imageTranslateX = extendedScrollProgress * -200; // Extended slide range

  // Student Development section scroll effects
  const studentDevElement =
    typeof document !== "undefined"
      ? document.getElementById("student-development")
      : null;
  const studentDevTop = studentDevElement?.offsetTop || 2000;
  const studentDevHeight = studentDevElement?.offsetHeight || 800;

  // Reverse sliding effect for Student Development image
  const studentDevStartPoint = studentDevTop - window.innerHeight;
  const studentDevEndPoint = studentDevTop + studentDevHeight;
  const studentDevTotalDistance = studentDevEndPoint - studentDevStartPoint;
  const studentDevCurrentDistance = scrollY - studentDevStartPoint;
  const studentDevScrollProgress = Math.max(
    0,
    Math.min(studentDevCurrentDistance / studentDevTotalDistance, 1),
  );

  // Reverse direction sliding (positive values = slide right)
  const studentDevImageTranslateX = studentDevScrollProgress * 200; // Reverse direction

  // Regular scroll progress for background scaling
  const scrollProgress = Math.max(
    0,
    Math.min(
      (scrollY - sectionTop + window.innerHeight) / window.innerHeight,
      1,
    ),
  );

  // Background image scaling effect
  const backgroundScale = 1 + scrollProgress * 0.15;

  // Card generation animation based on scroll progress
  const cardScrollProgress = Math.max(
    0,
    Math.min(
      (scrollY - sectionTop + window.innerHeight * 0.5) /
        (window.innerHeight * 0.8),
      1,
    ),
  );

  // Individual card visibility based on scroll progress (4 cards now)
  const card1Visible = cardScrollProgress > 0.1;
  const card2Visible = cardScrollProgress > 0.3;
  const card3Visible = cardScrollProgress > 0.5;
  const card4Visible = cardScrollProgress > 0.7;

  // ChEA in Numbers section scroll effects
  const numbersElement =
    typeof document !== "undefined"
      ? document.getElementById("chea-numbers")
      : null;
  const numbersTop = numbersElement?.offsetTop || 3000;
  const numbersHeight = numbersElement?.offsetHeight || 600;

  // Motion effect for ChEA in Numbers content
  const numbersStartPoint = numbersTop - window.innerHeight;
  const numbersEndPoint = numbersTop + numbersHeight;
  const numbersTotalDistance = numbersEndPoint - numbersStartPoint;
  const numbersCurrentDistance = scrollY - numbersStartPoint;
  const numbersScrollProgress = Math.max(
    0,
    Math.min(numbersCurrentDistance / numbersTotalDistance, 1),
  );

  // Text motion effect - slides in from right
  const numbersTextTranslateX = numbersScrollProgress * -100;

  // Join ChEA section scroll effects (similar to hero)
  const joinCTAElement =
    typeof document !== "undefined"
      ? document.getElementById("join-chea-cta")
      : null;
  const joinCTATop = joinCTAElement?.offsetTop || 4000;
  const joinCTAScrollProgress = Math.min(scrollY / (joinCTATop * 0.5), 1);

  // Enhanced image scaling effect (similar to hero carousel)
  const joinCTAImageScale = 1 + joinCTAScrollProgress * 0.25; // More dramatic zoom

  // Text sliding effects (from far left like hero)
  const joinCTATextTranslateX = isLoaded ? 0 : -100; // Starting from far left
  const joinCTATextOpacity = isLoaded ? 1 : 0;

  return (
    <>
      <section
        id="about-chea"
        className="py-24 bg-background relative overflow-hidden"
      >
        {/* Section Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${backgroundScale})`,
              transition: "transform 0.8s ease-out",
            }}
          >
            <img
              src="https://static.wixstatic.com/media/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg/v1/fill/w_1901,h_1625,al_b,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg?format=webp&width=800"
              alt="About Section Background"
              className="w-full h-full object-cover opacity-100"
              style={{
                filter: "brightness(1.0) contrast(1.0)",
              }}
            />
          </div>
        </div>

        {/* Background overlay - reduced for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-background/30"></div>

        {/* Background chemical imagery overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/30"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-primary/20"></div>
          <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-primary/25"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 min-h-[800px]">
            {/* Left Side - About ChEA Card with Border (50% width) */}
            <div className="flex justify-center items-center">
              <Card
                className="relative overflow-hidden border-[0.5px] border-white bg-black/90 h-full w-full max-w-md"
                style={{
                  transform: `translateX(${isLoaded ? 0 : -100}px)`,
                  opacity: isLoaded ? 1 : 0,
                  transition:
                    "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out",
                  transitionDelay: "0.2s",
                }}
              >
                {/* Background Image with Scroll Animation - Zoomed In */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg/v1/fill/w_828,h_1338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg"
                    alt="About ChEA Background"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `translateX(${imageTranslateX}px) scale(1.3)`, // Added scale for zoom
                      transition: "transform 0.5s ease-out",
                      minWidth: "150%", // Increased for better sliding with zoom
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
                    ChEA (Chemical Engineering Association) is dedicated to
                    fostering the growth and development of aspiring chemical
                    engineers. We provide a platform for students to enhance
                    their knowledge, skills, and understanding of the field
                    through various events, workshops, and networking
                    opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Four Cards in Zig-Zag Format (50% width) */}
            <div className="flex flex-col justify-center space-y-2">
              {/* Student's Corner Card - Aligned Left */}
              <div className="flex justify-start">
                <Card
                  className="bg-black border-[0.5px] border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-80"
                  style={{
                    transform: `translateX(${card1Visible ? 0 : 100}px) translateY(${card1Visible ? 0 : 20}px)`,
                    opacity: card1Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-white mb-3">
                          Student's Corner
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          The student's corner is where our members can access
                          resources, articles, and educational materials related
                          to chemical engineering.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Events Card - Aligned Right */}
              <div className="flex justify-end">
                <Card
                  className="bg-black border-[0.5px] border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-80"
                  style={{
                    transform: `translateX(${card2Visible ? 0 : -100}px) translateY(${card2Visible ? 0 : 20}px)`,
                    opacity: card2Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-white mb-3">
                          Events
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          Stay updated with our past and upcoming events. We
                          host workshops, seminars, and industry visits to give
                          students practical exposure and insights.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Facility Details Card - Aligned Left */}
              <div className="flex justify-start">
                <Card
                  className="bg-black border-[0.5px] border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-80"
                  style={{
                    transform: `translateX(${card3Visible ? 0 : 100}px) translateY(${card3Visible ? 0 : 20}px)`,
                    opacity: card3Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-white mb-3">
                          Facility Details
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          Explore our state-of-the-art facilities including
                          well-equipped laboratories, modern equipment, and
                          research centers designed to support hands-on
                          learning.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Registration Card - Aligned Right */}
              <div className="flex justify-end">
                <Card
                  className="bg-black border-[0.5px] border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-80"
                  style={{
                    transform: `translateX(${card4Visible ? 0 : -100}px) translateY(${card4Visible ? 0 : 20}px)`,
                    opacity: card4Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H3V4h3V2h2v2h8V2h2v2h3zM4 8h16v12H4V8z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-white mb-3">
                          Event Registration
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          Register for upcoming workshops, seminars, and
                          technical sessions. Stay connected with industry
                          professionals and enhance your career prospects.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Development Section */}
      <section
        id="student-development"
        className="py-0 bg-background relative overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-none relative z-10">
          <div className="border-[0.5px] border-white bg-black min-h-screen">
            <div className="grid lg:grid-cols-2 gap-0 h-full">
              {/* Left Side - Image with Reverse Sliding Effect */}
              <div className="relative overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg/v1/fill/w_860,h_1310,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg"
                  alt="Student Development Background"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translateX(${studentDevImageTranslateX}px) scale(1.6)`,
                    transition: "transform 0.5s ease-out",
                    minWidth: "170%",
                  }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-5xl font-light text-white text-center px-8">
                    Student Development
                    <br />
                    Initiatives
                  </h2>
                </div>
              </div>

              {/* Right Side - Content with Black Background */}
              <div className="bg-black p-8 flex flex-col justify-center">
                <p className="text-gray-300 text-2xl leading-relaxed mb-8">
                  We are committed to providing unprecedented support and
                  resources for the holistic development of our members. Our
                  programs focus on enhancing technical skills, fostering
                  leadership qualities, and preparing students for the
                  challenges of the chemical engineering industry.
                </p>
                <Button
                  size="lg"
                  onClick={handleCtaClick}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-fit"
                >
                  {currentUser ? 'Explore Programs' : 'Join Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ChEA in Numbers Section */}
      <section
        id="chea-numbers"
        className="py-24 bg-background relative overflow-hidden"
      >
        {/* Section Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/c837a6_d11c6c437c0f4feb9de8591b42ead168~mv2.jpg/v1/fill/w_2281,h_1119,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_d11c6c437c0f4feb9de8591b42ead168~mv2.jpg"
              alt="ChEA Statistics Background"
              className="w-full h-full object-cover opacity-100"
              style={{
                transform: `translateX(${numbersTextTranslateX}px) scale(1.3)`,
                transition: "transform 0.3s ease-out",
                minWidth: "150%",
                filter: "brightness(1.0) contrast(1.0)",
              }}
            />
          </div>
        </div>

        {/* Background overlay - reduced for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-background/30"></div>

        {/* Background chemical imagery overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/30"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-primary/20"></div>
          <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-primary/25"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="min-h-[600px] flex flex-col justify-start pt-16">
            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              ChEA in Numbers
            </h2>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Established */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  2022
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  Established
                </div>
              </div>

              {/* Events Attended */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  10+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  Events Attended
                  <br />
                  Annually
                </div>
              </div>

              {/* Conferences */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  3+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  Conferences per year
                </div>
              </div>

              {/* Workshops */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  5+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  No. of workshops
                </div>
              </div>

              {/* Members */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  50+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join ChEA CTA Section */}
      <section
        id="join-chea-cta"
        className="relative min-h-screen bg-background overflow-hidden"
      >
        {/* Enhanced Background Image with Dramatic Zoom Effect */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-all duration-3000 ease-in-out opacity-70"
            style={{
              transform: `scale(${joinCTAImageScale})`,
              transition: "transform 0.8s ease-out, opacity 3s ease-in-out",
            }}
          >
            <img
              src="https://static.wixstatic.com/media/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg/v1/fill/w_1188,h_1004,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg"
              alt="Join ChEA Background"
              className="w-full h-full object-cover object-center"
              style={{
                filter: "blur(0.5px) brightness(0.8) contrast(1.05)",
              }}
            />
          </div>
        </div>

        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/45 to-background/20"></div>

        {/* Background chemical imagery overlay (similar to hero) */}
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

        {/* Content Container */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Side - Animated Heading */}
            <div
              className="flex flex-col justify-center"
              style={{
                transform: `translateX(${isLoaded ? joinCTATextTranslateX * 0.3 : -100}vw)`,
                opacity: isLoaded ? joinCTATextOpacity : 0,
                transition:
                  "transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2.5s ease-out",
              }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                <span
                  className="inline-block transition-all duration-[2500ms] ease-out"
                  style={{
                    transform: `translateX(${isLoaded ? joinCTATextTranslateX * 0.5 : -100}vw)`,
                    opacity: isLoaded ? joinCTATextOpacity : 0,
                    transitionDelay: "0.2s",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Join ChEA and
                </span>
                <br />
                <span
                  className="inline-block transition-all duration-[2500ms] ease-out"
                  style={{
                    transform: `translateX(${isLoaded ? joinCTATextTranslateX * 0.6 : -100}vw)`,
                    opacity: isLoaded ? joinCTATextOpacity : 0,
                    transitionDelay: "0.4s",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Ignite Your Potential
                </span>
              </h2>
            </div>

            {/* Right Side - Content and CTA with Enhanced Animations */}
            <div
              className="flex flex-col justify-center"
              style={{
                transform: `translateX(${isLoaded ? joinCTATextTranslateX * -0.3 : 100}vw)`,
                opacity: isLoaded ? joinCTATextOpacity : 0,
                transition:
                  "transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2.5s ease-out",
              }}
            >
              <p
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
                style={{
                  transform: `translateX(${isLoaded ? 0 : 80}px)`,
                  opacity: isLoaded ? 1 : 0,
                  transition:
                    "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out",
                  transitionDelay: "0.6s",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                }}
              >
                <span
                  className="inline-block transition-all duration-[2000ms] ease-out"
                  style={{
                    transform: `translateX(${isLoaded ? 0 : 60}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transitionDelay: "0.8s",
                  }}
                >
                  Take the first step towards a successful career in chemical
                  engineering.
                </span>
                <span
                  className="inline-block transition-all duration-[2000ms] ease-out"
                  style={{
                    transform: `translateX(${isLoaded ? 0 : 60}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transitionDelay: "1s",
                  }}
                >
                  {" "}
                  Join ChEA to access a world of opportunities, enrich your
                  learning, and connect with a community of passionate
                  individuals.
                </span>
              </p>

              <Button
                size="lg"
                onClick={handleCtaClick}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-fit"
                style={{
                  transform: `translateX(${isLoaded ? 0 : 100}px) scale(${isLoaded ? 1 : 0.8})`,
                  opacity: isLoaded ? 1 : 0,
                  transition:
                    "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2s ease-out, scale 0.3s ease-out",
                  transitionDelay: "1.2s",
                }}
              >
                {currentUser ? 'Explore Programs' : 'Become a Member'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
