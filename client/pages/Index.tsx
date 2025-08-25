import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutChEA from "../components/AboutChEA";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AboutChEA />
      </main>
      <Footer />
    </div>
  );
}
