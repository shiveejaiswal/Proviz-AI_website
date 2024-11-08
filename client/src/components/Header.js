import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  // State to track whether the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect hook to listen for scroll events and update the isScrolled state
  useEffect(() => {
    // Function to check if the window has been scrolled
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // If scrolled more than 10px, set isScrolled to true
    };

    // Add scroll event listener on component mount
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Motion header for scroll animation
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }} // Start position off-screen
      animate={{ y: 0 }} // Move to the top of the screen
      transition={{ duration: 0.5 }} // Animation duration
    >
      {/* Container for the header content */}
      <motion.div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and home link */}
        <Link to="/" className="text-white text-2xl font-bold">
          Proviz AI
        </Link>
        
        {/* Navigation links */}
        <motion.nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-white hover:text-blue-400 transition-colors">
            Courses
          </Link>
          <Link to="/about" className="text-white hover:text-blue-400 transition-colors">
            About
          </Link>
          
          {/* Button for the 'Apply Now' link */}
          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.05 }} // Slightly increase the size when hovered
              whileTap={{ scale: 0.95 }} // Slightly decrease the size when clicked
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold"
            >
              Apply Now
            </motion.button>
          </Link>
        </motion.nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
