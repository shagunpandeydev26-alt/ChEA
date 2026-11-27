import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contentImage, handleImageError, siteImages } from "@/lib/images";

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
    const zoomEffect = 1 + Math.min(scrollY, 800) * 0.0005;
    return `scale(${zoomEffect})`;
  };

  const eventsData = [
    {
      id: 1,
      image: contentImage(0),
      title: "ChEA and IIChE Orientation",
      date: "16th September, 2026",
      description:
        "Orientation for students introducing ChEA and IIChE, their activities, membership benefits and the year ahead.",
      location: "H.B.T.U. Campus, Kanpur",
    },
    {
      id: 2,
      image: contentImage(1),
      title: "Traditional Day",
      date: "17th October, 2026",
      description:
        "A campus celebration of culture and tradition, bringing students together in festive spirit.",
      location: "H.B.T.U. Campus, Kanpur",
    },
    {
      id: 3,
      image: contentImage(2),
      title: "No Bag Day",
      date: "28th October, 2026",
      description:
        "A student-friendly day without books or bags, filled with informal activities and bonding sessions.",
      location: "H.B.T.U. Campus, Kanpur",
    },
    {
      id: 4,
      image: contentImage(3),
      title: "Industrial Visit",
      date: "6th February, 2027",
      description:
        "A guided visit to an industrial facility to observe real chemical processes and discuss career pathways.",
      location: "Industrial site, Kanpur region",
    },
    {
      id: 5,
      image: contentImage(4),
      title: "GATE Mentorship Panel",
      date: "31st March, 2027",
      description:
        "A mentorship panel for GATE aspirants covering preparation strategy, exam insights and guidance from seniors and faculty.",
      location: "H.B.T.U. Campus, Kanpur",
    },
  ];

  const yearRoundActivities = [
    "Chemical Cricket League",
    "Interactive Sessions",
    "Alumni Talk",
    "Mock Interviews",
    "Group Discussions",
    "Interview Session of Faculty",
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
            backgroundImage: `url('${siteImages.pageHero}')`,
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
            <h2 className="text-3xl lg:text-4xl font-light">
              Tentative Annual Calendar 2026-27
            </h2>
          </div>
        </div>
      </section>

      {/* Events Table Section */}
      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="w-full max-w-full">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-4 text-center">
              Upcoming Events & Activities
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Session 2026-27 · Dates are tentative and may be updated as the
              session progresses.
            </p>

            {/* Events Grid */}
            <div className="space-y-8">
              {eventsData.map((event, index) => (
                <div
                  key={event.id}
                  className="grid lg:grid-cols-2 gap-8 bg-chea-dark-card rounded-lg overflow-hidden shadow-xl"
                >
                  {/* Image Side */}
                  <div
                    className={`relative h-[300px] lg:h-[400px] ${index % 2 === 1 ? "order-2" : "order-1"}`}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
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

            <div className="mt-16">
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-6 text-center">
                Activities Throughout the Year
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {yearRoundActivities.map((activity) => (
                  <div
                    key={activity}
                    className="bg-chea-dark-card border border-white/10 rounded-lg px-6 py-5 text-gray-200 text-center"
                  >
                    {activity}
                  </div>
                ))}
              </div>
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
                src={siteImages.empowerment}
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
