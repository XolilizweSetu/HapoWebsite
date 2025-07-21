import { motion } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../stores/blogStore';
import { useEffect } from 'react';

export default function Home() {
  const { posts, loading, fetchPosts } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const latestPosts = posts.slice(0, 3);

  const solutions = [
    {
      title: "Digital Displays",
      description: "Transform your space with cutting-edge LED and LCD displays",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/solutions",
      scrollTo: null
    },
    {
      title: "Smart Signage",
      description: "Intelligent digital signage solutions for modern businesses",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/solutions",
      scrollTo: "smart-signage"
    },
    {
      title: "AI Solutions",
      description: "Advanced AI-powered systems for enhanced customer engagement",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/solutions",
      scrollTo: "ai-solutions"
    }
  ];

  const services = [
    {
      title: "Installation & Support",
      description: "Professional installation and ongoing technical support",
      image: "https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Content Creation",
      description: "Custom content design and management services",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Maintenance",
      description: "Regular maintenance and performance optimization",
      image: "https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Countries Served" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white text-base">
      <div className="relative h-[calc(100vh-64px)] bg-white flex items-center overflow-hidden" style={{ backgroundImage: 'url("/imgbackground copy.PNG")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">Transform Your Visual Experience</h1>
            <p className="text-lg sm:text-xl mb-8">Discover cutting-edge digital display solutions that elevate your brand and captivate your audience.</p>
            <Link to="/solutions" className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-primary text-white rounded-2xl hover:bg-secondary transition-all duration-300 transform hover:scale-105">
              Explore Solutions
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
