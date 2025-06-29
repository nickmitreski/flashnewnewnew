import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SoundState {
  isMuted: boolean;
  volume: number;
  soundEffectsEnabled: boolean;
  musicEnabled: boolean;
}

interface SoundActions {
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  toggleSoundEffects: () => void;
  toggleMusic: () => void;
}

export const useSoundStore = create<SoundState & SoundActions>()(
  devtools(
    (set) => ({
      isMuted: false,
      volume: 0.5,
      soundEffectsEnabled: true,
      musicEnabled: true,

      toggleMute: () => set((state) => ({
        isMuted: !state.isMuted
      })),

      setVolume: (volume) => set({
        volume: Math.max(0, Math.min(1, volume))
      }),

      toggleSoundEffects: () => set((state) => ({
        soundEffectsEnabled: !state.soundEffectsEnabled
      })),

      toggleMusic: () => set((state) => ({
        musicEnabled: !state.musicEnabled
      }))
    }),
    { name: 'sound-store' }
  )
);