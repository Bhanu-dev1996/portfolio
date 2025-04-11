import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Clock, Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Projects = forwardRef(({ projects, darkMode }, ref) => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Use all projects without filtering
  const displayedProjects = projects.slice(0, visibleProjects);

  const handleViewMore = () => {
    setVisibleProjects(prev => 
      prev + 3 > projects.length ? projects.length : prev + 3
    );
  };

  // Create placeholder projects if no projects are available
  const placeholderProjects = [
    { id: 'placeholder-1', placeholder: true },
    { id: 'placeholder-2', placeholder: true },
    { id: 'placeholder-3', placeholder: true }
  ];

  // Determine which projects to display - always include the "more coming" card
  const projectsToDisplay = displayedProjects.length > 0 
    ? [...displayedProjects, { id: 'more-coming', moreComing: true }] 
    : placeholderProjects;

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {projectsToDisplay.map((project, index) => {
                if (project.placeholder) {
                  return (
                    <PlaceholderCard 
                      key={project.id}
                      index={index}
                      darkMode={darkMode}
                    />
                  );
                } else if (project.moreComing) {
                  return (
                    <MoreComingCard 
                      key={project.id}
                      index={projectsToDisplay.length - 1}
                      darkMode={darkMode}
                    />
                  );
                } else {
                  return (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      darkMode={darkMode}
                    />
                  );
                }
              })}
            </AnimatePresence>
          </div>
          
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

const MoreComingCard = ({ index, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden shadow-lg border-2 ${darkMode ? 'border-indigo-800' : 'border-indigo-200'} bg-gradient-to-br ${darkMode ? 'from-gray-900 to-indigo-900/20' : 'from-white to-indigo-50'}`}
    >
      <div className="relative overflow-hidden group h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-30"></div>
        <div className="rounded-full bg-indigo-100/10 p-6 border-2 border-indigo-500/30">
          <Plus className={`w-16 h-16 text-indigo-500`} />
        </div>
      </div>
      
      <div className="p-6 text-center">
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          More Coming Soon
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          I'm constantly working on new projects. Check back soon for more exciting additions!
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className={`${darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'} text-xs px-3 py-1 rounded-full`}>
            Stay Tuned
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const PlaceholderCard = ({ index, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden shadow-lg border-2 border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
    >
      <div className="relative overflow-hidden group h-64 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
        <Clock className={`w-16 h-16 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
      </div>
      
      <div className="p-6 text-center">
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Project Under Development
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          Exciting new project coming soon. Stay tuned for updates!
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className={`${darkMode ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-100 text-indigo-800'} text-xs px-3 py-1 rounded-full`}>
            Coming Soon
          </span>
        </div>
      </div>
    </motion.div>
  );
};

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