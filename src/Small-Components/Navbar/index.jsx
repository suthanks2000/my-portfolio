import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle link click and close the mobile menu
  const handleLinkClick = () => {
    setIsOpen(false); // Automatically close the menu when a link is clicked
  };

  return (
    <nav className="bg-white shadow-sm text-darkGray sticky w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-darkGray">Suthan</div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen} // Accessibility improvement
              className="inline-flex items-center justify-center p-2 rounded-md text-darkGray hover:text-darkGray hover:bg-lightGray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-darkGray"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={!isOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home','About','Skills', 'Projects', 'Contact'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={item.toLowerCase()}
                    offset={-100}
                    spy={true}
                    smooth={true}
                    duration={500}
                    activeClass="text-blue-600" // Highlight the active link
                    className="px-3 py-2 rounded-md text-sm cursor-pointer font-medium hover:bg-lightGray text-darkGray"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home','About','Skills','Projects',  'Contact'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.toLowerCase()}
                  offset={-100}
                  spy={true}
                  smooth={true}
                  duration={500}
                  activeClass="bg-gray-200" // Highlight the active link in the mobile menu
                  onClick={handleLinkClick} // Close the menu after clicking a link
                  className="block px-3 py-2 rounded-md cursor-pointer text-base font-medium text-darkGray hover:bg-lightGray"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
