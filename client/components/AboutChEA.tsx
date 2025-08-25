import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function AboutChEA() {
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

  // Individual card visibility based on scroll progress (only 2 cards now)
  const card1Visible = cardScrollProgress > 0.1;
  const card2Visible = cardScrollProgress > 0.3;

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
                className="relative overflow-hidden border-4 border-white bg-black/90 h-full w-full max-w-md"
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

            {/* Right Side - Two Cards matching main card dimensions */}
            <div className="flex flex-col justify-center space-y-4">
              {/* Student's Corner Card */}
              <div className="flex justify-center">
                <Card
                  className="bg-black border-2 border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-full max-w-md h-full"
                  style={{
                    transform: `translateX(${card1Visible ? 0 : 100}px) translateY(${card1Visible ? 0 : 20}px)`,
                    opacity: card1Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-8 h-full flex flex-col justify-center">
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
                        <p className="text-gray-300 leading-relaxed text-lg">
                          The student's corner is where our members can access
                          resources, articles, and educational materials related
                          to chemical engineering.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Events Card */}
              <div className="flex justify-center">
                <Card
                  className="bg-black border-2 border-white hover:bg-black/90 transition-all duration-[2000ms] ease-out w-full max-w-md h-full"
                  style={{
                    transform: `translateX(${card2Visible ? 0 : -100}px) translateY(${card2Visible ? 0 : 20}px)`,
                    opacity: card2Visible ? 1 : 0,
                    transition:
                      "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out",
                  }}
                >
                  <CardContent className="p-8 h-full flex flex-col justify-center">
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
                        <p className="text-gray-300 leading-relaxed text-lg">
                          Stay updated with our past and upcoming events. We
                          host workshops, seminars, and industry visits to give
                          students practical exposure and insights.
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
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="border-4 border-white bg-black min-h-[800px]">
            <div className="grid lg:grid-cols-2 gap-0 h-full">
              {/* Left Side - Image with Reverse Sliding Effect */}
              <div className="relative overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg/v1/fill/w_860,h_1310,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg"
                  alt="Student Development Background"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translateX(${studentDevImageTranslateX}px) scale(1.3)`,
                    transition: "transform 0.5s ease-out",
                    minWidth: "150%",
                  }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-5xl font-light text-white text-center px-8">
                    Student Development Initiatives
                  </h2>
                </div>
              </div>

              {/* Right Side - Content with Black Background */}
              <div className="bg-black p-8 flex flex-col justify-center">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  We are committed to providing unprecedented support and
                  resources for the holistic development of our members. Our
                  programs focus on enhancing technical skills, fostering
                  leadership qualities, and preparing students for the
                  challenges of the chemical engineering industry.
                </p>
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-fit"
                >
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
