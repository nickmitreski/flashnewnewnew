import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Custom hook to get window dimensions and device type
 * @param mobileBreakpoint - Breakpoint for mobile devices (default: 768)
 * @param tabletBreakpoint - Breakpoint for tablet devices (default: 1024)
 * @returns Window dimensions and device type flags
 */
export const useWindowDimensions = (
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024
): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= mobileBreakpoint,
    isTablet: window.innerWidth > mobileBreakpoint && window.innerWidth <= tabletBreakpoint,
    isDesktop: window.innerWidth > tabletBreakpoint
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowDimensions({
        width,
        height,
        isMobile: width <= mobileBreakpoint,
        isTablet: width > mobileBreakpoint && width <= tabletBreakpoint,
        isDesktop: width > tabletBreakpoint
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return windowDimensions;
};