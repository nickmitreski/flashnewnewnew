import { useState, useCallback } from 'react';
import { AppData } from '../data/appData';

interface UseAppManagerProps {
  initialAppData: AppData;
}

interface UseAppManagerReturn {
  openApps: string[];
  minimizedApps: string[];
  handleOpenApp: (appId: string, content?: React.ReactNode, title?: string, positionOverride?: { x: number; y: number }) => void;
  handleCloseApp: (appId: string) => void;
  handleMinimizeApp: (appId: string) => void;
  dynamicApps: { [key: string]: { content: React.ReactNode, title: string, position?: { x: number; y: number } } };
}

/**
 * Custom hook to manage app state (open, minimized, dynamic apps)
 */
export const useAppManager = ({ initialAppData }: UseAppManagerProps): UseAppManagerReturn => {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
  const [dynamicApps, setDynamicApps] = useState<{ [key: string]: { content: React.ReactNode, title: string, position?: { x: number; y: number } } }>({});

  const handleOpenApp = useCallback((appId: string, content?: React.ReactNode, title?: string, positionOverride?: { x: number; y: number }) => {
    if (content !== undefined && title !== undefined) {
      // Handle dynamic apps (like iframe games opened by GenericFolder)
      setDynamicApps(prev => ({ ...prev, [appId]: { content, title, position: positionOverride } }));
      if (!openApps.includes(appId)) {
        setOpenApps(prev => [...prev, appId]);
      }
      if (minimizedApps.includes(appId)) {
        setMinimizedApps(prev => prev.filter(id => id !== appId));
      }
    } else if (initialAppData[appId]) {
      // Handle predefined apps from appData
      if (!openApps.includes(appId)) {
        setOpenApps(prev => [...prev, appId]);
      }
      if (minimizedApps.includes(appId)) {
        setMinimizedApps(prev => prev.filter(id => id !== appId));
      }
      // Store positionOverride for predefined apps as well
      if (positionOverride) {
        setDynamicApps(prev => ({ ...prev, [appId]: { ...prev[appId], position: positionOverride } }));
      }
    } else {
      console.error(`Data for app ${appId} not found.`);
    }
  }, [openApps, minimizedApps, initialAppData]);

  const handleCloseApp = useCallback((appId: string) => {
    setOpenApps(prev => prev.filter(id => id !== appId));
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    // Remove dynamic app data when closed
    if (dynamicApps[appId]) {
      setDynamicApps(prev => {
        const newDynamicApps = { ...prev };
        delete newDynamicApps[appId];
        return newDynamicApps;
      });
    }
  }, [dynamicApps]);

  const handleMinimizeApp = useCallback((appId: string) => {
    if (!minimizedApps.includes(appId)) {
      setMinimizedApps(prev => [...prev, appId]);
    }
  }, [minimizedApps]);

  return {
    openApps,
    minimizedApps,
    handleOpenApp,
    handleCloseApp,
    handleMinimizeApp,
    dynamicApps
  };
};