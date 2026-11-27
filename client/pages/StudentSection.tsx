import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { contentImage, handleImageError, siteImages } from "@/lib/images";

export default function StudentSection() {
  const [scrollY, setScrollY] = useState(0);

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

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Chemical Process Design: A Student's Journey",
      author: "Priya Sharma",
      date: "January 15, 2024",
      category: "Academic",
      image: contentImage(0),
      excerpt:
        "Diving deep into the fundamentals of chemical process design has been an incredible learning experience. From understanding heat exchangers to optimizing reaction conditions...",
      readTime: "5 min read",
      tags: ["Process Design", "MATLAB", "Optimization"],
    },
    {
      id: 2,
      title: "Industry 4.0 and Its Impact on Chemical Engineering",
      author: "Rahul Gupta",
      date: "January 12, 2024",
      category: "Technology",
      image: contentImage(1),
      excerpt:
        "The digital transformation in chemical engineering is revolutionizing how we approach process control, data analytics, and predictive maintenance...",
      readTime: "7 min read",
      tags: ["Industry 4.0", "IoT", "Digital Transformation"],
    },
    {
      id: 3,
      title: "My Internship Experience at ONGC: Lessons Learned",
      author: "Anjali Verma",
      date: "January 10, 2024",
      category: "Career",
      image: contentImage(2),
      excerpt:
        "Working at ONGC as a summer intern provided invaluable insights into the petroleum industry. From refinery operations to safety protocols...",
      readTime: "6 min read",
      tags: ["Internship", "ONGC", "Career Development"],
    },
    {
      id: 4,
      title: "Sustainable Chemistry: Building a Greener Future",
      author: "Vikash Kumar",
      date: "January 8, 2024",
      category: "Sustainability",
      image: contentImage(3),
      excerpt:
        "Exploring green chemistry principles and their applications in developing environmentally friendly chemical processes and products...",
      readTime: "8 min read",
      tags: ["Green Chemistry", "Sustainability", "Environment"],
    },
    {
      id: 5,
      title: "Breaking Down Complex Thermodynamics Concepts",
      author: "Neha Agarwal",
      date: "January 5, 2024",
      category: "Academic",
      image: contentImage(4),
      excerpt:
        "Understanding thermodynamics can be challenging, but with the right approach and practical examples, it becomes much more manageable...",
      readTime: "10 min read",
      tags: ["Thermodynamics", "Study Tips", "Theory"],
    },
    {
      id: 6,
      title: "Research Spotlight: Nanotechnology in Drug Delivery",
      author: "Aman Singh",
      date: "January 3, 2024",
      category: "Research",
      image: contentImage(5),
      excerpt:
        "Our latest research explores how nanotechnology can revolutionize drug delivery systems, improving efficacy and reducing side effects...",
      readTime: "9 min read",
      tags: ["Nanotechnology", "Research", "Bioengineering"],
    },
  ];

  // Featured posts (first 3)
  const featuredPosts = blogPosts.slice(0, 3);
  const regularPosts = blogPosts.slice(3);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${siteImages.statistics}')`,
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
              Student <span className="text-chea-red">Voices</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-gray-200 mb-6">
              Stories, Insights & Academic Excellence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the experiences, research breakthroughs, and academic
              journeys of ChEA members as they share their knowledge and
              insights.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Highlighted articles from our community members sharing their
              latest insights and experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {featuredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="bg-chea-dark-card border-chea-red/20 hover:border-chea-red/60 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-chea-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-3 hover:text-chea-red transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-chea-red/10 text-chea-red text-xs rounded border border-chea-red/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-12 text-center">
            Latest Articles
          </h2>

          <div className="space-y-8">
            {regularPosts.map((post, index) => (
              <Card
                key={post.id}
                className="bg-chea-dark-card border-chea-red/20 hover:border-chea-red/40 transition-all duration-300 overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={handleImageError}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-chea-red text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="lg:col-span-2 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="font-medium text-chea-red">
                        {post.author}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-4 hover:text-chea-red transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-chea-red/10 text-chea-red text-sm rounded border border-chea-red/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-chea-red/20 to-transparent p-8 rounded-2xl border border-chea-red/30">
              <h3 className="text-3xl font-light text-white mb-4">
                Share Your Story
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Have an interesting experience, research finding, or academic
                insight to share? We'd love to feature your story on our student
                blog.
              </p>
              <a
                href="mailto:official.chea@hbtu.ac.in?subject=ChEA%20Student%20Story%20Submission"
                className="inline-block bg-chea-red hover:bg-chea-red-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Your Article
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
