import { useEffect, useRef, RefObject } from 'react';

interface UseClickOutsideOptions {
  disabled?: boolean;
  events?: ('mousedown' | 'touchstart' | 'click')[];
  ignoreSelectors?: string[];
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: (event: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideOptions = {}
): RefObject<T> => {
  const {
    disabled = false,
    events = ['mousedown', 'touchstart'],
    ignoreSelectors = []
  } = options;
  
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      const target = event.target as HTMLElement;
      const isIgnored = ignoreSelectors.some(selector => 
        target.closest(selector)
      );

      if (isIgnored) return;

      if (!ref.current.contains(target)) {
        callback(event);
      }
    };

    events.forEach(eventName => {
      document.addEventListener(eventName, handleClick);
    });

    return () => {
      events.forEach(eventName => {
        document.removeEventListener(eventName, handleClick);
      });
    };
  }, [callback, disabled, events, ignoreSelectors]);

  return ref;
};