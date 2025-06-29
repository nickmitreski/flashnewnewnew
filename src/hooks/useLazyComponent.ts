import { useState, useEffect } from 'react';

/**
 * Custom hook for lazy loading components
 * @param factory - Factory function that returns a promise resolving to a component
 * @param delay - Optional delay before loading the component (in ms)
 * @returns The loaded component or null while loading
 */
export function useLazyComponent<T>(
  factory: () => Promise<{ default: React.ComponentType<T> }>,
  delay: number = 0
): React.ComponentType<T> | null {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout | null = null;

    const loadComponent = async () => {
      try {
        const module = await factory();
        if (isMounted) {
          setComponent(() => module.default);
        }
      } catch (error) {
        console.error('Error loading component:', error);
      }
    };

    if (delay > 0) {
      timeout = setTimeout(loadComponent, delay);
    } else {
      loadComponent();
    }

    return () => {
      isMounted = false;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [factory, delay]);

  return Component;
}