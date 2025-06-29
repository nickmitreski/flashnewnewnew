import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TutorialStep {
  message: string;
  position: { x: number; y: number };
}

interface TutorialState {
  steps: TutorialStep[];
  currentStep: number;
  isCompleted: boolean;
}

interface TutorialActions {
  nextStep: () => void;
  resetTutorial: () => void;
  skipTutorial: () => void;
  setSteps: (steps: TutorialStep[]) => void;
}

export const useTutorialStore = create<TutorialState & TutorialActions>()(
  devtools(
    (set) => ({
      steps: [
        {
          message: "Welcome to 1996! This is a Windows 95 desktop experience.",
          position: { x: 200, y: 200 }
        },
        {
          message: "Feel free to explore the site! Double-click on icons to open them and have some fun.",
          position: { x: 250, y: 250 }
        },
        {
          message: "The Flash Forward folder contains our digital agency services. Take a look inside. Click on 'Update' if you want to update the website to a 2025 one!",
          position: { x: 300, y: 300 }
        }
      ],
      currentStep: 0,
      isCompleted: false,

      nextStep: () => set((state) => {
        const nextStep = state.currentStep + 1;
        const isCompleted = nextStep >= state.steps.length;
        
        return {
          currentStep: isCompleted ? state.currentStep : nextStep,
          isCompleted
        };
      }),

      resetTutorial: () => set({
        currentStep: 0,
        isCompleted: false
      }),

      skipTutorial: () => set({
        isCompleted: true
      }),

      setSteps: (steps) => set({
        steps,
        currentStep: 0,
        isCompleted: false
      })
    }),
    { name: 'tutorial-store' }
  )
);