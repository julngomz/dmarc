import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FooterTabProps {
  isFooterVisible: boolean;
  toggleFooter: () => void;
}

const FooterTab: React.FC<FooterTabProps> = ({ isFooterVisible, toggleFooter }) => {
  return (
    <div
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-2 rounded-t-lg cursor-pointer shadow-lg z-20"
      onClick={toggleFooter}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">Who We Are</span>
        {isFooterVisible ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </div>
    </div>
  );
};

export default FooterTab;
