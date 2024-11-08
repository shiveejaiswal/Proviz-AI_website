import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Proviz AI
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-white hover:text-blue-400 transition-colors">
            Courses
          </Link>
          <Link to="/about" className="text-white hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold"
            >
              Apply Now
            </motion.button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;