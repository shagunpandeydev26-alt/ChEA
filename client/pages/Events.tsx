import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getActiveEvents, testFirebaseConnection } from "../services/eventService";
import { Event } from "../types/event";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Events() {
  const [scrollY, setScrollY] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Manual refresh function for testing
  const refreshEvents = async () => {
    console.log('🔄 [Events] Manual refresh triggered...');
    try {
      setLoading(true);
      
      // Test Firebase connection first
      console.log('📞 [Events] Testing Firebase connection...');
      const isConnected = await testFirebaseConnection();
      if (!isConnected) {
        throw new Error('Firebase connection failed. Please check your internet connection and try again.');
      }
      
      console.log('🔍 [Events] Fetching active events...');
      const fetchedEvents = await getActiveEvents();
      console.log('🔄 [Events] Manual refresh - fetched events:', fetchedEvents.length, fetchedEvents);
      
      // Always use Firebase events if available, otherwise fallback to placeholders
      setEvents(fetchedEvents.length > 0 ? fetchedEvents : placeholderEvents);
      
      toast({
        title: "Success!",
        description: `Loaded ${fetchedEvents.length > 0 ? fetchedEvents.length + ' Firebase' : 'placeholder'} events`,
        variant: "default"
      });
    } catch (error) {
      console.error('🔄 [Events] Manual refresh error:', error);
      setEvents(placeholderEvents);
      toast({
        title: "Refresh Failed",
        description: error.message || "Failed to refresh events. Using placeholder data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log('🔍 [Events] Initial fetch - testing Firebase connection...');
        
        // Test connection first
        const isConnected = await testFirebaseConnection();
        if (!isConnected) {
          console.warn('⚠️ [Events] Firebase connection failed, using placeholder data');
          setEvents(placeholderEvents);
          toast({
            title: "Connection Issue",
            description: "Using placeholder events. Check your internet connection and try refreshing.",
            variant: "default"
          });
          return;
        }
        
        console.log('🔍 [Events] Fetching events from Firebase...');
        const fetchedEvents = await getActiveEvents();
        console.log('📊 [Events] Fetched events:', fetchedEvents.length, fetchedEvents);
        
        // Always use Firebase events if available, otherwise fallback to placeholders
        setEvents(fetchedEvents.length > 0 ? fetchedEvents : placeholderEvents);
        
        if (fetchedEvents.length === 0) {
          console.log('⚠️ [Events] No events found in Firebase, using placeholder data');
          toast({
            title: "No Events Found",
            description: "No events found. Admin can add events from the admin panel.",
            variant: "default"
          });
        } else {
          console.log('✅ [Events] Using Firebase events:', fetchedEvents.length);
        }
      } catch (error) {
        console.error('❌ [Events] Error fetching events:', error);
        // Fallback to placeholder data on error
        console.log('🔄 [Events] Falling back to placeholder data');
        setEvents(placeholderEvents);
        toast({
          title: "Loading Error",
          description: error.message || "Failed to load events. Using placeholder data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-refresh events every 30 seconds to catch new events
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [Events] Auto-refreshing events...');
      refreshEvents();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
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

  // Placeholder events data (will be used as fallback)
  const placeholderEvents: Event[] = [
    {
      id: "placeholder-1",
      title: "Chemical Process Design Workshop",
      description: "Hands-on workshop covering fundamentals of chemical process design, equipment selection, and process optimization techniques.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center",
      date: "2024-03-15",
      location: "Main Auditorium, ChE Department",
      priority: 1,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    },
    {
      id: "placeholder-2",
      title: "Industry Expert Seminar Series",
      description: "Guest lectures by industry professionals sharing insights on current trends, career opportunities, and emerging technologies in chemical engineering.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
      date: "2024-04-22",
      location: "Conference Hall, Block A",
      priority: 2,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    },
    {
      id: "placeholder-3",
      title: "ChemE Innovation Challenge",
      description: "Annual competition where teams present innovative solutions to real-world chemical engineering problems and sustainability challenges.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
      date: "2024-05-10",
      location: "Engineering Complex",
      priority: 3,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    },
    {
      id: "placeholder-4",
      title: "Industrial Plant Visit",
      description: "Educational visit to local chemical manufacturing facilities to observe industrial processes and interact with working professionals.",
      image: "https://images.unsplash.com/photo-1581092335878-2c5a0b3b3a89?w=400&h=300&fit=crop&crop=center",
      date: "2024-06-08",
      location: "Various Industrial Sites",
      priority: 4,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    },
    {
      id: "placeholder-5",
      title: "Research Symposium",
      description: "Platform for students and faculty to present ongoing research projects, exchange ideas, and foster collaborative opportunities.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      date: "2024-07-18",
      location: "Research Center Auditorium",
      priority: 5,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    },
    {
      id: "placeholder-6",
      title: "Alumni Networking Event",
      description: "Meet and connect with successful ChEA alumni working in diverse industries, gain career insights and mentorship opportunities.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&crop=center",
      date: "2024-08-25",
      location: "Alumni Hall",
      priority: 6,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      createdBy: "system"
    }
  ];

  // Format date for display
  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light text-white">
                Upcoming Events & Activities
              </h2>
              <div className="flex items-center gap-4">
                {/* Event Status Indicator */}
                <div className="text-sm text-gray-400">
                  {events.length > 0 && events[0].id.startsWith('placeholder') ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Placeholder Data
                    </span>
                  ) : events.length > 0 ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Firebase Data ({events.length} events)
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      No Events
                    </span>
                  )}
                </div>
                <Button
                  onClick={refreshEvents}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="border-chea-red/30 text-gray-300 hover:bg-chea-red/10"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chea-red mx-auto mb-4"></div>
                  <p className="text-gray-300">Loading events...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`grid lg:grid-cols-2 gap-8 bg-chea-dark-card rounded-lg overflow-hidden shadow-xl ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image Side */}
                    <div
                      className={`relative h-[300px] lg:h-[400px] ${
                        index % 2 === 1 ? "order-2" : "order-1"
                      }`}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a working placeholder image if the image fails to load
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    </div>

                    {/* Content Side */}
                    <div
                      className={`p-8 lg:p-12 flex flex-col justify-center ${
                        index % 2 === 1 ? "order-1" : "order-2"
                      }`}
                    >
                      <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                        {event.title}
                      </h3>
                      <div className="text-chea-red text-lg mb-4 font-medium">
                        {formatEventDate(event.date)}
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
            )}
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
