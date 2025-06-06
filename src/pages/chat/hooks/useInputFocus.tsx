import { useRef } from 'react';

const useInputFocus = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const setFocusToInput = () => {
    setTimeout(() => {
      if (!ref.current) {
        return;
      }
      ref.current.focus();
    }, 0);
  };
  return { ref, setFocusToInput };
};

export default useInputFocus;
