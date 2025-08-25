import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Vision() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based effects for About ChEA section
  const aboutSectionElement = typeof document !== "undefined" ? document.getElementById("about-chea-vision") : null;
  const aboutSectionTop = aboutSectionElement?.offsetTop || 1000;
  const aboutSectionHeight = aboutSectionElement?.offsetHeight || 800;
  const aboutStartPoint = aboutSectionTop - window.innerHeight;
  const aboutEndPoint = aboutSectionTop + aboutSectionHeight;
  const aboutTotalDistance = aboutEndPoint - aboutStartPoint;
  const aboutCurrentDistance = scrollY - aboutStartPoint;
  const aboutScrollProgress = Math.max(0, Math.min(aboutCurrentDistance / aboutTotalDistance, 1));
  const aboutImageTranslateX = aboutScrollProgress * -200; // Slide left as we scroll

  // Calculate scroll-based effects for Leadership section
  const leadershipSectionElement = typeof document !== "undefined" ? document.getElementById("leadership-vision") : null;
  const leadershipSectionTop = leadershipSectionElement?.offsetTop || 2000;
  const leadershipSectionHeight = leadershipSectionElement?.offsetHeight || 800;
  const leadershipStartPoint = leadershipSectionTop - window.innerHeight;
  const leadershipEndPoint = leadershipSectionTop + leadershipSectionHeight;
  const leadershipTotalDistance = leadershipEndPoint - leadershipStartPoint;
  const leadershipCurrentDistance = scrollY - leadershipStartPoint;
  const leadershipScrollProgress = Math.max(0, Math.min(leadershipCurrentDistance / leadershipTotalDistance, 1));
  const leadershipImageTranslateX = leadershipScrollProgress * 200; // Slide right as we scroll (reverse direction)

  // Calculate hero background zoom based on scroll position
  const getHeroBackgroundTransform = () => {
    const zoomEffect = 1 + (scrollY * 0.0005); // Zoom in as we scroll down
    return `scale(${zoomEffect})`;
  };

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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: getHeroBackgroundTransform(),
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-light mb-8">Our Vision</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl font-light leading-relaxed">
                ChEA (Chemical Engineering Association) is dedicated to fostering a community of aspiring chemical engineers at the University of H.B.T.U. Our vision is to provide a platform for students to enhance their skills, knowledge, and passion for chemical engineering. We strive to create a supportive environment that encourages growth and learning, ultimately preparing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About ChEA Section */}
      <section id="about-chea-vision" className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-0 bg-chea-dark-card rounded-lg overflow-hidden shadow-2xl">
            {/* Left side - Image Section */}
            <div className="relative h-[500px] lg:h-[600px] bg-chea-dark overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg/v1/fill/w_828,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg"
                alt="About ChEA"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateX(${aboutImageTranslateX}px) scale(1.3)`,
                  transition: "transform 0.5s ease-out",
                  minWidth: "150%",
                }}
              />
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Heading positioned on image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl lg:text-5xl font-light text-white text-center px-8">
                  About ChEA
                </h2>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center bg-chea-dark-card">
              <p className="text-gray-300 text-lg leading-relaxed">
                ChEA (Chemical Engineering Association) was established with the goal of creating a collaborative space for students enthusiastic about chemical engineering. Our journey began with a small group of dedicated individuals who envisioned a platform where students could exchange ideas, gain practical experience, and form lifelong connections. Today, ChEA stands as a testament to the collective effort of our members in fostering innovation and excellence in the field of chemical engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Leadership Section */}
      <section id="leadership-vision" className="py-0 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-0 bg-chea-dark-card rounded-lg overflow-hidden shadow-2xl">
            {/* Left side - Content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 bg-chea-dark-card">
              <p className="text-gray-300 text-lg leading-relaxed">
                At ChEA, our leadership brings a wealth of experience and a shared passion for nurturing the next generation of chemical engineers. Our dedicated team is committed to creating opportunities for students to thrive in their academic and professional pursuits. With a focus on mentorship and guidance, our leadership ensures that ChEA remains at the forefront of empowering students and preparing them for successful careers in chemical engineering.
              </p>
            </div>

            {/* Right side - Image Section */}
            <div className="relative h-[500px] lg:h-[600px] bg-chea-dark overflow-hidden order-1 lg:order-2">
              <img
                src="https://static.wixstatic.com/media/c837a6_e166632dd5264456b9b5beba3bd949dd~mv2.jpg/v1/fill/w_828,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_e166632dd5264456b9b5beba3bd949dd~mv2.jpg"
                alt="Meet Our Leadership"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateX(${leadershipImageTranslateX}px) scale(1.3)`,
                  transition: "transform 0.5s ease-out",
                  minWidth: "150%",
                }}
              />
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Heading positioned on image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl lg:text-5xl font-light text-white text-center px-8">
                  Meet Our Leadership
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
