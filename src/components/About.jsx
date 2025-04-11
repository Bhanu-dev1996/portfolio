import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeading from './SectionHeading';

const About = forwardRef(({ darkMode }, ref) => {
  // Function to handle resume download
  const handleDownload = () => {
    // Create a link to your resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Place your resume PDF in the public folder
    link.download = 'Bhanu_Shankar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={ref} 
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`} 
      id="about"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading title="About Me" />
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                I'm a passionate UX/UI Developer with 5+ years of experience crafting digital experiences that balance beautiful design with functional code. My background in both design and development allows me to bridge the gap between creative vision and technical implementation.
              </p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                I approach each project with a user-centered mindset, focusing on creating intuitive interfaces that solve real problems. I believe in clean, maintainable code and design systems that scale.
              </p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                When I'm not designing or coding, you'll find me exploring hiking trails, experimenting with digital art, or attending UX meetups to stay current with industry trends.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">My Design Philosophy</h3>
              <ul className="space-y-3">
                {[
                  "User-centered design that prioritizes accessibility and usability",
                  "Clean, minimalist interfaces that communicate clearly",
                  "Data-informed decisions supported by user research",
                  "Consistent design systems that scale across platforms",
                  "Performance-focused implementation with clean code"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 bg-indigo-500 rounded-full p-1"></div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleDownload}
                className="flex items-center mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                <Download className="mr-2" size={18} /> Download Resume
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;