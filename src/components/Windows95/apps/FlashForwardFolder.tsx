import React, { useState, useCallback } from 'react';
import { AppContentProps } from '../../../data/appData.tsx';
import { flashForwardFolders, FolderItem } from '../../../data/folderItemsData.ts';
import { useWindowsContext } from '../../../contexts/WindowsContext';
import StatsPage from './StatsPage';
import RandomAudioPlayer from './RandomAudioPlayer';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

/**
 * FlashForwardFolder component displays the contents of the Flash Forward folder
 * in the Windows 95 interface
 */
const FlashForwardFolder: React.FC<AppContentProps> = ({ onOpenApp }) => {
  const { onBack } = useWindowsContext();
  const [isTestimonialsPressed, setIsTestimonialsPressed] = useState(false);
  
  // Create a position generator for Flash Forward folder items
  const generatePosition = useWindowPosition(250, 150, 80, 80);

  /**
   * Handles clicking on a folder item
   * @param item - The folder item that was clicked
   */
  const handleItemClick = useCallback((item: FolderItem) => {
    // Generate a position for this item
    const position = generatePosition();
    
    // Handle opening other apps/windows
    if (item.isBuiltIn && item.appId) {
      if (item.appId === 'statsPage') {
        onOpenApp(
          item.appId,
          <StatsPage onContinue={onBack || (() => {})} />,
          undefined,
          position
        );
      } else {
        // For all other built-in apps, use the predefined app data
        onOpenApp(item.appId, undefined, undefined, position);
      }
    } else if (!item.isBuiltIn && item.path) {
      // For external items, open them in a new window with an iframe
      const externalId = `external-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      onOpenApp(
        externalId,
        <div style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <iframe 
            src={item.path}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#000'
            }}
            title={item.name}
            allow="fullscreen"
          />
        </div>,
        item.name,
        position
      );
    } else if (item.audioUrls && item.audioUrls.length > 0) {
      // For audio items, open a player window
      const audioAppId = `audio-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      onOpenApp(
        audioAppId,
        <RandomAudioPlayer audioUrls={item.audioUrls} />,
        item.name,
        position
      );
    }
  }, [onOpenApp, onBack, generatePosition]);

  /**
   * Plays a random testimonial audio
   * @param audioUrls - Array of audio URLs to choose from
   */
  const playRandomTestimonial = useCallback((audioUrls: string[]) => {
    if (audioUrls && audioUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * audioUrls.length);
      const audio = new Audio(audioUrls[randomIndex]);
      audio.play();
    }
  }, []);

  return (
    <div className="win95-folder-content">
      {/* Define quick pulsation animation */}
      <style>{`
        @keyframes pulsateQuick {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); } /* 10% larger */
          100% { transform: scale(1); }
        }
      `}</style>
      {flashForwardFolders.map((item, index) => (
        <div 
          key={index} 
          className="win95-folder-item"
          onDoubleClick={() => { if (!item.audioUrls) handleItemClick(item); }}
          onClick={() => {
            if (item.audioUrls) {
              playRandomTestimonial(item.audioUrls);
              setIsTestimonialsPressed(true);
              setTimeout(() => {
                setIsTestimonialsPressed(false); 
              }, 150);
            } else if (item.openOnSingleClick) {
              handleItemClick(item);
            }
          }}
        >
          <img 
            src={item.icon} 
            alt={item.name} 
            className="win95-folder-item-icon"
            style={{ 
              transform: item.audioUrls && isTestimonialsPressed ? 'scaleY(0.8)' : 'scaleY(1)',
              transition: item.audioUrls ? 'transform 0.05s ease-in-out' : 'none',
              animation: item.name === 'Update' ? 'pulsateQuick 0.8s infinite ease-in-out' : 'none' // Apply animation conditionally
            }} 
          />
          <div className="win95-folder-item-text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default FlashForwardFolder;