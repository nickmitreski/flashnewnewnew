import { useCallback } from 'react';
import useSound from 'use-sound';

interface UseSoundEffectsReturn {
  playMinimize: () => void;
  playMaximize: () => void;
  playStartup: () => void;
  playShutdown: () => void;
  playMenuSound: () => void;
}

/**
 * Custom hook to manage sound effects for the Windows 95 interface
 */
export const useSoundEffects = (): UseSoundEffectsReturn => {
  const [playMinimizeSound] = useSound('/sounds/windows95-minimize.mp3');
  const [playMaximizeSound] = useSound('/sounds/windows95-maximize.mp3');
  const [playStartupSound] = useSound('/sounds/windows95-startup.mp3', { volume: 0.5 });
  const [playShutdownSound] = useSound('/sounds/windows95-shutdown.mp3', { volume: 0.5 });
  const [playMenuClickSound] = useSound('/sounds/windows95-minimize.mp3');

  const playMinimize = useCallback(() => {
    playMinimizeSound();
  }, [playMinimizeSound]);

  const playMaximize = useCallback(() => {
    playMaximizeSound();
  }, [playMaximizeSound]);

  const playStartup = useCallback(() => {
    playStartupSound();
  }, [playStartupSound]);

  const playShutdown = useCallback(() => {
    playShutdownSound();
  }, [playShutdownSound]);

  const playMenuSound = useCallback(() => {
    playMenuClickSound();
  }, [playMenuClickSound]);

  return {
    playMinimize,
    playMaximize,
    playStartup,
    playShutdown,
    playMenuSound
  };
};