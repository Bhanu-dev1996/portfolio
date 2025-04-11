import { Github, Linkedin, Twitter } from 'lucide-react';

const SocialIcons = () => {
  return (
    <>
      <a 
        href="https://github.com/Bhanu-dev1996" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
      >
        <Github size={20} />
      </a>
      <a 
        href="https://www.linkedin.com/in/bhanu-shankar-577782197/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
      >
        <Linkedin size={20} />
      </a>
      <a 
        href="https://twitter.com/your-twitter-handle" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Twitter Profile"
        className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
      >
        <Twitter size={20} />
      </a>
      {/* <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
        <Dribbble size={20} />
      </a>
      <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
        <AtSign size={20} />
      </a> */}
    </>
  );
};

export default SocialIcons;