import { useCallback } from 'react';

/**
 * Custom hook to generate window positions with random offsets
 * to prevent windows from stacking exactly on top of each other
 * 
 * @param baseX - Base X position for the window
 * @param baseY - Base Y position for the window
 * @param varianceX - Maximum X position variance
 * @param varianceY - Maximum Y position variance
 * @returns Function that generates a position with random offset
 */
export const useWindowPosition = (
  baseX: number = 100,
  baseY: number = 100,
  varianceX: number = 50,
  varianceY: number = 50
) => {
  const generatePosition = useCallback(() => {
    // Generate random offsets within the variance range
    const offsetX = Math.floor(Math.random() * varianceX * 2) - varianceX;
    const offsetY = Math.floor(Math.random() * varianceY * 2) - varianceY;
    
    // Calculate final position with offsets
    const x = Math.max(10, baseX + offsetX);
    const y = Math.max(10, baseY + offsetY);
    
    return { x, y };
  }, [baseX, baseY, varianceX, varianceY]);

  return generatePosition;
};