import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsDown } from 'lucide-react';

interface ChatLayoutProps {
  children: ReactNode;
  isNavExpanded: boolean;
  toggleNav: () => void;
  navigateMarkers: (direction: 'prev' | 'next') => void;
  scrollToBottom: () => void;
  markersLength: number;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  isNavExpanded,
  toggleNav,
  navigateMarkers,
  scrollToBottom,
  markersLength,
}) => {
  return (
    <div className="flex h-full relative chat-container">
      <div className={`flex-grow flex flex-col ${isNavExpanded ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
        {children}
      </div>
      <div className={`flex flex-col justify-between bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${isNavExpanded ? 'w-1/3' : 'w-12'}`}>
        <button
          onClick={toggleNav}
          className="chat-button bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white self-start m-2"
          aria-label={isNavExpanded ? "Collapse navigation" : "Expand navigation"}
        >
          {isNavExpanded ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className="flex flex-col justify-end space-y-2 p-2">
          <button
            onClick={() => navigateMarkers('prev')}
            className="chat-button bg-green-500 text-white"
            aria-label="Previous marker"
            disabled={markersLength === 0}
          >
            <ChevronUp size={24} />
            {isNavExpanded && <span className="ml-2">Previous</span>}
          </button>
          <button
            onClick={() => navigateMarkers('next')}
            className="chat-button bg-green-500 text-white"
            aria-label="Next marker"
            disabled={markersLength === 0}
          >
            <ChevronDown size={24} />
            {isNavExpanded && <span className="ml-2">Next</span>}
          </button>
          <button
            onClick={scrollToBottom}
            className="chat-button bg-blue-500 text-white"
            aria-label="Scroll to bottom"
          >
            <ChevronsDown size={24} />
            {isNavExpanded && <span className="ml-2">Bottom</span>}
          </button>
        </div>
      </div>
    </div>
  );
};