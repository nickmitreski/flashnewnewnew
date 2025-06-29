import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppData } from '../data/appData';

interface DynamicApp {
  content: React.ReactNode;
  title: string;
  position?: { x: number; y: number };
}

interface AppState {
  openApps: string[];
  minimizedApps: string[];
  dynamicApps: Record<string, DynamicApp>;
  appData: AppData;
}

interface AppActions {
  openApp: (
    appId: string, 
    content?: React.ReactNode, 
    title?: string, 
    position?: { x: number; y: number }
  ) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
  setAppData: (appData: AppData) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set, get) => ({
      openApps: [],
      minimizedApps: [],
      dynamicApps: {},
      appData: {},

      openApp: (appId, content, title, position) => set((state) => {
        // If it's a dynamic app (content and title provided)
        if (content !== undefined && title !== undefined) {
          // Add to dynamic apps
          const newDynamicApps = {
            ...state.dynamicApps,
            [appId]: { content, title, position }
          };

          // Add to open apps if not already open
          const newOpenApps = state.openApps.includes(appId)
            ? state.openApps
            : [...state.openApps, appId];

          // Remove from minimized apps if it was minimized
          const newMinimizedApps = state.minimizedApps.filter(id => id !== appId);

          return {
            dynamicApps: newDynamicApps,
            openApps: newOpenApps,
            minimizedApps: newMinimizedApps
          };
        }
        // If it's a predefined app
        else if (state.appData[appId]) {
          // Add to open apps if not already open
          const newOpenApps = state.openApps.includes(appId)
            ? state.openApps
            : [...state.openApps, appId];

          // Remove from minimized apps if it was minimized
          const newMinimizedApps = state.minimizedApps.filter(id => id !== appId);

          // Store position override if provided
          const newDynamicApps = { ...state.dynamicApps };
          if (position) {
            newDynamicApps[appId] = {
              ...newDynamicApps[appId] || {},
              position
            };
          }

          return {
            openApps: newOpenApps,
            minimizedApps: newMinimizedApps,
            dynamicApps: newDynamicApps
          };
        }

        return state;
      }),

      closeApp: (appId) => set((state) => {
        // Remove from open apps
        const newOpenApps = state.openApps.filter(id => id !== appId);
        
        // Remove from minimized apps
        const newMinimizedApps = state.minimizedApps.filter(id => id !== appId);
        
        // Remove from dynamic apps if it exists
        const newDynamicApps = { ...state.dynamicApps };
        if (newDynamicApps[appId]) {
          delete newDynamicApps[appId];
        }
        
        return {
          openApps: newOpenApps,
          minimizedApps: newMinimizedApps,
          dynamicApps: newDynamicApps
        };
      }),

      minimizeApp: (appId) => set((state) => {
        // Add to minimized apps if not already minimized
        if (!state.minimizedApps.includes(appId)) {
          return {
            minimizedApps: [...state.minimizedApps, appId]
          };
        }
        return state;
      }),

      restoreApp: (appId) => set((state) => {
        // Remove from minimized apps
        return {
          minimizedApps: state.minimizedApps.filter(id => id !== appId)
        };
      }),

      setAppData: (appData) => set({ appData })
    }),
    { name: 'app-store' }
  )
);