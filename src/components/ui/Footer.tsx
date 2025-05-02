const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 flex flex-col p-4 bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Organization. All rights reserved.
        </p>
        <div className="">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
