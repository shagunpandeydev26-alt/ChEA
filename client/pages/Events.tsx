import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Events() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll-based effects for Empowerment section
  const empowermentSectionElement =
    typeof document !== "undefined"
      ? document.getElementById("empowerment-section")
      : null;
  const empowermentSectionTop = empowermentSectionElement?.offsetTop || 2000;
  const empowermentSectionHeight =
    empowermentSectionElement?.offsetHeight || 800;
  const empowermentStartPoint = empowermentSectionTop - window.innerHeight;
  const empowermentEndPoint = empowermentSectionTop + empowermentSectionHeight;
  const empowermentTotalDistance = empowermentEndPoint - empowermentStartPoint;
  const empowermentCurrentDistance = scrollY - empowermentStartPoint;
  const empowermentScrollProgress = Math.max(
    0,
    Math.min(empowermentCurrentDistance / empowermentTotalDistance, 1),
  );
  const empowermentImageTranslateX = empowermentScrollProgress * -200; // Slide left as we scroll

  // Calculate hero background zoom based on scroll position
  const getHeroBackgroundTransform = () => {
    const zoomEffect = 1 + scrollY * 0.0005; // Zoom in as we scroll down
    return `scale(${zoomEffect})`;
  };

  // Sample events data
  const eventsData = [
    {
      id: 1,
      image:
        "https://static.wixstatic.com/media/c837a6_5f8a2b1c94d54e9e8e7f6c3a2d1b9e5f~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/workshop.jpg",
      title: "Chemical Process Design Workshop",
      date: "March 15, 2024",
      description:
        "Hands-on workshop covering fundamentals of chemical process design, equipment selection, and process optimization techniques.",
      location: "Main Auditorium, ChE Department",
    },
    {
      id: 2,
      image:
        "https://static.wixstatic.com/media/c837a6_8b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/seminar.jpg",
      title: "Industry Expert Seminar Series",
      date: "April 22, 2024",
      description:
        "Guest lectures by industry professionals sharing insights on current trends, career opportunities, and emerging technologies in chemical engineering.",
      location: "Conference Hall, Block A",
    },
    {
      id: 3,
      image:
        "https://static.wixstatic.com/media/c837a6_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/competition.jpg",
      title: "ChemE Innovation Challenge",
      date: "May 10, 2024",
      description:
        "Annual competition where teams present innovative solutions to real-world chemical engineering problems and sustainability challenges.",
      location: "Engineering Complex",
    },
    {
      id: 4,
      image:
        "https://static.wixstatic.com/media/c837a6_9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/visit.jpg",
      title: "Industrial Plant Visit",
      date: "June 8, 2024",
      description:
        "Educational visit to local chemical manufacturing facilities to observe industrial processes and interact with working professionals.",
      location: "Various Industrial Sites",
    },
    {
      id: 5,
      image:
        "https://static.wixstatic.com/media/c837a6_7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/research.jpg",
      title: "Research Symposium",
      date: "July 18, 2024",
      description:
        "Platform for students and faculty to present ongoing research projects, exchange ideas, and foster collaborative opportunities.",
      location: "Research Center Auditorium",
    },
    {
      id: 6,
      image:
        "https://static.wixstatic.com/media/c837a6_3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/networking.jpg",
      title: "Alumni Networking Event",
      date: "August 25, 2024",
      description:
        "Meet and connect with successful ChEA alumni working in diverse industries, gain career insights and mentorship opportunities.",
      location: "Alumni Hall",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background image with zoom effect */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('https://static.wixstatic.com/media/c837a6_3f53cdbff83b47b19a97bd35c767333c~mv2.jpg/v1/fill/w_1901,h_913,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_3f53cdbff83b47b19a97bd35c767333c~mv2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: getHeroBackgroundTransform(),
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-light mb-8">
              Welcome to ChEA - Chemical Engineering Association
            </h1>
            <h2 className="text-3xl lg:text-4xl font-light">Our Offerings</h2>
          </div>
        </div>
      </section>

      {/* Events Table Section */}
      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="w-full max-w-full">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-12 text-center">
              Upcoming Events & Activities
            </h2>

            {/* Events Grid */}
            <div className="space-y-8">
              {eventsData.map((event, index) => (
                <div
                  key={event.id}
                  className={`grid lg:grid-cols-2 gap-8 bg-chea-dark-card rounded-lg overflow-hidden shadow-xl ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Side */}
                  <div
                    className={`relative h-[300px] lg:h-[400px] ${index % 2 === 1 ? "order-2" : "order-1"}`}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder image if the image fails to load
                        e.currentTarget.src =
                          "https://static.wixstatic.com/media/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg/v1/fill/w_400,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/placeholder.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "order-1" : "order-2"}`}
                  >
                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                      {event.title}
                    </h3>
                    <div className="text-chea-red text-lg mb-4 font-medium">
                      {event.date}
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="text-gray-400 text-sm">
                      <span className="font-medium">Location:</span>{" "}
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Student Community Section */}
      <section id="empowerment-section" className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-0 bg-chea-dark-card rounded-lg overflow-hidden shadow-2xl">
            {/* Left side - Image Section */}
            <div className="relative h-[500px] lg:h-[600px] bg-chea-dark overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/c837a6_41007e02b626433b850e5cfc4f2fb91d~mv2.jpg/v1/fill/w_828,h_585,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_41007e02b626433b850e5cfc4f2fb91d~mv2.jpg"
                alt="Empowering Student Community"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateX(${empowermentImageTranslateX}px) scale(1.3)`,
                  transition: "transform 0.5s ease-out",
                  minWidth: "150%",
                }}
              />
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Heading positioned on image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl lg:text-5xl font-light text-white text-center px-8">
                  Empowering Student Community
                </h2>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center bg-chea-dark-card">
              <p className="text-gray-300 text-lg leading-relaxed">
                We are dedicated to integrating with the student community,
                empowering them with opportunities, resources, and a supportive
                network to excel in the field of chemical engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
