import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutChEA from '../components/AboutChEA';
import Footer from '../components/Footer';

export default function Index() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutChEA />
      <Footer />
    </div>
  );
}
