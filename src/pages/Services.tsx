import { motion } from 'framer-motion';
import { FaDisplay, FaCube, FaComputer, FaGears, FaMusic, FaRobot, FaComments, FaCheck, FaStar } from 'react-icons/fa6';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'led-displays',
    title: "Custom Built LED Displays",
    shortDescription: "State-of-the-art LED display solutions tailored to your specific needs.",
    description: "Transform your space with our premium custom-built LED displays. From indoor to outdoor installations, we provide high-quality displays with exceptional brightness, contrast, and durability that deliver stunning visual experiences.",
    icon: FaDisplay,
    image: "led screen.PNG",
    alt: "A team collaborating around a table, representing custom LED display project planning.",
    features: [
      "Ultra-high resolution up to 8K display quality",
      "Custom sizes from small retail displays to massive stadium screens",
      "Weather-resistant outdoor models with IP65+ rating",
      "Energy-efficient LED technology reducing power consumption by 40%",
      "Seamless modular design for easy installation and maintenance",
      "Advanced color calibration for consistent image quality",
      "24/7 operation capability with extended lifespan",
      "Remote monitoring and diagnostics"
    ],
    benefits: [
      "Capture attention with vibrant, eye-catching visuals",
      "Reduce long-term operational costs with energy efficiency",
      "Increase brand visibility and customer engagement",
      "Flexible content management for dynamic messaging"
    ],
    applications: [
      "Retail stores and shopping centers",
      "Corporate lobbies and conference rooms",
      "Sports stadiums and entertainment venues",
      "Transportation hubs and airports",
      "Outdoor advertising and billboards"
    ],
    pricing: "Starting from $2,500 for indoor displays, $5,000 for outdoor displays",
    timeline: "2-4 weeks for standard sizes, 4-8 weeks for custom configurations"
  },
  {
    id: 'content-creation',
    title: "Content Creation Services + 3D Animation",
    shortDescription: "Professional content creation and stunning 3D animations to bring your vision to life.",
    description: "Our creative team delivers engaging visual content that captures attention and delivers your message effectively. From concept to completion, we create compelling digital experiences that resonate with your audience.",
    icon: FaCube,
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A designer working on a 3D model on a computer, showcasing content creation services.",
    features: [
      "Professional 3D modeling and animation",
      "Motion graphics and visual effects",
      "Brand-consistent design templates",
      "Interactive content development",
      "Video production and editing",
      "Real-time content updates and scheduling",
      "Multi-format content optimization",
      "Custom animation sequences"
    ],
    benefits: [
      "Stand out with unique, professional content",
      "Increase audience engagement by 60%",
      "Maintain consistent brand messaging",
      "Save time with automated content scheduling"
    ],
    applications: [
      "Product launches and promotional campaigns",
      "Corporate presentations and training materials",
      "Entertainment and event content",
      "Educational and informational displays",
      "Interactive museum and exhibition content"
    ],
    pricing: "Starting from $500 per minute of content, 3D animations from $1,200",
    timeline: "1-2 weeks for standard content, 3-6 weeks for complex 3D animations"
  },
  {
    id: 'digital-hardware',
    title: "Digital Signage Hardware",
    shortDescription: "Complete range of digital signage hardware solutions including displays, mounts, and accessories.",
    description: "We offer reliable, commercial-grade equipment designed for 24/7 operation. Our hardware solutions are built to withstand demanding environments while delivering consistent performance.",
    icon: FaComputer,
    image: "digital signage.PNG",
    alt: "Multiple digital signage screens mounted on a wall in a modern office.",
    features: [
      "Commercial-grade displays with 50,000+ hour lifespan",
      "Professional mounting systems and brackets",
      "Media players with 4K content support",
      "Touch screen capabilities with multi-touch support",
      "Weatherproof enclosures for outdoor installations",
      "Cable management and power solutions",
      "Backup power systems and surge protection",
      "Wireless connectivity options"
    ],
    benefits: [
      "Reliable 24/7 operation with minimal downtime",
      "Professional installation and setup",
      "Comprehensive warranty and support",
      "Scalable solutions for growing businesses"
    ],
    applications: [
      "Retail point-of-sale displays",
      "Corporate communication systems",
      "Healthcare patient information systems",
      "Educational institution displays",
      "Hospitality and restaurant menus"
    ],
    pricing: "Hardware packages starting from $1,800, complete systems from $3,500",
    timeline: "1-2 weeks for standard hardware, 3-4 weeks for custom configurations"
  },
  {
    id: 'content-management',
    title: "Content Management Software + Remote Management",
    shortDescription: "Transform your digital signage network with intelligent CMS platform.",
    description: "Our cloud-based solution empowers you to manage unlimited displays from anywhere in the world. Schedule content with precision, monitor display health in real-time, and deploy updates instantly across your entire network.",
    icon: FaGears,
    image: "cms.PNG",
    alt: "Team looking at a dashboard, illustrating remote content management.",
    features: [
      "Cloud-based content management system",
      "Real-time display monitoring and alerts",
      "Advanced scheduling and playlist management",
      "Multi-user access with role-based permissions",
      "Content approval workflows",
      "Analytics and performance reporting",
      "Remote troubleshooting and diagnostics",
      "API integration capabilities"
    ],
    benefits: [
      "Manage thousands of displays from one dashboard",
      "Reduce operational costs by 50% with remote management",
      "Ensure content consistency across all locations",
      "Quick response to technical issues with instant alerts"
    ],
    applications: [
      "Multi-location retail chains",
      "Corporate office networks",
      "Educational institution campuses",
      "Healthcare facility systems",
      "Transportation network displays"
    ],
    pricing: "Starting from $29/month per display, enterprise plans from $199/month",
    timeline: "Immediate setup for standard configurations, 1-2 weeks for custom integrations"
  },
  {
    id: 'in-store-music',
    title: "In-Store Music + AI Promotions",
    shortDescription: "Revolutionize your retail atmosphere with intelligent audio-visual ecosystem.",
    description: "Our AI-driven platform seamlessly blends curated background music with dynamic promotional content, creating an immersive shopping experience that drives sales. The system analyzes customer demographics, time of day, and seasonal trends to automatically adjust music genres and promotional displays.",
    icon: FaMusic,
    image: "https://images.pexels.com/photos/3811867/pexels-photo-3811867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A modern retail store with good lighting and atmosphere for in-store music.",
    features: [
      "AI-powered music selection based on customer demographics",
      "Synchronized audio-visual promotional content",
      "Time-based playlist automation",
      "Mood and atmosphere optimization",
      "Licensed music library with 10M+ tracks",
      "Volume control and zone management",
      "Integration with POS systems for targeted promotions",
      "Real-time analytics on customer engagement"
    ],
    benefits: [
      "Increase average transaction value by 25%",
      "Enhance customer dwell time and satisfaction",
      "Reduce staff workload with automated systems",
      "Boost promotional campaign effectiveness"
    ],
    applications: [
      "Retail stores and boutiques",
      "Restaurants and cafes",
      "Hotels and hospitality venues",
      "Fitness centers and spas",
      "Shopping malls and centers"
    ],
    pricing: "Starting from $149/month per location, includes music licensing",
    timeline: "1 week for installation and setup, immediate activation"
  }
];

