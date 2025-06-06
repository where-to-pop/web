import { useEffect, useState } from 'react';

const LoadingDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className='inline-block min-w-[24px] text-[#00CCCC]'>{dots}</span>
  );
};

export default LoadingDots;
