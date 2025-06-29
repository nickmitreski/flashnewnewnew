import { useState, useCallback } from 'react';

interface ContextMenuPosition {
  x: number;
  y: number;
}

interface UseContextMenuReturn {
  contextMenu: ContextMenuPosition | null;
  handleContextMenu: (e: React.MouseEvent) => void;
  closeContextMenu: () => void;
}

/**
 * Custom hook to manage context menu state and position
 */
export const useContextMenu = (): UseContextMenuReturn => {
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu if clicking directly on the desktop
    if (e.target === e.currentTarget) {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  return {
    contextMenu,
    handleContextMenu,
    closeContextMenu
  };
};