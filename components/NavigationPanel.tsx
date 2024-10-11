import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsDown } from 'lucide-react';

interface NavigationPanelProps {
  isNavExpanded: boolean;
  toggleNav: () => void;
  navigateMarkers: (direction: 'prev' | 'next') => void;
  getCurrentMarkerDisplay: () => string;
  scrollToBottom: () => void;
  markersLength: number;
}

/**
 * NavigationPanel Component
 * 
 * This component renders the navigation panel for the chat interface.
 * It provides controls for expanding/collapsing the panel, navigating through markers,
 * and scrolling to the bottom of the chat.
 * 
 * @param {NavigationPanelProps} props - The props for the NavigationPanel component
 * @returns {JSX.Element} The rendered NavigationPanel component
 */
export const NavigationPanel: React.FC<NavigationPanelProps> = React.memo(({
  isNavExpanded,
  toggleNav,
  navigateMarkers,
  getCurrentMarkerDisplay,
  scrollToBottom,
  markersLength
}) => {
  /**
   * Renders a navigation button with consistent styling and layout
   * 
   * @param {() => void} onClick - The function to call when the button is clicked
   * @param {string} ariaLabel - The aria-label for the button
   * @param {React.ReactNode} icon - The icon to display in the button
   * @param {string} [text] - The text to display next to the icon (only when nav is expanded)
   * @param {boolean} [disabled] - Whether the button should be disabled
   * @returns {JSX.Element} The rendered button
   */
  const renderNavButton = (
    onClick: () => void,
    ariaLabel: string,
    icon: React.ReactNode,
    text?: string,
    disabled?: boolean
  ) => (
    <button
      onClick={onClick}
      className={`chat-nav-button ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-6 flex-shrink-0 flex justify-center">
          {icon}
        </div>
        {isNavExpanded && text && <span className="ml-2">{text}</span>}
      </div>
    </button>
  );

  return (
    <div 
      className={`chat-nav-panel ${isNavExpanded ? 'w-1/3' : 'w-12'}`}
      role="navigation"
      aria-label="Chat navigation"
    >
      <div className="flex flex-col space-y-2 p-1">
        {renderNavButton(
          toggleNav,
          isNavExpanded ? "Collapse navigation" : "Expand navigation",
          isNavExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />,
          isNavExpanded ? "Collapse" : undefined
        )}
      </div>
      <div className="flex flex-col space-y-2 p-1">
        {renderNavButton(
          () => navigateMarkers('prev'),
          "Previous marker",
          <ChevronUp size={20} />,
          "Previous",
          markersLength === 0
        )}
        <div 
          className="chat-marker-display"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-6 flex-shrink-0 flex justify-center">
              <span>{getCurrentMarkerDisplay()}</span>
            </div>
            {isNavExpanded && <span className="ml-2">Marker</span>}
          </div>
        </div>
        {renderNavButton(
          () => navigateMarkers('next'),
          "Next marker",
          <ChevronDown size={20} />,
          "Next",
          markersLength === 0
        )}
        {renderNavButton(
          scrollToBottom,
          "Scroll to bottom",
          <ChevronsDown size={20} />,
          "Bottom"
        )}
      </div>
    </div>
  );
});