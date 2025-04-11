import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { skillsData } from './data/SkillsData';
import { projectsData } from './data/ProjectsData';
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or default to true
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  // Toggle dark mode function
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  }, []);

  // Update active section based on URL
  useEffect(() => {
    // Get the path from location
    const path = location.pathname.substring(1);
    
    // If path is empty, we're at home
    if (!path) {
      setActiveSection('home');
    } 
    // If path matches one of our sections, set it as active
    else if (sections.includes(path)) {
      setActiveSection(path);
    }
    
    // Scroll handling code...
  }, [location, sections]);

  // Throttle scroll handler for better performance
  useEffect(() => {
    let isThrottled = false;
    const throttleTime = 100; // ms

    const handleScroll = () => {
      if (isThrottled) return;
      
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
        
        const scrollPosition = window.scrollY + 100;
        let currentSection = '';

        for (const section of sections) {
          const element = sectionRefs[section].current;
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = section;
              break;
            }
          }
        }

        if (currentSection && currentSection !== activeSection) {
          setActiveSection(currentSection);
          navigate(`/${currentSection}`, { replace: true });
        }
      }, throttleTime);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, navigate]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    navigate(`/${sectionId}`);
    const element = sectionRefs[sectionId].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen transition-all duration-300`}>
      <Navbar 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        sections={sections}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero ref={sectionRefs.home} scrollToSection={scrollToSection} darkMode={darkMode} />
            <About ref={sectionRefs.about} darkMode={darkMode} />
            <Skills ref={sectionRefs.skills} skills={skillsData} darkMode={darkMode} />
            <Projects ref={sectionRefs.projects} projects={projectsData} darkMode={darkMode} />
            <Contact ref={sectionRefs.contact} darkMode={darkMode} />
          </>
        } />
        <Route path="/:section" element={
          <>
            <Hero ref={sectionRefs.home} scrollToSection={scrollToSection} darkMode={darkMode} />
            <About ref={sectionRefs.about} darkMode={darkMode} />
            <Skills ref={sectionRefs.skills} skills={skillsData} darkMode={darkMode} />
            <Projects ref={sectionRefs.projects} projects={projectsData} darkMode={darkMode} />
            <Contact ref={sectionRefs.contact} darkMode={darkMode} />
          </>
        } />
      </Routes>
      
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default App;
