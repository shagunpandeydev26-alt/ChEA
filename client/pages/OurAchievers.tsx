import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { contentImage, handleImageError, siteImages } from "@/lib/images";

export default function OurAchievers() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("students");

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

  // Current students achievements
  const currentStudents = [
    {
      id: 1,
      name: "Arjun Patel",
      achievement: "Google Software Engineer",
      year: "2024",
      image: contentImage(0),
      description:
        "Secured a Software Engineer position at Google with a focus on machine learning applications in process optimization.",
      company: "Google",
      package: "₹45 LPA",
      specialization: "ML & Process Optimization",
    },
    {
      id: 2,
      name: "Shreya Reddy",
      achievement: "Microsoft Product Manager",
      year: "2024",
      image: contentImage(1),
      description:
        "Joined Microsoft as a Product Manager for their Azure cloud platform, focusing on chemical engineering applications.",
      company: "Microsoft",
      package: "₹38 LPA",
      specialization: "Cloud Technology",
    },
    {
      id: 3,
      name: "Karan Singh",
      achievement: "McKinsey & Company Consultant",
      year: "2024",
      image: contentImage(2),
      description:
        "Selected as a Management Consultant at McKinsey, specializing in chemical industry strategy and operations.",
      company: "McKinsey & Company",
      package: "₹42 LPA",
      specialization: "Strategy Consulting",
    },
    {
      id: 4,
      name: "Priya Sharma",
      achievement: "ONGC Chemical Engineer",
      year: "2024",
      image: contentImage(3),
      description:
        "Joined ONGC as a Chemical Engineer, working on refinery operations and process improvement initiatives.",
      company: "ONGC",
      package: "₹18 LPA",
      specialization: "Petroleum Engineering",
    },
    {
      id: 5,
      name: "Rohit Kumar",
      achievement: "IIT Bombay PhD Scholar",
      year: "2024",
      image: contentImage(4),
      description:
        "Pursuing PhD in Chemical Engineering at IIT Bombay with research focus on renewable energy systems.",
      company: "IIT Bombay",
      package: "Research Scholar",
      specialization: "Renewable Energy",
    },
    {
      id: 6,
      name: "Ananya Gupta",
      achievement: "Unilever R&D Engineer",
      year: "2024",
      image: contentImage(5),
      description:
        "Working as an R&D Engineer at Unilever, developing sustainable personal care and home care products.",
      company: "Unilever",
      package: "₹22 LPA",
      specialization: "Product Development",
    },
  ];

  // Alumni achievements
  const alumni = [
    {
      id: 1,
      name: "Dr. Rajesh Verma",
      achievement: "Chief Technology Officer",
      year: "2018 Graduate",
      image: contentImage(6),
      description:
        "Leading technology innovation at Reliance Industries, overseeing digital transformation in petrochemical operations.",
      company: "Reliance Industries",
      position: "Chief Technology Officer",
      experience: "6 Years",
    },
    {
      id: 2,
      name: "Meera Joshi",
      achievement: "Senior Principal Scientist",
      year: "2016 Graduate",
      image: contentImage(7),
      description:
        "Leading research in sustainable chemistry at CSIR-NCL, with 15+ publications in top-tier journals.",
      company: "CSIR-NCL",
      position: "Senior Principal Scientist",
      experience: "8 Years",
    },
    {
      id: 3,
      name: "Amit Saxena",
      achievement: "Plant Manager",
      year: "2015 Graduate",
      image: contentImage(0),
      description:
        "Managing operations at Tata Chemicals' largest manufacturing facility, driving efficiency and safety initiatives.",
      company: "Tata Chemicals",
      position: "Plant Manager",
      experience: "9 Years",
    },
    {
      id: 4,
      name: "Dr. Sunita Rao",
      achievement: "Professor & Department Head",
      year: "2012 Graduate",
      image: contentImage(1),
      description:
        "Professor and Head of Chemical Engineering Department at NIT Trichy, renowned for membrane technology research.",
      company: "NIT Trichy",
      position: "Professor & HOD",
      experience: "12 Years",
    },
    {
      id: 5,
      name: "Vikash Agarwal",
      achievement: "Startup Founder & CEO",
      year: "2017 Graduate",
      image: contentImage(2),
      description:
        "Founded GreenTech Solutions, a startup focused on developing eco-friendly chemical processes, raised $5M Series A.",
      company: "GreenTech Solutions",
      position: "Founder & CEO",
      experience: "7 Years",
    },
    {
      id: 6,
      name: "Kavya Nair",
      achievement: "International Process Engineer",
      year: "2014 Graduate",
      image: contentImage(3),
      description:
        "Working as a Senior Process Engineer at Shell Netherlands, leading major refinery optimization projects across Europe.",
      company: "Shell Netherlands",
      position: "Senior Process Engineer",
      experience: "10 Years",
    },
  ];

  const currentData = activeTab === "students" ? currentStudents : alumni;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-8 leading-tight">
              Our <span className="text-chea-red">Achievers</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-gray-200 mb-6">
              Celebrating Excellence & Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the remarkable achievements of our students and alumni
              who have made their mark in industry, academia, and research.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-chea-dark border-b border-chea-red/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex justify-center">
            <div className="flex bg-chea-dark-card rounded-lg p-2 border border-chea-red/20">
              <button
                onClick={() => setActiveTab("students")}
                className={`px-8 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeTab === "students"
                    ? "bg-chea-red text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Current Students
              </button>
              <button
                onClick={() => setActiveTab("alumni")}
                className={`px-8 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeTab === "alumni"
                    ? "bg-chea-red text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Our Alumni
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievers Grid */}
      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              {activeTab === "students"
                ? "Recent Placements"
                : "Alumni Success Stories"}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {activeTab === "students"
                ? "Outstanding placements achieved by our graduating students in top companies and institutions."
                : "Inspiring career journeys of our alumni who continue to excel in their respective fields."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentData.map((person, index) => (
              <Card
                key={person.id}
                className="bg-gradient-to-br from-chea-dark-card to-black border-chea-red/20 hover:border-chea-red/60 transition-all duration-500 transform hover:scale-105 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-chea-red text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {person.year}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-light text-white mb-2">
                    {person.name}
                  </h3>
                  <h4 className="text-chea-red font-medium mb-3">
                    {person.achievement}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {person.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 pt-4 border-t border-gray-600/30">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Company:</span>
                      <span className="text-white font-medium">
                        {person.company}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {activeTab === "students" ? "Package:" : "Position:"}
                      </span>
                      <span className="text-chea-red font-medium">
                        {activeTab === "students"
                          ? person.package
                          : person.position}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {activeTab === "students" ? "Focus:" : "Experience:"}
                      </span>
                      <span className="text-white">
                        {activeTab === "students"
                          ? person.specialization
                          : person.experience}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="mt-20 bg-gradient-to-r from-chea-red/20 to-transparent p-8 rounded-2xl border border-chea-red/30">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-chea-red mb-2">95%</div>
                <div className="text-gray-300 text-sm">Placement Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-chea-red mb-2">
                  ₹25L
                </div>
                <div className="text-gray-300 text-sm">Average Package</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-chea-red mb-2">50+</div>
                <div className="text-gray-300 text-sm">Company Partners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-chea-red mb-2">
                  200+
                </div>
                <div className="text-gray-300 text-sm">Alumni Network</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-3xl font-light text-white mb-4">
              Be Part of Our Success Story
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join ChEA and follow in the footsteps of our successful alumni.
              Your journey to excellence starts here.
            </p>
            <a
              href="mailto:chea@hbtu.ac.in?subject=ChEA%20Membership"
              className="inline-block bg-chea-red hover:bg-chea-red-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Join ChEA Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
