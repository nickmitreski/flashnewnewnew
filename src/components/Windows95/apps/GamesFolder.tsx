import React, { memo } from 'react';
import { AppContentProps } from '../../../data/appData.tsx';
import GenericFolder from './GenericFolder';
import { games } from '../../../data/folderItemsData.ts';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

const GamesFolder: React.FC<AppContentProps> = ({ onOpenApp }) => {
  // Create a position generator specifically for games
  const generatePosition = useWindowPosition(250, 150, 70, 70);
  
  // Create a wrapper function to pass the position generator
  const handleOpenApp = (appId: string, content?: React.ReactNode, title?: string) => {
    const position = generatePosition();
    onOpenApp(appId, content, title, position);
  };
  
  return (
    <GenericFolder items={games} onOpenApp={handleOpenApp} />
  );
};

export default memo(GamesFolder);