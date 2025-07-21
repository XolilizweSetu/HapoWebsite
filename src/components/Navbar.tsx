import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [isEsgOpen, setIsEsgOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const esgRef = useRef<HTMLDivElement>(null);

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
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img src="/hapoLogo.PNG" alt="Hapo Logo" className="h-12 w-auto" />
          </Link>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center space-x-6">
            <Link to="/" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
              Home
            </Link>
            <Link to="/solutions" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
              Solutions
            </Link>
            <Link to="/services" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
              Services
            </Link>
            <Link to="/blog" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
              Blog
            </Link>
            <div className="relative" ref={esgRef}>
              <button
                onClick={() => setIsEsgOpen(!isEsgOpen)}
                className="text-gray-700 group inline-flex items-center text-sm font-medium hover:text-primary"
              >
                ESG
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isEsgOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/esg/environmental" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Environmental
                    </Link>
                    <Link to="/esg/social" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Social
                    </Link>
                    <Link to="/esg/governance" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Governance
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
              About
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="text-gray-700 hover:text-primary text-sm font-medium">
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-2 pb-4">
            <Link to="/" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              Home
            </Link>
            <Link to="/solutions" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              Solutions
            </Link>
            <Link to="/services" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              Services
            </Link>
            <Link to="/blog" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              Blog
            </Link>
            <div className="block" ref={esgRef}>
              <button
                onClick={() => setIsEsgOpen(!isEsgOpen)}
                className="text-gray-700 text-sm font-medium flex items-center hover:text-primary"
              >
                ESG
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isEsgOpen && (
                <div className="mt-1 space-y-1 ml-4">
                  <Link to="/esg/environmental" onClick={handleLinkClick} className="block text-sm text-gray-700 hover:text-primary">
                    Environmental
                  </Link>
                  <Link to="/esg/social" onClick={handleLinkClick} className="block text-sm text-gray-700 hover:text-primary">
                    Social
                  </Link>
                  <Link to="/esg/governance" onClick={handleLinkClick} className="block text-sm text-gray-700 hover:text-primary">
                    Governance
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              About
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="block text-gray-700 hover:text-primary text-sm">
              Contact
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition-colors duration-300 uppercase"
            >
              ASK A QUOTE
              <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
