import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Solutions() {
  const location = useLocation();
  const [showAllIndoor, setShowAllIndoor] = useState(false);
  const [showAllOutdoor, setShowAllOutdoor] = useState(false);
  const [expandedAI, setExpandedAI] = useState<string | null>(null);
  const [expandedSmartSignage, setExpandedSmartSignage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we need to scroll to a specific section
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      
      // Set the appropriate expanded state based on the section
      if (sectionId === 'ai-solutions') {
        // Don't expand any specific AI solution, just scroll to the section
      } else if (sectionId === 'smart-signage') {
        // Don't expand any specific smart signage solution, just scroll to the section
      }
      
      // Scroll to the section after a short delay to ensure content is rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state]);

  const indoorDisplays = [
    {
      title: "Home Cinemas",
      description: "Transform your home entertainment with our state-of-the-art cinema displays, offering stunning 4K resolution and immersive viewing experience.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Board Rooms",
      description: "Advanced display solutions for corporate environments, featuring touch-screen capabilities and wireless connectivity.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Waiting Areas",
      description: "Engage your audience with dynamic content displays perfect for lobbies and waiting areas.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const outdoorDisplays = [
    {
      title: "Stadiums",
      description: "Massive LED displays designed for sports venues and arenas, delivering crystal-clear visuals visible from any seat.",
      image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Live Stages",
      description: "High-brightness LED walls and displays designed for live events and performances.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "QSR",
      description: "Digital menu boards and ordering systems designed for modern restaurants.",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const smartSignage = [
    {
      id: "interactive-kiosks",
      title: "Interactive Kiosks",
      description: "Advanced self-service kiosks with multi-touch capabilities designed to enhance customer experience and streamline operations.",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our Interactive Kiosks represent the future of customer self-service, combining cutting-edge hardware with intuitive software to create seamless user experiences. These robust, commercial-grade kiosks are designed for high-traffic environments and offer 24/7 operation capabilities. From wayfinding and information display to product ordering and payment processing, our kiosks transform how customers interact with your business.",
        features: [
          "Multi-touch capacitive displays (21.5\" to 55\" available)",
          "Vandal-resistant tempered glass with anti-glare coating",
          "Integrated payment systems (card readers, NFC, mobile payments)",
          "High-resolution cameras for video calling and security",
          "Built-in speakers and microphones for audio interaction",
          "Thermal receipt printers and barcode scanners",
          "ADA-compliant design with wheelchair accessibility",
          "Weather-resistant options for outdoor deployment",
          "Remote monitoring and content management",
          "Custom branding and enclosure design options"
        ],
        benefits: [
          "Reduce staff workload by 40-60% with automated services",
          "Increase customer satisfaction with 24/7 availability",
          "Generate additional revenue through upselling opportunities",
          "Collect valuable customer data and analytics",
          "Reduce wait times and improve service efficiency",
          "Lower operational costs over time",
          "Provide consistent service quality",
          "Support multiple languages for diverse customers"
        ],
        applications: [
          "Retail stores - Product information and inventory lookup",
          "Restaurants - Self-ordering and payment systems",
          "Hotels - Check-in/check-out and concierge services",
          "Healthcare - Patient registration and wayfinding",
          "Government offices - Form submission and information access",
          "Transportation hubs - Ticketing and schedule information",
          "Shopping malls - Directory and promotional displays",
          "Corporate lobbies - Visitor management and information"
        ],
        pricing: "Starting from $3,500 for basic models, $8,500 for advanced payment-enabled kiosks",
        timeline: "2-3 weeks for standard configurations, 4-6 weeks for custom designs"
      }
    },
    {
      id: "digital-menu-boards",
      title: "Digital Menu Boards",
      description: "Revolutionary digital menu systems that transform traditional static menus into dynamic, engaging displays with real-time updates and intelligent content management.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our Digital Menu Boards revolutionize the restaurant experience by replacing static menus with vibrant, dynamic displays that can be updated instantly. These intelligent systems integrate with your POS system to automatically update pricing, availability, and promotions in real-time. With stunning visuals, animated content, and dayparting capabilities, our digital menu boards increase sales while reducing operational costs.",
        features: [
          "Ultra-bright 4K displays visible in all lighting conditions",
          "Real-time POS integration for automatic updates",
          "Dayparting - automatic menu changes by time of day",
          "Weather-based menu suggestions and promotions",
          "Nutritional information and allergen displays",
          "Multi-language support with instant switching",
          "Animated menu items and promotional content",
          "Social media integration for user-generated content",
          "Voice ordering integration capabilities",
          "Analytics on customer viewing patterns and preferences",
          "Emergency menu override for out-of-stock items",
          "Custom templates and branding options"
        ],
        benefits: [
          "Increase average order value by 15-25% through visual appeal",
          "Reduce printing costs by 100% - no more paper menus",
          "Update menus instantly across all locations",
          "Promote high-margin items during peak hours",
          "Reduce perceived wait times with engaging content",
          "Improve order accuracy with clear item descriptions",
          "Enhance brand image with professional displays",
          "Gather customer behavior analytics for optimization"
        ],
        applications: [
          "Quick Service Restaurants (QSR) - Fast food chains",
          "Casual dining restaurants - Full-service establishments",
          "Coffee shops and cafes - Specialty beverage menus",
          "Food courts - Multiple vendor management",
          "Drive-thru locations - Weather-resistant outdoor displays",
          "Bars and pubs - Dynamic drink specials and promotions",
          "Bakeries - Fresh daily specials and seasonal items",
          "Food trucks - Compact, portable menu solutions"
        ],
        pricing: "Starting from $1,200 per display, complete systems from $2,800",
        timeline: "1-2 weeks for installation, immediate content updates"
      }
    },
    {
      id: "wayfinding-systems",
      title: "Wayfinding & Directory Systems",
      description: "Intelligent navigation solutions that guide visitors through complex spaces with interactive maps and real-time directions.",
      image: "https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our Wayfinding & Directory Systems transform complex navigation challenges into intuitive, user-friendly experiences. Using interactive touchscreens, real-time data integration, and intelligent routing algorithms, these systems help visitors find their destinations quickly and efficiently. Perfect for large facilities, shopping centers, hospitals, and corporate campuses where clear navigation is essential for customer satisfaction.",
        features: [
          "Interactive 3D maps with zoom and pan capabilities",
          "Real-time location tracking and turn-by-turn directions",
          "Multi-floor building navigation with elevator integration",
          "Search functionality by business name, category, or service",
          "Accessibility routing for wheelchair and mobility assistance",
          "Integration with building management systems",
          "Emergency evacuation route displays",
          "Promotional content and advertising opportunities",
          "Mobile app integration for continued navigation",
          "Analytics on popular destinations and traffic patterns",
          "Multi-language support with voice guidance",
          "QR code generation for mobile map sharing"
        ],
        benefits: [
          "Reduce customer frustration and improve satisfaction",
          "Decrease staff time spent giving directions by 70%",
          "Increase foot traffic to less-visible businesses",
          "Generate additional revenue through advertising space",
          "Improve emergency response with clear evacuation routes",
          "Enhance accessibility for disabled visitors",
          "Collect valuable data on visitor movement patterns",
          "Reduce signage maintenance costs"
        ],
        applications: [
          "Shopping malls and retail centers - Store directories",
          "Hospitals and medical centers - Department navigation",
          "Corporate campuses - Building and office location",
          "Universities - Campus navigation and room finding",
          "Airports - Terminal and gate navigation",
          "Hotels and resorts - Facility and amenity location",
          "Convention centers - Event and booth navigation",
          "Government buildings - Department and service location"
        ],
        pricing: "Starting from $4,500 per kiosk, enterprise solutions from $12,000",
        timeline: "3-4 weeks for mapping and setup, 1 week for installation"
      }
    },
    {
      id: "retail-displays",
      title: "Retail Information Displays",
      description: "Smart retail displays that provide product information, pricing, and promotional content to enhance the shopping experience.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our Retail Information Displays transform the shopping experience by providing customers with instant access to detailed product information, pricing, reviews, and recommendations. These intelligent displays integrate with inventory management systems to show real-time stock levels and can suggest complementary products to increase sales. Perfect for modern retail environments where informed customers make better purchasing decisions.",
        features: [
          "Real-time inventory integration showing stock levels",
          "Product comparison tools and detailed specifications",
          "Customer review and rating displays",
          "Personalized recommendations based on browsing history",
          "Price comparison with competitor analysis",
          "Augmented reality product visualization",
          "Social media integration for user-generated content",
          "Loyalty program integration and point tracking",
          "Wishlist creation and sharing capabilities",
          "Staff call buttons for additional assistance",
          "Multi-language product information",
          "Accessibility features for visually impaired customers"
        ],
        benefits: [
          "Increase sales conversion rates by 20-35%",
          "Reduce staff questions and improve efficiency",
          "Provide 24/7 product information availability",
          "Enhance customer confidence in purchasing decisions",
          "Collect valuable customer preference data",
          "Reduce product return rates through better information",
          "Improve customer satisfaction and loyalty",
          "Enable upselling and cross-selling opportunities"
        ],
        applications: [
          "Electronics stores - Technical specifications and comparisons",
          "Fashion retail - Size guides and styling suggestions",
          "Home improvement - Installation guides and tool requirements",
          "Automotive parts - Compatibility and installation information",
          "Cosmetics - Color matching and application tutorials",
          "Sporting goods - Equipment specifications and recommendations",
          "Furniture stores - Room visualization and measurements",
          "Grocery stores - Nutritional information and recipe suggestions"
        ],
        pricing: "Starting from $800 per display, integrated systems from $2,200",
        timeline: "1-2 weeks for setup and integration"
      }
    }
  ];

  const aiSolutions = [
    {
      id: "ai-analytics",
      title: "AI Analytics",
      description: "Advanced analytics powered by artificial intelligence to optimize your digital signage performance.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our AI Analytics platform transforms raw data into actionable insights for your digital signage network. Using machine learning algorithms, we analyze viewer engagement, content performance, and environmental factors to optimize your displays automatically. The system provides real-time analytics, predictive insights, and automated content recommendations to maximize ROI.",
        features: [
          "Real-time audience analytics and demographics",
          "Content performance tracking and optimization",
          "Predictive maintenance alerts",
          "Automated A/B testing for content effectiveness",
          "Heat mapping and attention analytics",
          "ROI measurement and reporting"
        ],
        benefits: [
          "Increase engagement rates by up to 40%",
          "Reduce operational costs through predictive maintenance",
          "Optimize content delivery based on audience behavior",
          "Improve decision-making with data-driven insights",
          "Automate content scheduling for maximum impact"
        ]
      }
    },
    {
      id: "ai-virtual-assistant",
      title: "AI Virtual Assistant",
      description: "Intelligent virtual assistants that provide 24/7 customer support and interactive experiences.",
      image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our AI Virtual Assistant solutions provide intelligent, conversational interfaces for your digital displays. These assistants can handle customer inquiries, provide product information, guide navigation, and even process transactions. Built with natural language processing and machine learning, they continuously improve their responses and adapt to user preferences.",
        features: [
          "Natural language processing and understanding",
          "Multi-language support (50+ languages)",
          "Voice and text interaction capabilities",
          "Integration with existing business systems",
          "Personalized recommendations and responses",
          "24/7 availability with no downtime"
        ],
        benefits: [
          "Reduce staff workload by 60%",
          "Provide consistent customer service quality",
          "Handle multiple customers simultaneously",
          "Collect valuable customer interaction data",
          "Improve customer satisfaction scores",
          "Lower operational costs significantly"
        ]
      }
    },
    {
      id: "ai-powered-analytics",
      title: "AI Powered Analytics",
      description: "Deep learning analytics that understand customer behavior and optimize content delivery.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our AI Powered Analytics goes beyond traditional metrics to provide deep insights into customer behavior, content effectiveness, and business impact. Using computer vision, machine learning, and big data processing, we deliver comprehensive analytics that help you understand not just what happened, but why it happened and what will happen next.",
        features: [
          "Computer vision for audience analysis",
          "Emotion and sentiment detection",
          "Behavioral pattern recognition",
          "Predictive modeling and forecasting",
          "Cross-platform data integration",
          "Custom dashboard and reporting tools"
        ],
        benefits: [
          "Understand customer emotions and reactions",
          "Predict future trends and behaviors",
          "Optimize content for maximum emotional impact",
          "Identify peak engagement times and patterns",
          "Measure brand sentiment and awareness",
          "Make data-driven strategic decisions"
        ]
      }
    },
    {
      id: "ai-agent-integration",
      title: "AI Agent Integration",
      description: "Seamless integration of AI agents across multiple platforms and touchpoints.",
      image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailedContent: {
        overview: "Our AI Agent Integration platform enables seamless deployment of intelligent agents across all your digital touchpoints. From digital signage to mobile apps, websites to social media, our AI agents provide consistent, intelligent interactions that enhance customer experience and drive business results. The platform supports omnichannel deployment with centralized management.",
        features: [
          "Omnichannel AI agent deployment",
          "Centralized agent management platform",
          "API-first architecture for easy integration",
          "Real-time learning and adaptation",
          "Custom workflow and process automation",
          "Advanced security and compliance features"
        ],
        benefits: [
          "Provide consistent experience across all channels",
          "Reduce integration complexity and costs",
          "Scale AI capabilities across your organization",
          "Automate complex business processes",
          "Improve operational efficiency by 50%",
          "Future-proof your digital infrastructure"
        ]
      }
    }
  ];

  const toggleAIExpansion = (id: string) => {
    setExpandedAI(expandedAI === id ? null : id);
  };

  const toggleSmartSignageExpansion = (id: string) => {
    setExpandedSmartSignage(expandedSmartSignage === id ? null : id);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Solutions</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of digital display solutions tailored for every environment
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Indoor & Outdoor Displays</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Smart Signage Solutions</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ AI-Powered Technology</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">✓ Custom Integration</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {/* Indoor Displays Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Indoor Displays</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our High-Resolution LED displays are designed for vibrant indoor environments, perfect for impactful presentations, advertising, and immersive experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src="/indoor4.PNG"
                alt="Indoor Displays"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Indoor Displays</h3>
                <p className="text-gray-600 mb-4">High-quality LED displays perfect for indoor environments with stunning visual clarity and performance.</p>
                <button
                  onClick={() => setShowAllIndoor(!showAllIndoor)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                >
                  View More
                </button>
              </div>
            </motion.div>

            {showAllIndoor && (
              <div className="grid gap-8">
                {indoorDisplays.map((display, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={display.image}
                      alt={display.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-4">{display.title}</h3>
                      <p className="text-gray-600">{display.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Outdoor Displays Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Outdoor Displays</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Weather-resistant, high-brightness LED displays built to deliver stunning visuals in any outdoor environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src="/outdoor1.PNG"
                alt="Outdoor Displays"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Outdoor Displays</h3>
                <p className="text-gray-600 mb-4">Durable LED displays engineered for outdoor use with exceptional brightness and weather resistance.</p>
                <button
                  onClick={() => setShowAllOutdoor(!showAllOutdoor)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                >
                  View More
                </button>
              </div>
            </motion.div>

            {showAllOutdoor && (
              <div className="grid gap-8">
                {outdoorDisplays.map((display, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={display.image}
                      alt={display.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-4">{display.title}</h3>
                      <p className="text-gray-600">{display.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Smart Signage Section */}
        <motion.div
          id="smart-signage"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Smart Signage</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Intelligent digital signage solutions that combine powerful hardware with smart software capabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {smartSignage.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg ${
                  expandedSmartSignage === solution.id ? 'md:col-span-2' : ''
                }`}
                id={solution.id}
              >
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <button 
                    onClick={() => toggleSmartSignageExpansion(solution.id)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    {expandedSmartSignage === solution.id ? 'Show Less' : 'Learn More'}
                  </button>

                  {/* Expanded Content */}
                  {expandedSmartSignage === solution.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 pt-8 border-t border-gray-200"
                    >
                      <div className="text-left space-y-6">
                        <div>
                          <h4 className="text-xl font-bold mb-3 text-primary">Overview</h4>
                          <p className="text-gray-600 leading-relaxed">
                            {solution.detailedContent.overview}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold mb-3 text-green-600">Key Features</h4>
                            <ul className="space-y-2">
                              {solution.detailedContent.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-gray-600">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold mb-3 text-blue-600">Benefits</h4>
                            <ul className="space-y-2">
                              {solution.detailedContent.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start text-gray-600">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-3 text-purple-600">Perfect For</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {solution.detailedContent.applications.map((application, idx) => (
                              <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                                <span className="text-gray-800 text-sm">{application}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-bold text-lg mb-3">Investment & Timeline</h4>
                          <p className="text-gray-700 mb-2"><strong>Pricing:</strong> {solution.detailedContent.pricing}</p>
                          <p className="text-gray-700"><strong>Timeline:</strong> {solution.detailedContent.timeline}</p>
                        </div>

                        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg text-center">
                          <h4 className="text-xl font-bold mb-3">Ready to Transform Your Business?</h4>
                          <p className="mb-4 opacity-90">
                            Contact our specialists to learn how {solution.title} can enhance your customer experience.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                              to="/contact"
                              className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                              Get Free Consultation
                            </Link>
                            <Link
                              to="/contact"
                              className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors duration-300"
                            >
                              Request Quote
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Solutions Section */}
        <motion.div
          id="ai-solutions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">AI Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Next-generation display solutions powered by artificial intelligence for enhanced customer engagement and business intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg ${
                  expandedAI === solution.id ? 'md:col-span-2' : ''
                }`}
              >
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <button 
                    onClick={() => toggleAIExpansion(solution.id)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    {expandedAI === solution.id ? 'Show Less' : 'Learn More'}
                  </button>

                  {/* Expanded Content */}
                  {expandedAI === solution.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 pt-8 border-t border-gray-200"
                    >
                      <div className="text-left space-y-6">
                        <div>
                          <h4 className="text-xl font-bold mb-3 text-primary">Overview</h4>
                          <p className="text-gray-600 leading-relaxed">
                            {solution.detailedContent.overview}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold mb-3 text-green-600">Key Features</h4>
                            <ul className="space-y-2">
                              {solution.detailedContent.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-gray-600">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold mb-3 text-blue-600">Benefits</h4>
                            <ul className="space-y-2">
                              {solution.detailedContent.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start text-gray-600">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg text-center">
                          <h4 className="text-xl font-bold mb-3">Ready to Get Started?</h4>
                          <p className="mb-4 opacity-90">
                            Contact our AI specialists to learn how {solution.title} can transform your business.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                              Schedule Demo
                            </button>
                            <button className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors duration-300">
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}