import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skillsData } from '../data/SkillsData'; // Import skillsData

const Skills = forwardRef(({ darkMode }, ref) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter skills based on the active category
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  // Extract unique categories from skillsData
  const categories = ['all', ...new Set(skillsData.map(skill => skill.category))];

  return (
    <section 
      ref={ref} 
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`} 
      id="skills"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Skills & Tools" />
          
          <div className="mb-12">
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`${
                    activeCategory === category 
                      ? 'bg-indigo-600 text-white' 
                      : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`
                  } px-4 py-2 rounded-md text-sm transition-colors duration-300 cursor-pointer`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="wait">
                {filteredSkills.map((skill, index) => (
                  <SkillItem 
                    key={skill.name} 
                    skill={skill} 
                    index={index} 
                    darkMode={darkMode}
                  />
                ))}
              </AnimatePresence>
              
              {/* No Skills Found Message */}
              {filteredSkills.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`col-span-full text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  No skills found in this category.
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const SkillItem = ({ skill, index, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Skill Icon */}
        <div 
          className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-8 h-8"
          />
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-semibold">{skill.name}</h3>
      </div>
    </motion.div>
  );
};

Skills.displayName = 'Skills';

export default Skills;