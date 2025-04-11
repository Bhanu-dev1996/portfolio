import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Projects = forwardRef(({ projects, darkMode }, ref) => {
  const [visibleProjects, setVisibleProjects] = useState(4);

  // Use all projects without filtering
  const displayedProjects = projects.slice(0, visibleProjects);

  const handleViewMore = () => {
    setVisibleProjects(prev => 
      prev + 2 > projects.length ? projects.length : prev + 2
    );
  };

  return (
    <section 
      ref={ref} 
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} 
      id="projects"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Recent Projects" />
          
          {displayedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatePresence>
                {displayedProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    darkMode={darkMode}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <p className="text-xl font-medium">No projects available.</p>
              <p className="mt-2">Check back soon for new projects!</p>
            </motion.div>
          )}
          
          <div className="text-center mt-12">
            {visibleProjects < projects.length && (
              <button 
                onClick={handleViewMore}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                View More Projects
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const ProjectCard = ({ project, index, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden shadow-lg`}
    >
      <div className="relative overflow-hidden group">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex space-x-4">
            <a 
              href={project.demoLink} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              Live Demo
            </a>
            <a 
              href={project.codeLink} 
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className={`${darkMode ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-100 text-indigo-800'} text-xs px-3 py-1 rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;