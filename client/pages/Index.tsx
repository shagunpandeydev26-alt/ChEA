import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutChEA from "../components/AboutChEA";
import FacilitiesSection from "../components/FacilitiesSection";
import StudentDevelopment from "../components/StudentDevelopment";
import Statistics from "../components/Statistics";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AboutChEA />
        <FacilitiesSection />
        <StudentDevelopment />
        <Statistics />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
