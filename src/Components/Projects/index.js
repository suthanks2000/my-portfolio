import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiX } from 'react-icons/fi'; // Import close icon
import { CiCircleCheck } from "react-icons/ci";
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  // State to track which project modal is open
  const [openProjectIndex, setOpenProjectIndex] = useState(null);

  // Reference for scrolling animation
  const projectRef = useRef(null);
  const isInView = useInView(projectRef, { triggerOnce: true, threshold: 0.3 });

  // Fade-in animation with stagger for project details
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const sentence = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  // Modal animation (open/close)
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } },
  };

  // Sample projects array with images and software used
  const projects = [
    {
      title: 'Task Management App',
      description: 'A role-based task management app with permissions for Admin, Manager, and User.',
      image: 'Task_app.jpg', // Replace with your image URL
      link: 'https://taskmanagemet-app.vercel.app/',
      softwareUsed: ['React', 'Tailwind CSS', 'Firebase'],
      soucre:'https://github.com/suthanks2000/taskmanagemet-app'
    },
    {
      title: 'Easy Finance App',
      description: 'The Easy Finance Application project is a web-based platform designed to streamline the loan application process, providing a seamless interface for both customers and financial sectors (banks). This application utilizes modern web technologies to enhance the user experience and improve operational efficiency in loan management.',
      image: 'Finance_app.jpg', // Replace with your image URL
      link: 'https://dsa-fin.agaram.academy',
      softwareUsed: ['React', 'Python', 'Flask','MySQl','FireBase','Bootstrap'],
      soucre:'https://github.com/suthanks2000/Easy-Finance'
    },
    {
      title: 'Resume Builder App',
      description: 'I developed a user-friendly, responsive resume builder web page with customizable templates and intuitive tools. Users can input personal info, education, work experience, and skills, with form fields adjusting dynamically. Live previews allow real-time viewing of resumes.',
      image: 'Resume_app.jpg', // Replace with your image URL
      link: 'https://suthanks2000.github.io/Resume-Builder/',
      softwareUsed: ['JavaScript', 'HTML','CSS','Bootstrap'],
      soucre:'https://github.com/suthanks2000/Resume-Builder'
    },
  ];

  // Function to open modal
  const openModal = (index) => {
    setOpenProjectIndex(index);
  };

  // Function to close modal
  const closeModal = () => {
    setOpenProjectIndex(null);
  };

  return (
    <div ref={projectRef} className="bg-lightGray py-16 px-4"> {/* Reduced padding */}
      {/* Project Header */}
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeIn}
      >
        <motion.h1 className="text-2xl lg:text-3xl font-bold text-darkGray">My Projects</motion.h1> {/* Reduced text size */}
        <motion.p className="text-base mt-2 text-gray-600"> {/* Reduced text size */}
          Here are some of the projects I have worked on:
        </motion.p>
      </motion.div>

      {/* Projects Grid */}
      <div className="Lg:px-32 grid grid-cols-1 p-9 md:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Reduced gap */}
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" 
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-3" /* Reduced image height */
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Project Title */}
            <motion.h3
              className="text-xl font-semibold mb-3 text-gray-800" /* Reduced text size */
              variants={sentence}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {project.title.split('').map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.h3>

            {/* View Details Button */}
            <button
              onClick={() => openModal(index)}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md mt-3" /* Reduced button size */
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup */}
      {openProjectIndex !== null && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalAnimation}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg"> {/* Reduced padding */}
            {/* Close Icon */}
            <FiX
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            />

            <h2 className="text-xl font-semibold mb-4"> {/* Reduced text size */}
              {projects[openProjectIndex].title}
            </h2>
            <p className="text-gray-700 mb-4">
              {projects[openProjectIndex].description}
            </p>
            <div className="mb-4">
              <p className="font-semibold text-gray-700">Software Used:</p>
              <ul className="list-none ml-0">
                {projects[openProjectIndex].softwareUsed.map((software, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 mb-2">
                    <CiCircleCheck className="mr-2" /> {/* Icon */}
                    {software}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-around mt-6">
              <a
                href={projects[openProjectIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <FiExternalLink className="mr-2" /> Live Link
              </a>
              <a
                href={projects[openProjectIndex].soucre}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-800 hover:underline"
              >
                <FaGithub className="mr-2" /> GitHub Link
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
