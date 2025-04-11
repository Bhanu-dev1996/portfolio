import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcons';
import profileImage from '../assets/profile.jpg';

const Hero = forwardRef(({ scrollToSection, darkMode }, ref) => {
  return (
    <section 
      ref={ref} 
      className={`min-h-screen flex items-center pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`} 
      id="home"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center justify-between"
        >
          <div className="md:w-3/5 mt-8 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className={darkMode ? "text-gray-100" : "text-gray-900"}>Bhanu Shankar</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-500 mb-6">UX/UI Developer</h2>
            <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl`}>
              Creating intuitive and engaging digital experiences through thoughtful design and clean, efficient code.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:text-${darkMode ? 'gray-900' : 'white'} px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer`}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <img 
                src={profileImage} 
                alt="Bhanu Shankar - UX/UI Developer" 
                className="w-44 h-44 md:w-60 md:h-60 rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex space-x-6 mt-12 justify-center md:justify-start"
        >
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;