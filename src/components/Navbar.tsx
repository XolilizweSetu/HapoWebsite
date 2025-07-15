import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [isEsgOpen, setIsEsgOpen] = useState(false);
  const esgRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (esgRef.current && !esgRef.current.contains(event.target as Node)) {
        setIsEsgOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsEsgOpen(false);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/hapoLogo.PNG" 
                alt="Hapo Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/solutions" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Solutions
            </Link>
            <Link 
              to="/services" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Blog
            </Link>
            <div className="relative" ref={esgRef}>
              <button
                onClick={() => setIsEsgOpen(!isEsgOpen)}
                className="text-gray-700 group inline-flex items-center px-3 py-2 text-sm font-medium hover:text-primary"
              >
                ESG
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              
              {isEsgOpen && (
                <div className="absolute z-10 -ml-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link
                      to="/esg/environmental"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Environmental
                    </Link>
                    <Link
                      to="/esg/social"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Social
                    </Link>
                    <Link
                      to="/esg/governance"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Governance
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition-colors duration-300 uppercase"
            >
              ASK A QUOTE
              <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;