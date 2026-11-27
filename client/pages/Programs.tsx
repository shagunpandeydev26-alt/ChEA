import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { contentImage, handleImageError, siteImages } from "@/lib/images";

type Program = {
  id: number;
  title: string;
  duration: string;
  date?: string;
  participants: string;
  image: string;
  description: string;
  features: string[];
  icon: string;
};

export default function Programs() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate hero background zoom based on scroll position
  const getHeroBackgroundTransform = () => {
    const zoomEffect = 1 + Math.min(scrollY, 800) * 0.0003;
    return `scale(${zoomEffect})`;
  };

  const programsData: Program[] = [
    {
      id: 1,
      title: "Chem-Fiesta Freshers Party",
      duration: "1 Day",
      date: "16th October, 2026",
      participants: "Freshers",
      image: contentImage(0),
      description:
        "A welcome celebration for the new batch with games, cultural activities and an introduction to the ChEA community.",
      features: ["Freshers Welcome", "Fun Games", "Cultural Activities"],
      icon: "🎉",
    },
    {
      id: 2,
      title: "Design Workshop",
      duration: "1 Day",
      date: "14th October, 2026",
      participants: "Students",
      image: contentImage(1),
      description:
        "A hands-on workshop on process design tools, problem-solving and team-based engineering projects.",
      features: ["Process Design", "Team Projects", "Problem Solving"],
      icon: "📐",
    },
    {
      id: 3,
      title: "MATLAB Workshop",
      duration: "2 Days",
      date: "23rd-24th October, 2026",
      participants: "Students",
      image: contentImage(2),
      description:
        "A two-day practical workshop covering MATLAB fundamentals, numerical methods and engineering simulation.",
      features: ["MATLAB Basics", "Numerical Methods", "Simulation"],
      icon: "💻",
    },
    {
      id: 4,
      title: "Sports Days",
      duration: "2 Days",
      date: "21-22nd November, 2026",
      participants: "Students",
      image: contentImage(3),
      description:
        "Two days of outdoor sports, team competitions and fun activities for the ChEA student community.",
      features: ["Outdoor Sports", "Team Events", "Fun Activities"],
      icon: "🏆",
    },
    {
      id: 5,
      title: "E-Sports",
      duration: "2 Days",
      date: "December last week, 2026",
      participants: "Students",
      image: contentImage(4),
      description:
        "A two-day gaming event with casual tournaments, fun games and friendly competition.",
      features: ["Gaming Tournament", "Fun Games", "Team Play"],
      icon: "🎮",
    },
    {
      id: 6,
      title: "Synopsis Symposium",
      duration: "1 Day",
      date: "End of January, 2027",
      participants: "Students & Faculty",
      image: contentImage(5),
      description:
        "A platform for students to present research synopses and receive feedback from faculty and peers.",
      features: ["Research Synopsis", "Presentations", "Faculty Feedback"],
      icon: "📊",
    },
    {
      id: 7,
      title: "INTERFACE 2027",
      duration: "6 Days",
      date: "15-20th January, 2027",
      participants: "Students & Alumni",
      image: contentImage(6),
      description:
        "The flagship annual technical symposium with paper presentations, industry talks, workshops and competitions.",
      features: ["Technical Symposium", "Industry Talks", "Competitions"],
      icon: "🌐",
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
            backgroundImage: `url('${siteImages.joinCta}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: getHeroBackgroundTransform(),
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-8 leading-tight">
              Unleash Your <span className="text-chea-red">Potential</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-gray-200 mb-6">
              Transformative Programs for Tomorrow's Chemical Engineers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover comprehensive development programs designed to elevate
              your skills, expand your horizons, and accelerate your journey to
              excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Flash Cards Section */}
      <section className="py-24 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Our Development Programs
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our diverse range of specialized programs crafted to
              nurture every aspect of your professional growth.
            </p>
          </div>

          {/* Flash Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {programsData.map((program, index) => (
              <Card
                key={program.id}
                className="relative group cursor-pointer bg-gradient-to-br from-chea-dark-card to-black border-chea-red/20 hover:border-chea-red/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  transform: `translateY(${hoveredCard === program.id ? -10 : 0}px)`,
                  transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[400px]">
                  {/* Icon and Title */}
                  <div>
                    <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-chea-red transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {program.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-chea-red/20 text-chea-red text-xs rounded-full border border-chea-red/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-gray-600/30">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-400">
                        <span className="block text-white font-medium">
                          {program.date ?? program.duration}
                        </span>
                        {program.date ? "Date" : "Duration"}
                      </div>
                      <div className="text-gray-400 text-right">
                        <span className="block text-white font-medium">
                          {program.participants}
                        </span>
                        Participants
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-chea-red/10 rounded-lg transition-opacity duration-300 ${
                      hoveredCard === program.id ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-chea-red/20 to-transparent p-8 rounded-2xl border border-chea-red/30">
              <h3 className="text-3xl font-light text-white mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers
                through our comprehensive development programs. Your success
                story starts here.
              </p>
              <a
                href="mailto:official.chea@hbtu.ac.in?subject=ChEA%20Program%20Enrollment"
                className="inline-block bg-chea-red hover:bg-chea-red-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
