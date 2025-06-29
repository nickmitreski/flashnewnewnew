import React, { memo } from 'react';
import GenericFolder from './GenericFolder';
import { mediaItems } from '../../../data/folderItemsData.ts';
import { AppContentProps } from '../../../data/appData.tsx';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

const MediaFolder: React.FC<AppContentProps> = ({ onOpenApp }) => {
  // Position the media folder items with their own generator
  const generatePosition = useWindowPosition(200, 250, 60, 60);
  
  // Create a wrapper function to pass the position generator
  const handleOpenApp = (appId: string, content?: React.ReactNode, title?: string) => {
    const position = generatePosition();
    onOpenApp(appId, content, title, position);
  };
  
  return (
    <GenericFolder items={mediaItems} onOpenApp={handleOpenApp} />
  );
};

export default memo(MediaFolder);