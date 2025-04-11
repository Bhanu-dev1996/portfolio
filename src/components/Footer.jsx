import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-12 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} border-t`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-indigo-500 mb-3">Bhanu.</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Creating intuitive digital experiences through thoughtful design and clean, efficient code.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialIcons />
            </div>
          </div>


          {/* Contact info */}
          <div className="text-center md:text-right">
            <h3 className={`font-semibold text-lg mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Contact</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>bhanushankar474@gmail.com</p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hyderabad, Telangana</p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {currentYear} Bhanu Shankar. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-gray-500">
            Built with React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;