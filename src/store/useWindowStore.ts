import { create } from 'zustand';

interface WindowState {
  zIndexes: Record<string, number>;
  activeWindowId: string | null;
}

interface WindowActions {
  bringToFront: (id: string) => void;
  setAlwaysOnTop: (id: string, isAlwaysOnTop: boolean) => void;
}

export const useWindowStore = create<WindowState & WindowActions>((set) => ({
  zIndexes: {},
  activeWindowId: null,

  bringToFront: (id) => set((state) => {
    const maxZIndex = Math.max(100, ...Object.values(state.zIndexes));
    const newHighest = maxZIndex + 1;
    return {
      activeWindowId: id,
      zIndexes: {
        ...state.zIndexes,
        [id]: newHighest
      }
    };
  }),

  setAlwaysOnTop: (id, isAlwaysOnTop) => set((state) => {
    // If setting to always on top, also bring to front
    if (isAlwaysOnTop) {
      const maxZIndex = Math.max(100, ...Object.values(state.zIndexes));
      const newHighest = maxZIndex + 1;
      return {
        activeWindowId: id,
        zIndexes: {
          ...state.zIndexes,
          [id]: newHighest
        }
      };
    }
    return state;
  })
}));