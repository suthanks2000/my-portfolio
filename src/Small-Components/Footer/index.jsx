import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 text-gray-900 py-8 px-4 flex flex-col items-center">
      <div className="max-w-screen-lg w-full flex flex-col items-center text-center">
        {/* Quick Links Section */}
        {/* <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-7">Suthan</h3>
          <div className="flex flex-col lg:flex-row lg:space-x-4 lg:justify-center lg:items-center">
  {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
    <motion.div
      key={item}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ScrollLink
        to={item.toLowerCase()}
        offset={-100}
        spy={true}
        smooth={true}
        duration={500}
        className="px-3 py-2 rounded-md text-sm cursor-pointer font-medium hover:bg-lightGray text-darkGray"
      >
        {item}
      </ScrollLink>
    </motion.div>
  ))}
</div>
        </div> */}

        {/* Social Media Icons Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/suthanks2000"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-gray-950 lg:text-gray-600 hover:text-gray-950"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-2xl" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/suthan-k/"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:text-gray-600 text-blue-600 hover:text-blue-600"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-2xl" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/suthan_voyager/"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:text-gray-600 text-red-700 hover:text-red-600"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram className="text-2xl" />
            </motion.a>
          </div>
        </div>

        {/* Copyright Section */}
        <div>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Suthan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
