import { useRef } from 'react';

const useScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: 'instant' | 'smooth' = 'instant') => {
    setTimeout(() => {
      if (!ref.current) {
        return;
      }
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior,
      });
    }, 0);
  };

  return { ref, scrollToBottom };
};

export default useScroll;
