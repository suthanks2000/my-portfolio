import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { BiDownArrowAlt } from "react-icons/bi";
import { BsMouse } from "react-icons/bs";
import './Home.css';

const Home = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.3 }); // Trigger animation only once, when 30% is visible

  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.02, // Delay between each letter for better visibility
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-superWhite text-center px-8 py-10 flex flex-col-reverse lg:flex-row items-center lg:justify-around">
      {/* Center Section: Text Details */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <motion.h1
          className="text-5xl font-bold text-darkGray"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Hi, I'm Suthan
        </motion.h1>

        <motion.h2
          className="mt-4 text-2xl text-gray-600"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sentence}
        >
          {"Full Stack Developer".split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-500"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          A self-driven Full Stack Developer with a strong foundation in front-end and back-end technologies, including databases.
        </motion.p>

        <div className="flex justify-center lg:justify-start mt-6 space-x-4">
          <motion.a
            href="https://www.instagram.com/suthan_voyager/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkGray hover:text-red-600"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram size={30} />
          </motion.a>
          <motion.a
            href="https://github.com/suthanks2000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkGray hover:text-black"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={30} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/suthan-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkGray hover:text-blue-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={30} />
          </motion.a>
        </div>

        {/* Scroll Down Button */}
        <motion.div
          className="lg:pt-14 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Link
            offset={-100}
            spy={true}
            smooth={true}
            duration={500}
            to="about"
            className="inline-flex items-center bg-transparent text-gray-600 rounded-full text-lg hover:cursor-pointer"
          >
            <BsMouse className="mr-2" size={24} />
            Scroll Down
            <BiDownArrowAlt className="ml-2" size={17} />
          </Link>
        </motion.div>
      </div>

      {/* Right Section: Animated Image */}
      <div ref={ref} className="lg:w-1/4 mt-10 lg:mt-0 flex justify-center items-center relative">
        <motion.div
          className="relative w-full max-w-xs"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <img
            className="my-profile"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

