// import React, { useRef } from 'react';
// import { motion,useInView } from 'framer-motion';
// import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaDatabase, FaJsSquare, FaBootstrap, FaGit, FaMicrosoft } from 'react-icons/fa';
// import { SiTailwindcss, SiFirebase, SiMysql, SiFlask, SiRedux } from 'react-icons/si'; // Additional icons

// const Skills = () => {
//     const aboutRef = useRef(null);
//   const inView = useInView(aboutRef,{ triggerOnce: true, threshold: 0.5 });

//   const fadeIn = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.1 },
//     },
//   };

//   const fadeInIcon = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.7, ease: 'easeOut', delay: 0.5 },
//     },
//   };

//   // Array of skills with icons and names
//   const skills = [
//       { icon: <FaPython size={50} className="text-yellow-500" />, name: 'Python' },
//       { icon: <SiFlask size={50} className="text-black" />, name: 'Flask' },
//     { icon: <FaReact size={50} className="text-blue-500" />, name: 'React JS' },
//     { icon: <SiRedux size={50} className="text-violet-900" />, name: 'Redux' },
//     { icon: <FaJsSquare size={50} className="text-yellow-400" />, name: 'JavaScript' },
//     { icon: <FaHtml5 size={50} className="text-orange-500" />, name: 'HTML' },
//     { icon: <FaCss3Alt size={50} className="text-blue-700" />, name: 'CSS' },
//     { icon: <FaBootstrap size={50} className="text-purple-600" />, name: 'Bootstrap' },
//     { icon: <SiTailwindcss size={50} className="text-blue-400" />, name: 'Tailwind CSS' },
//     { icon: <SiFirebase size={50} className="text-yellow-500" />, name: 'Firebase' },
//     { icon: <SiMysql size={50} className="text-blue-600" />, name: 'MySQL' },
//     { icon: <FaGit size={50} className="text-orange-500" />, name: 'Git' },
//     { icon: <FaMicrosoft size={50} className="text-blue-600" />, name: 'MS Office' }
//   ];

//   return (
//     <div ref={aboutRef}>
//       <div className="text-center px-8 mt-10 lg:mt-40">
//         <motion.h1
//           className="text-4xl font-bold text-darkGray"
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={fadeIn}
//         >
//           My Skills
//         </motion.h1>

//         <motion.h4
//           className="text-lg mt-2 text-gray-500"
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1, transition: { duration: 0.5, delay: 0.5 } } : {}}
//         >
//           Technologies I've worked with
//         </motion.h4>
//       </div>

//       <div className="bg-lightGray text-center px-8 py-10 grid grid-cols-2 lg:grid-cols-6 gap-1 lg:gap-10 items-center">
//         {/* Frontend Section */}
//         <motion.h3
//           className="col-span-6 text-2xl font-semibold mt-8 text-gray-700"
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={fadeIn}
//         >
//           Frontend
//         </motion.h3>

//         {/* Dynamically render skills */}
//         {skills.map((skill, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <motion.div
//               className="p-4 bg-white rounded-full shadow-lg hover:shadow-2xl"
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               variants={fadeInIcon}
//             >
//               {skill.icon}
//             </motion.div>
//             <motion.p className="mt-4 text-lg text-gray-600">{skill.name}</motion.p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Skills;

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaDatabase, FaJsSquare, FaBootstrap, FaGit } from 'react-icons/fa';
import { SiTailwindcss, SiFirebase, SiMysql, SiFlask, SiRedux  } from 'react-icons/si'; // Additional icons

const Skills = () => {
  const aboutRef = useRef(null);
  const inView = useInView(aboutRef, { triggerOnce: true, threshold: 0.5 });

  const fadeIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeInOut', staggerChildren: 0.1 },
    },
  };

  const fadeInIcon = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut', delay: 0.5 },
    },
  };

  // Array of skills with icons and names
  const skills = [
    { icon: <FaPython size={50} className="text-yellow-500" />, name: 'Python' },
    { icon: <SiMysql size={50} className="text-blue-600" />, name: 'MySQL' },
    { icon: <FaReact size={50} className="text-blue-500" />, name: 'React JS' },
    { icon: <SiFlask size={50} className="text-black" />, name: 'Flask' },
    { icon: <SiRedux size={50} className="text-violet-900" />, name: 'Redux' },
    { icon: <FaJsSquare size={50} className="text-yellow-400" />, name: 'JavaScript' },
    { icon: <FaHtml5 size={50} className="text-orange-500" />, name: 'HTML' },
    { icon: <FaCss3Alt size={50} className="text-blue-700" />, name: 'CSS' },
    { icon: <FaBootstrap size={50} className="text-purple-600" />, name: 'Bootstrap' },
    { icon: <SiTailwindcss size={50} className="text-blue-400" />, name: 'Tailwind CSS' },
    { icon: <SiFirebase size={50} className="text-yellow-500" />, name: 'Firebase' },
    { icon: <FaGit size={50} className="text-orange-500" />, name: 'Git' },
    // { icon: <SiMicrosoftexchange size={50} className="text-green-600" />, name: 'MS Excel' }
  ];

  return (
    <div ref={aboutRef} className='lg:px-8'>
      <div className="text-center px-4 mt-10 lg:mt-40">
        <motion.h1
          className="text-3xl lg:text-4xl font-bold text-darkGray"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          My Skills
        </motion.h1>

        <motion.h4
          className="text-base lg:text-lg mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, transition: { duration: 0.5, delay: 0.5 } } : {}}
        >
          Technologies I've worked with
        </motion.h4>
      </div>

      <div className="bg-lightGray text-center px-4 py-10 grid  grid-cols-3  lg:grid-cols-6 gap-4 lg:gap-10 items-center">


        {/* Dynamically render skills */}
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-2xl"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInIcon}
            >
              {skill.icon}
            </motion.div>
            <motion.p className="mt-4 text-sm lg:text-lg text-gray-600">{skill.name}</motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;



