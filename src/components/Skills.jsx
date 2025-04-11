import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';

const Skills = forwardRef(({ skills, darkMode }, ref) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const categories = ['all', ...new Set(skills.map(skill => skill.category))];
  
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
      className={`${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'} p-4 rounded-lg`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-medium text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {skill.name}
        </h3>
        <span className="text-indigo-500 text-sm font-medium">{skill.level}%</span>
      </div>
      <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
        <div 
          className="bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

Skills.displayName = 'Skills';

export default Skills;