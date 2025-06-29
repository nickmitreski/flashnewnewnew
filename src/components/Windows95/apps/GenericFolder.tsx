import React, { useCallback } from 'react';
import { AppContentProps } from '../../../data/appData.tsx';
import { FolderItem } from '../../../data/folderItemsData.ts';
import StatsPage from './StatsPage';
import { useWindowsContext } from '../../../contexts/WindowsContext';
import RandomAudioPlayer from './RandomAudioPlayer';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

interface GenericFolderProps extends AppContentProps {
  items: FolderItem[];
  onOpenApp: AppContentProps['onOpenApp'];
}

const AI_TOOL_APP_IDS = [
  'basicChatbot',
  'imageGenerator',
  'chatbot',
  'voicebot',
  'gpt90s',
];

const GAME_APP_IDS = [
  'game-mario',
  'game-zelda',
  'game-mk-wiki',
];

/**
 * GenericFolder component displays a folder's contents in the Windows 95 interface
 * and handles opening items with proper positioning
 */
const GenericFolder: React.FC<GenericFolderProps> = ({ onOpenApp, items }) => {
  const { onBack } = useWindowsContext();
  
  // Create a position generator for this folder's items
  // Each folder will have a different base position
  const generatePosition = useWindowPosition(200, 150, 80, 80);

  /**
   * Handles clicking on a folder item
   * @param item - The folder item that was clicked
   */
  const handleItemClick = useCallback((item: FolderItem) => {
    if (item.isBuiltIn && item.appId) {
      // Generate a position for this app
      const position = generatePosition();
      
      if (item.appId === 'statsPage') {
        onOpenApp(
          item.appId,
          <StatsPage onContinue={onBack || (() => {})} />,
          undefined,
          position
        );
      } else if (AI_TOOL_APP_IDS.includes(item.appId)) {
        // Position AI tools with random variance
        onOpenApp(item.appId, undefined, undefined, position);
      } else if (GAME_APP_IDS.includes(item.appId) || item.appId === 'minesweeper' || item.appId === 'solitaire') {
        // Games
        onOpenApp(item.appId, undefined, undefined, position);
      } else {
        // Other built-in apps
        onOpenApp(item.appId, undefined, undefined, position);
      }
    } else if (!item.isBuiltIn && item.path) {
      // Generate a position for this external content
      const position = generatePosition();
      
      // For external items, check if we have a dedicated launcher
      if (item.name === 'Super Mario') {
        onOpenApp('game-mario', undefined, undefined, position);
      } else if (item.name === 'Zelda') {
        onOpenApp('game-zelda', undefined, undefined, position);
      } else if (item.name === 'Mortal Kombat Wiki') {
        onOpenApp('game-mk-wiki', undefined, undefined, position);
      } else {
        // For other external items, open them in a new window with an iframe
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
      }
    } else if (item.audioUrls && item.audioUrls.length > 0) {
      // Generate a position for audio player
      const position = generatePosition();
      
      const audioAppId = `audio-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      onOpenApp(
        audioAppId,
        <RandomAudioPlayer audioUrls={item.audioUrls} />,
        item.name,
        position
      );
    }
  }, [onOpenApp, onBack, generatePosition]);

  return (
    <div className="win95-folder-content">
      {items && items.map((item, index) => (
        <div 
          key={index} 
          className="win95-folder-item"
          onDoubleClick={() => { if (!item.openOnSingleClick) handleItemClick(item); }}
          onClick={() => { if (item.openOnSingleClick) handleItemClick(item); }}
        >
          <img 
            src={item.icon} 
            alt={item.name} 
            className="win95-folder-item-icon" 
          />
          <div className="win95-folder-item-text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GenericFolder;