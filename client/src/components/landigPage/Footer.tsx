// client/src/components/Footer.tsx

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-4">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="font-bold text-lg">RagIT</div>
      <div className="text-sm mt-2 md:mt-0">
        &copy; {new Date().getFullYear()} RagIT. All rights reserved.
      </div>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors"
        >
          GitHub
        </a>
        <a href="/privacy" className="hover:text-amber-400 transition-colors">
          Privacy
        </a>
        <a href="/contact" className="hover:text-amber-400 transition-colors">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;