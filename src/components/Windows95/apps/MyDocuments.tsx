import React, { memo } from 'react';
import { useWindowPosition } from '../../../hooks/useWindowPosition';

interface MyDocumentsProps {
  onOpenApp: (appId: string, content?: React.ReactNode, title?: string, position?: { x: number; y: number }) => void;
}

const MyDocuments: React.FC<MyDocumentsProps> = ({ onOpenApp }) => {
  // Create a position generator for document windows
  const generatePosition = useWindowPosition(180, 120, 60, 60);

  const handleImageDoubleClick = (imageSrc: string, imageName: string) => {
    // Define a simple image viewer component for the popup
    const ImageViewer = () => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={imageSrc} alt={imageName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    );

    // Generate a unique position for this image viewer
    const position = generatePosition();

    // Open a new window with the image viewer component
    // Use a unique appId based on the image name to allow multiple images to be open
    onOpenApp(`imageViewer-${imageName}`, <ImageViewer />, imageName, position);
  };

  return (
    <div className="win95-folder-content">
      {/* Image items */}
      <div className="win95-folder-item" onDoubleClick={() => handleImageDoubleClick('/pug1.png', 'Image1.jpg')}>
        <img 
          src="/images.png" 
          alt="Image 1" 
          className="win95-folder-item-icon" 
        />
        <div className="win95-folder-item-text">Image1.jpg</div>
      </div>
      <div className="win95-folder-item" onDoubleClick={() => handleImageDoubleClick('/pug2.png', 'Image2.jpg')}>
        <img 
          src="/images.png" 
          alt="Image 2" 
          className="win95-folder-item-icon" 
        />
        <div className="win95-folder-item-text">Image2.jpg</div>
      </div>
      <div className="win95-folder-item" onDoubleClick={() => handleImageDoubleClick('/pug3.png', 'Image3.jpg')}>
        <img 
          src="/images.png" 
          alt="Image 3" 
          className="win95-folder-item-icon" 
        />
        <div className="win95-folder-item-text">Image3.jpg</div>
      </div>
      <div className="win95-folder-item" onDoubleClick={() => handleImageDoubleClick('/pug4.png', 'Image4.jpg')}>
        <img 
          src="/images.png" 
          alt="Image 4" 
          className="win95-folder-item-icon" 
        />
        <div className="win95-folder-item-text">Image4.jpg</div>
      </div>
    </div>
  );
};

export default memo(MyDocuments);