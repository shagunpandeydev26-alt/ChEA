import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";

export default function Programs() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate hero background zoom based on scroll position
  const getHeroBackgroundTransform = () => {
    const zoomEffect = 1 + (scrollY * 0.0003); // Slightly less zoom for variety
    return `scale(${zoomEffect})`;
  };

  // Student development programs data
  const programsData = [
    {
      id: 1,
      title: "Leadership Excellence Program",
      duration: "6 Months",
      participants: "25 Students",
      image: "https://static.wixstatic.com/media/c837a6_2b1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/leadership.jpg",
      description: "Develop essential leadership skills through workshops, case studies, and real-world project management experience.",
      features: ["Team Management", "Strategic Thinking", "Communication Skills"],
      icon: "👑"
    },
    {
      id: 2,
      title: "Advanced Technical Skills Bootcamp",
      duration: "4 Months",
      participants: "40 Students",
      image: "https://static.wixstatic.com/media/c837a6_3c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/technical.jpg",
      description: "Master cutting-edge technologies and software tools essential for modern chemical engineering practice.",
      features: ["MATLAB/Simulink", "ASPEN Plus", "CFD Analysis"],
      icon: "⚡"
    },
    {
      id: 3,
      title: "Research Mentorship Initiative",
      duration: "8 Months",
      participants: "15 Students",
      image: "https://static.wixstatic.com/media/c837a6_4d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/research.jpg",
      description: "Work alongside faculty on groundbreaking research projects and develop analytical thinking skills.",
      features: ["Literature Review", "Experimental Design", "Data Analysis"],
      icon: "🔬"
    },
    {
      id: 4,
      title: "Industry Immersion Program",
      duration: "3 Months",
      participants: "30 Students",
      image: "https://static.wixstatic.com/media/c837a6_5e4f6a7b8c9d0e1f2a3b4c5d6e7f8a9b~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/industry.jpg",
      description: "Gain hands-on experience through internships and collaborative projects with leading chemical companies.",
      features: ["Plant Operations", "Quality Control", "Process Safety"],
      icon: "🏭"
    },
    {
      id: 5,
      title: "Innovation & Entrepreneurship Hub",
      duration: "5 Months",
      participants: "20 Students",
      image: "https://static.wixstatic.com/media/c837a6_6f5a7b8c9d0e1f2a3b4c5d6e7f8a9b0c~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/innovation.jpg",
      description: "Transform ideas into viable business ventures with guidance from successful entrepreneurs and industry experts.",
      features: ["Business Planning", "Pitch Development", "Market Analysis"],
      icon: "💡"
    },
    {
      id: 6,
      title: "Global Communication Excellence",
      duration: "3 Months",
      participants: "35 Students",
      image: "https://static.wixstatic.com/media/c837a6_7a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/communication.jpg",
      description: "Enhance professional communication skills for international collaborations and technical presentations.",
      features: ["Technical Writing", "Presentation Skills", "Cross-cultural Communication"],
      icon: "🌐"
    },
    {
      id: 7,
      title: "Sustainable Engineering Solutions",
      duration: "4 Months",
      participants: "28 Students",
      image: "https://static.wixstatic.com/media/c837a6_8b7c9d0e1f2a3b4c5d6e7f8a9b0c1d2e~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/sustainable.jpg",
      description: "Focus on green chemistry and sustainable process design to address environmental challenges.",
      features: ["Green Chemistry", "Renewable Energy", "Waste Management"],
      icon: "🌱"
    },
    {
      id: 8,
      title: "Digital Transformation Workshop",
      duration: "2 Months",
      participants: "45 Students",
      image: "https://static.wixstatic.com/media/c837a6_9c8d0e1f2a3b4c5d6e7f8a9b0c1d2e3f~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/digital.jpg",
      description: "Learn about Industry 4.0, IoT applications, and digital tools transforming chemical engineering.",
      features: ["IoT Integration", "Data Analytics", "Automation Systems"],
      icon: "🤖"
    }
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
            backgroundImage: `url('https://static.wixstatic.com/media/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg/v1/fill/w_1188,h_1004,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: getHeroBackgroundTransform(),
            transition: 'transform 0.1s ease-out'
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
              Discover comprehensive development programs designed to elevate your skills, expand your horizons, and accelerate your journey to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Flash Cards Section */}
      <section className="py-24 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">Our Development Programs</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our diverse range of specialized programs crafted to nurture every aspect of your professional growth.
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
                  transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  animationDelay: `${index * 0.1}s`
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
                    onError={(e) => {
                      e.currentTarget.src = "https://static.wixstatic.com/media/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/placeholder.jpg";
                    }}
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
                        <span className="block text-white font-medium">{program.duration}</span>
                        Duration
                      </div>
                      <div className="text-gray-400 text-right">
                        <span className="block text-white font-medium">{program.participants}</span>
                        Participants
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-chea-red/10 rounded-lg transition-opacity duration-300 ${
                    hoveredCard === program.id ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-chea-red/20 to-transparent p-8 rounded-2xl border border-chea-red/30">
              <h3 className="text-3xl font-light text-white mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers through our comprehensive development programs. Your success story starts here.
              </p>
              <button className="bg-chea-red hover:bg-chea-red-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
