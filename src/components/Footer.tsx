import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const handleQuickLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSolutionClick = (sectionId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src="/hpologo3.png" alt="Hapo Logo" className="h-10 sm:h-12 w-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Leading provider of digital display solutions and innovative visual technologies.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/hapo-technology/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="https://instagram.com/hapo_technology/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="https://www.tiktok.com/@hapo_technology" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTiktok className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/solutions" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">Solutions</Link></li>
              <li><Link to="/services" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/blog" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/solutions" onClick={() => handleSolutionClick('indoor-displays')} className="text-gray-400 hover:text-white">Indoor Displays</Link></li>
              <li><Link to="/solutions" onClick={() => handleSolutionClick('outdoor-displays')} className="text-gray-400 hover:text-white">Outdoor Displays</Link></li>
              <li><Link to="/solutions" state={{ scrollTo: 'ai-solutions' }} onClick={() => handleSolutionClick('ai-solutions')} className="text-gray-400 hover:text-white">AI Solutions</Link></li>
              <li><Link to="/solutions" state={{ scrollTo: 'smart-signage' }} onClick={() => handleSolutionClick('smart-signage')} className="text-gray-400 hover:text-white">Digital Signage</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1 Bridgeway Rd, Century City, Cape Town</li>
              <li>Phone: +27 (0) 21 140-8375</li>
              <li>Email: admin@hapogroup.co.za</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 sm:mb-0">© 2025 Hapo Group. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" onClick={handleQuickLinkClick} className="text-gray-400 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
