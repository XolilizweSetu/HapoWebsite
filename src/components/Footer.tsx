import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const handleQuickLinkClick = () => {
    // Scroll to top when navigating to quick links
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSolutionClick = (sectionId: string) => {
    // Scroll to top first, then after navigation, scroll to specific section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src="/hpologo3.png" alt="Hapo Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Leading provider of digital display solutions and innovative visual technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/hapo-group" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/hapo_group/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@hapo_group" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  onClick={handleQuickLinkClick}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions" 
                  onClick={handleQuickLinkClick}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={handleQuickLinkClick}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  onClick={handleQuickLinkClick}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-bold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/solutions" 
                  onClick={() => handleSolutionClick('indoor-displays')}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Indoor Displays
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions" 
                  onClick={() => handleSolutionClick('outdoor-displays')}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Outdoor Displays
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions"
                  state={{ scrollTo: 'ai-solutions' }}
                  onClick={() => handleSolutionClick('ai-solutions')}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions"
                  state={{ scrollTo: 'smart-signage' }}
                  onClick={() => handleSolutionClick('smart-signage')}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Digital Signage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1 Bridgeway Road, Bridgeway Precinct, Century City, Cape Town, South Africa</li>
              <li>Phone: +27 (0) 21 140-8375</li>
              <li>Email: admin@hapogroup.co.za</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Hapo Group. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                onClick={handleQuickLinkClick}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                onClick={handleQuickLinkClick}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}