/* Commented out AI services for future use:
  {
    id: 'ai-virtual-assistant',
    title: "AI Virtual Assistant",
    shortDescription: "Advanced AI-powered virtual assistants that enhance customer interaction.",
    description: "Intelligent automation for improved efficiency and customer service. Our AI virtual assistants provide 24/7 customer support, answer frequently asked questions, and guide customers through complex processes with natural language understanding.",
    icon: FaRobot,
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A futuristic robot hand touching a glowing interface, representing AI virtual assistants.",
    features: [
      "Natural language processing and understanding",
      "Multi-language support (20+ languages)",
      "Voice and text interaction capabilities",
      "Integration with existing business systems",
      "Machine learning for continuous improvement",
      "Customizable personality and branding",
      "Analytics and conversation insights",
      "Escalation to human agents when needed"
    ],
    benefits: [
      "Reduce customer service costs by 60%",
      "Provide 24/7 customer support availability",
      "Improve customer satisfaction scores",
      "Free up staff for higher-value tasks"
    ],
    applications: [
      "Customer service and support centers",
      "Retail product information kiosks",
      "Healthcare patient assistance systems",
      "Banking and financial services",
      "Government service centers"
    ],
    pricing: "Starting from $299/month, enterprise solutions from $999/month",
    timeline: "2-4 weeks for setup and training, 1 week for deployment"
  },
  {
    id: 'ai-agent-integrations',
    title: "AI Agent Integrations",
    shortDescription: "Seamless chatbot integrations that provide instant customer support.",
    description: "Our AI-driven chatbots learn and adapt to deliver personalized interactions. Integrate with your existing platforms to provide consistent, intelligent customer engagement across all touchpoints.",
    icon: FaComments,
    image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A person interacting with a chatbot on a laptop, showing AI agent integration.",
    features: [
      "Omnichannel integration (web, mobile, social media)",
      "Advanced conversation flow management",
      "CRM and database integration",
      "Sentiment analysis and emotion detection",
      "Automated lead qualification and routing",
      "Custom API development and integration",
      "Real-time human handoff capabilities",
      "Performance analytics and optimization"
    ],
    benefits: [
      "Increase lead conversion rates by 40%",
      "Provide consistent customer experience",
      "Capture and qualify leads 24/7",
      "Reduce response time to under 30 seconds"
    ],
    applications: [
      "E-commerce customer support",
      "Lead generation and qualification",
      "Appointment scheduling systems",
      "Technical support and troubleshooting",
      "Sales assistance and product recommendations"
    ],
    pricing: "Starting from $199/month, custom integrations from $499/month",
    timeline: "1-3 weeks for standard integrations, 4-8 weeks for custom solutions"
  }
*/

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll to a specific service
    if (location.state?.scrollTo) {
      const serviceId = location.state.scrollTo;
      setExpandedService(serviceId);
      
      // Scroll to the service after a short delay to ensure content is rendered
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state]);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Comprehensive digital solutions tailored to transform your business and enhance customer engagement
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Professional Installation</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ 24/7 Support</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Custom Solutions</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Proven Results</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                id={service.id}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-lg">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.shortDescription}</p>
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    {expandedService === service.id ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Service Information */}
      {expandedService && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {services
              .filter(service => service.id === expandedService)
              .map((service) => (
                <div key={service.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  {/* Service Header */}
                  <div className="relative h-64 md:h-80">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <service.icon className="w-16 h-16 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                        <p className="text-xl max-w-2xl">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Features */}
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                          <FaStar className="mr-3" />
                          Key Features
                        </h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-primary">Benefits</h3>
                        <ul className="space-y-3 mb-8">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Pricing & Timeline */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-bold text-lg mb-3">Investment & Timeline</h4>
                          <p className="text-gray-700 mb-2"><strong>Pricing:</strong> {service.pricing}</p>
                          <p className="text-gray-700"><strong>Timeline:</strong> {service.timeline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold mb-6 text-primary">Perfect For</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {service.applications.map((application, index) => (
                          <div key={index} className="bg-primary bg-opacity-10 p-4 rounded-lg text-center">
                            <span className="text-gray-800 font-medium">{application}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-secondary transition-colors duration-300 text-lg font-semibold"
                      >
                        Get Started with {service.title}
                      </Link>
                      <p className="text-gray-600 mt-4">Contact us for a free consultation and custom quote</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Why Choose Us Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Choose Hapo Group?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just a service provider – we're your technology partner committed to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Industry Expertise",
                description: "10+ years of experience in digital signage and display technology"
              },
              {
                icon: "🔧",
                title: "End-to-End Solutions",
                description: "From consultation to installation and ongoing support"
              },
              {
                icon: "⚡",
                title: "Cutting-Edge Technology",
                description: "Latest AI and IoT integration for smart, efficient systems"
              },
              {
                icon: "🎯",
                title: "Proven Results",
                description: "500+ successful projects with measurable ROI improvements"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-gray-50 p-8 rounded-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals and exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-100 transition-colors duration-300 font-semibold"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary transition-colors duration-300 font-semibold"
            >
              View Our Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}