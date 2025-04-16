import { useState, useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  excludeRef?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the event has a target
      if (!event.target) return;

      // Check if the click was outside the main ref
      const clickedOutsideMainRef = ref.current && !ref.current.contains(event.target as Node);

      // Check if the click was outside the exclude ref (if provided)
      const clickedOutsideExcludeRef = !excludeRef?.current ||
        !excludeRef.current.contains(event.target as Node);

      // If clicked outside both refs, call the callback
      if (clickedOutsideMainRef && clickedOutsideExcludeRef) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, excludeRef]);
};

export const useTransitionState = (
  isVisible: boolean,
  hideDelay: number = 300
): boolean => {
  const [showElement, setShowElement] = useState(isVisible);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible) {
      setShowElement(true);
    } else {
      timer = setTimeout(() => {
        setShowElement(false);
      }, hideDelay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, hideDelay]);

  return showElement;
};
