

import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center border-t border-gray-800">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-4 justify-center mb-2">
          <a
            href="https://github.com/TanmoyMajee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/tanmoy-majee-2b7280288/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">&copy; {currentYear} RagIT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;