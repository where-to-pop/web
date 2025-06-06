import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import LoadingDots from 'src/components/LoadingDots';
import { ExecutionPhase } from 'src/types/chat.type';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  phase?: ExecutionPhase;
  phaseMessage?: string | null | undefined;
}

const LoadingPhase = ({ phase, phaseMessage }: Props) => {
  const [phaseMessages, setPhaseMessages] = useState<string[]>([]);
  const pushPhaseMessage = (message: string | null | undefined) => {
    setPhaseMessages((prev) => {
      const lastMessage = prev.length > 0 ? prev[prev.length - 1] : '';
      if (!message || lastMessage === message) {
        return prev;
      }
      return [...prev, message];
    });
  };

  useEffect(() => {
    if (phase === 'PLANNING' || phase === 'STEP_EXECUTING') {
      pushPhaseMessage(phaseMessage);
    }
  }, [phaseMessage]);

  return (
    <div className='flex flex-col'>
      <AnimatePresence>
        {phaseMessages.map((message, index) => {
          const isFirst = index === 0;
          const isPast = index < phaseMessages.length - 1;
          return (
            <motion.div
              key={message + index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {!isFirst && isPast && <LongLine />}
              {isPast ? (
                <PastLoadingPhase phaseMessage={message} />
              ) : (
                <CurrentLoadingPhase phaseMessage={message} />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LoadingPhase;

const LoadingIcon = () => {
  return (
    <div className='-mx-20 h-40'>
      <DotLottieReact src='/lottie/loading.json' loop autoplay />
    </div>
  );
};

const LongLine = () => {
  return (
    <div className='-my-16 flex w-40 justify-center'>
      <div className='h-[30px] w-[2px] rounded-full bg-grey-300' />
    </div>
  );
};

interface LoadingPhaseProps {
  phaseMessage: string;
}

const PastLoadingPhase = ({ phaseMessage }: LoadingPhaseProps) => {
  return (
    <div className='flex w-full gap-8'>
      <div className='flex h-40 w-40 items-center justify-center'>
        <div className='h-8 w-8 rounded-full bg-grey-300' />
      </div>
      <div className='flex h-40 items-center text-14 font-500 text-grey-400'>
        <span>{phaseMessage}</span>
      </div>
    </div>
  );
};

interface CurrentLoadingPhaseProps {
  phaseMessage: string;
}

const CurrentLoadingPhase = ({ phaseMessage }: CurrentLoadingPhaseProps) => {
  return (
    <div className='flex w-full gap-8'>
      <LoadingIcon />
      <div className='flex h-40 items-center bg-gradient-to-r from-primary-500 to-[#00CCCC] bg-clip-text text-14 font-500 text-transparent'>
        <span>{phaseMessage}</span>
        <LoadingDots />
      </div>
    </div>
  );
};
