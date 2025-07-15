import { motion } from 'framer-motion';
import { EyeIcon, MusicalNoteIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function About() {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Sarah Johnson",
      role: "Head of Innovation",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Countries Served" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const solutions = [
    {
      icon: EyeIcon,
      title: "Look",
      description: "Transform your visual experience with our cutting-edge digital display solutions. From LED walls to interactive displays, we create stunning visual environments that captivate and engage your audience.",
      link: "/solutions"
    },
    {
      icon: MusicalNoteIcon,
      title: "Sound",
      description: "Revolutionize your retail atmosphere with our intelligent audio-visual ecosystem. AI-driven platform that seamlessly blends curated background music with dynamic promotional content.",
      link: "/services"
    },
    {
      icon: Cog6ToothIcon,
      title: "CMS",
      description: "Manage your digital signage network with our intelligent CMS platform. Cloud-based solution that empowers you to control unlimited displays from anywhere in the world with real-time monitoring.",
      link: "/services"
    }
  ];

  const partners = [
    { name: "Coca Cola", logo: "/coca cola copy.PNG" },
    { name: "Steers", logo: "/steers1.PNG" },
    { name: "Krispy Kreme", logo: "/krispy kreme copy.PNG" },
    { name: "Adidas", logo: "/adidas1.PNG" },
    { name: "Adidas", logo: "/engen.PNG" },
    { name: "Adidas", logo: "/hoka.PNG" },
    { name: "Adidas", logo: "/total.PNG" },
    { name: "McDonald's", logo: "/mcDonalds.PNG" }
  ];

  return (
    <div className="bg-gradient-to-br from-primary to-secondary">
      {/* Hero Section */}
      <div className="relative text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Hapo Group</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Leading the digital transformation in visual communication and customer engagement solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Hapo Group, we're dedicated to revolutionizing how businesses connect with their audiences through innovative digital solutions. Our mission is to empower organizations with cutting-edge technology that drives engagement and delivers measurable results.
              </p>
              <p className="text-gray-600">
                We combine creativity, technology, and strategic thinking to create digital experiences that leave lasting impressions and drive business growth.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Our Mission"
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions that transform how you connect with your audience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-6 mx-auto">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{solution.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{solution.description}</p>
                <div className="text-center">
                  <Link
                    to={solution.link}
                    state={{ scrollTo: solution.title === "Sound" ? "in-store-music" : solution.title === "CMS" ? "content-management" : null }}
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by leading brands worldwide
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="flex animate-flow-left">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center bg-white rounded-lg shadow-md"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/*<div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the innovators and strategists driving our mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>*/}
    </div>
  );
}