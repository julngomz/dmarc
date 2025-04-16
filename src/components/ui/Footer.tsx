import { ChevronUp, ChevronDown } from "lucide-react";

interface FooterProps {
  isFooterInfoVisible: boolean;
  toggleFooterInfo: () => void;
}

const Footer: React.FC<FooterProps> = ({ isFooterInfoVisible, toggleFooterInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-6 border-t">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} DMARC United. All rights reserved.
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Who We Are</span>
            {isFooterInfoVisible ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
