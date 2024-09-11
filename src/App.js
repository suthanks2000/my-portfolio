import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Navbar from './Small-Components/Navbar/index';
import Skills from './Components/Skills';
import Footer from './Small-Components/Footer';
import ScrollUpButton from './Small-Components/ScrollUpButton'; // Import the ScrollUpButton

function App() {
  return (
    <div className="bg-superWhite overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <Home />
      </section>

      {/* about Section */}
      <section id="about">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Scroll Up Button */}
      <ScrollUpButton /> {/* Include the ScrollUpButton */}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
