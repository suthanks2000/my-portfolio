import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useRef } from 'react';

const About = () => {
  // Animation variants for the text
  const fadeIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const fadeInImage = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut', delay: 0.5 },
    },
  };

  const sentenceAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Staggering children for better visibility
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Refs for in-view sections
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { triggerOnce: true, threshold: 0.3 });

  return (
    <>
      <div className="text-center mt-10 lg:mt-40">
        <motion.h1
          className="text-4xl font-bold text-darkGray"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
        >
          About Me
        </motion.h1>

        <motion.h4
          className="text-lg mt-2 text-gray-500"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={sentenceAnimation}
        >
          {'My Introduction'.split('').map((letter, index) => (
            <motion.span key={index} variants={wordAnimation}>
              {letter}
            </motion.span>
          ))}
        </motion.h4>
      </div>

      <div ref={aboutRef} className="bg-lightGray text-center px-8 py-10 flex flex-col-reverse lg:flex-row items-center lg:justify-around">
        
        {/* Left Section: Image */}
        <div className="lg:w-1/5 mt-0 hidden lg:mt-10  lg:flex lg:justify-center lg:items-center lg:relative">
          <motion.div
            className="relative w-full max-w-xs"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInImage}
          >
            <img
              src="profile_bg.jpg" // Make sure the image path is correct
              alt="Profile"
              className="small-profile object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Right Section: About Text and Download Button */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.p
            className="mt-4 text-md text-gray-600"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            A highly motivated and self-driven full stack developer with a solid foundation in both front-end and back-end technologies, including databases. I have a strong ability to adapt quickly to new environments and challenges. With expertise in databases and a passion for continuous learning, I am dedicated to building efficient and scalable solutions.
          </motion.p>

          <motion.p
            className="mt-4 text-md text-gray-600"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            My goal is to contribute meaningfully to development teams by applying my skills in web development and problem-solving. I am eager to take on new challenges, collaborate with others, and make a positive impact in the field of software development.
          </motion.p>

          <motion.div
            className="mt-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            <a
              href="Suthan_Developer_Resume.pdf" // Ensure the path to your resume is correct
              download
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              Download CV
              <FaDownload className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
