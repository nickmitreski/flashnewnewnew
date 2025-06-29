import React, { memo } from 'react';
import { AppContentProps } from '../../../data/appData.tsx';
import { aiItems } from '../../../data/folderItemsData.ts';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

const AIStuffFolder: React.FC<AppContentProps> = ({ onOpenApp }) => {
  // Create a position generator for AI tools
  const generatePosition = useWindowPosition(300, 100, 50, 50);

  const handleItemClick = (item: any) => {
    if (item.appId) {
      console.log(`Opening AI tool: ${item.appId}`);
      // Position AI tools with a random offset
      const position = generatePosition();
      onOpenApp(item.appId, undefined, undefined, position);
    }
  };

  return (
    <div className="win95-folder-content">
      {aiItems.map((item, index) => (
        <div 
          key={index} 
          className="win95-folder-item"
          onDoubleClick={() => handleItemClick(item)}
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

export default memo(AIStuffFolder);