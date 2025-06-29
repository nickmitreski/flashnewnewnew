import React, { useState, useEffect, memo, useCallback } from 'react';
import StartMenu from './StartMenu';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface TaskbarProps {
  openApps: { id: string; name: string; isMinimized: boolean }[];
  onAppClick: (id: string) => void;
  onBack: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ openApps, onAppClick, onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { playStartup } = useSoundEffects();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const toggleStartMenu = useCallback(() => {
    if (!isStartMenuOpen) {
      playStartup();
    }
    setIsStartMenuOpen(!isStartMenuOpen);
  }, [isStartMenuOpen, playStartup]);

  const handleStartButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStartMenu();
  }, [toggleStartMenu]);
  
  return (
    <>
      {isStartMenuOpen && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setIsStartMenuOpen(false)}
        />
      )}
      
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onShutdown={onBack}
      />
      
      <div className="win95-taskbar">
        <button 
          className={`win95-start-button ${isStartMenuOpen ? 'active' : ''}`}
          onClick={handleStartButtonClick}
        >
          <img 
            src="/windows-0.png" 
            alt="Start" 
          />
          Start
        </button>
        
        <div className="win95-taskbar-items">
          {openApps.map(app => (
            <div 
              key={app.id} 
              className={`win95-taskbar-item ${app.isMinimized ? 'active' : ''}`}
              onClick={() => onAppClick(app.id)}
            >
              {isMobile ? app.name.substring(0, 10) + (app.name.length > 10 ? '...' : '') : app.name}
            </div>
          ))}
        </div>
        
        <div className="win95-taskbar-clock">
          {formattedTime}
        </div>
      </div>
    </>
  );
};

export default memo(Taskbar);