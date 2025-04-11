import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ activeSection, scrollToSection, sections, mobileMenuOpen, setMobileMenuOpen, darkMode, toggleDarkMode }) => {
  // Function to check if the section is active (corrected logic)
  const isActive = (section) => {
    // For the home section, check if path is empty or literally "home"
    if (section === 'home') {
      return activeSection === 'home' || activeSection === '';
    }
    return activeSection === section;
  };

  return (
    <nav className={`fixed w-full ${darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-gray-50 bg-opacity-90'} backdrop-blur-sm py-4 z-50 shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="text-2xl font-bold text-indigo-500 cursor-pointer"
        >
          Bhanu.
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {sections.map((section) => (
            <Link
              key={section}
              to={`/${section === 'home' ? '' : section}`} 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
              className={`text-sm uppercase tracking-wider hover:text-indigo-500 transition-colors cursor-pointer ${
                isActive(section) ? 'text-indigo-500 font-medium' : darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {section}
            </Link>
          ))}
          
          {/* Dark Mode Toggle - Desktop */}
          <button 
            onClick={toggleDarkMode}
            className="ml-2 p-2 rounded-full hover:bg-gray-700 hover:bg-opacity-30 transition-colors cursor-pointer"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-indigo-500" />}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Dark Mode Toggle - Mobile */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 hover:bg-opacity-30 transition-colors cursor-pointer"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-indigo-500" />}
          </button>
          
          <button 
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-indigo-500 cursor-pointer`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden container mx-auto px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex flex-col space-y-4`}
        >
          {sections.map((section) => (
            <Link
              key={section}
              to={`/${section === 'home' ? '' : section}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
                setMobileMenuOpen(false); // Close menu after selection
              }}
              className={`text-sm uppercase tracking-wider py-2 hover:text-indigo-500 transition-colors cursor-pointer ${
                isActive(section) ? 'text-indigo-500 font-medium' : darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {section}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;