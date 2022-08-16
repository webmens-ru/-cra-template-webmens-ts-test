import { useRef, useEffect, RefObject } from 'react';

export const useWindowBound = (
  duration: string = '10px',
  propsRef?: RefObject<HTMLDivElement>
) => {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = propsRef || defaultRef;

  useEffect(() => {
    if (ref && ref.current) {
      const { top, right, bottom, left } = ref.current.getBoundingClientRect();

      if (top < 0) {
        ref.current.style.bottom = 'auto'
        ref.current.style.top = duration;
      }
      if (right > window.innerWidth) {
        ref.current.style.left = 'auto'
        ref.current.style.right = duration;
      }
      if (bottom > window.innerHeight) {
        ref.current.style.top = '-' + (bottom - window.innerHeight + 10) + 'px'
      }
      if (left < 0) {
        ref.current.style.right = 'auto'
        ref.current.style.left = duration;
      }
    }
  }, [duration, ref]);

  return { ref };
};
