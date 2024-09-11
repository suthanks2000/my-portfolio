import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoIosPaperPlane } from "react-icons/io";

const Contact = () => {
  const form = useRef();
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_h4lwhej', 'template_mwj0v6n', form.current, {
      publicKey: 'qOiaspeGNMVUKis9H',
    }).then((result) => {
      console.log(result.text);
      setResponseMessage('Message Sent Successfully!');
    }, (error) => {
      console.log(error.text);
      setResponseMessage('Failed to send message, please try again later.');
    }).finally(() => {
      setLoading(false);
      e.target.reset();
    });
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
      }, 2000); // Hide after 2 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [responseMessage]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  if (inView) {
    controls.start('visible');
  }

  const alertVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="py-12 px-8 lg:px-32">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        ref={ref}
      >
        <h1 className="text-4xl font-bold text-gray-800">Contact Me</h1>
        <p className="text-lg text-gray-600 mt-2">Get in touch</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-center items-start">
        <motion.div
          className="w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Talk to me</h3>
          <div className="border border-gray-300 p-4 rounded-lg mb-6 flex items-center space-x-4 justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.2, color: '#1e90ff' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaEnvelope className="text-blue-500 text-2xl" />
            </motion.div>
            <div>
              <h4 className="text-lg font-medium text-gray-700">Email</h4>
              <p className="text-gray-600">suthanks2000@gmail.com</p>
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg flex items-center space-x-4 justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.2, color: '#25D366' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaWhatsapp className="text-green-500 text-2xl" />
            </motion.div>
            <div>
              <h4 className="text-lg font-medium text-gray-700">WhatsApp</h4>
              <p className="text-gray-600">+91 9384340144</p>
            </div>
            <div className="flex items-center space-x-2">
              <a href="https://wa.me/919384340144"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-700">Chat with</a>
              <FaArrowRight className="text-gray-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-2/3 flex justify-center"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <form ref={form} onSubmit={sendEmail} className="bg-white px-8 w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Your message"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="lg:w-1/2 w-full  bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center"
            >
 {loading ? (
    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
  ) : (
    <>
      Send Message <IoIosPaperPlane size={20} className="ml-2" />
    </>
  )}            </button>
          </form>
        </motion.div>
      </div>

      {responseMessage && (
        <motion.div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={alertVariants}
        >
          {responseMessage}
        </motion.div>
      )}
    </div>
  );
};

export default Contact;
