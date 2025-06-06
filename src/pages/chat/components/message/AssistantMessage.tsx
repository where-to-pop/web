import { useState, useEffect } from 'react';
import Tabs from 'src/components/Tabs';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import { ExecutionPhase, Message } from 'src/types/chat.type';

type ChatTab = 'text' | 'chart';

interface Props {
  message: Message;
  phase: ExecutionPhase | null;
  phaseMessage: string | null;
}

const AssistantMessage = ({ message, phase, phaseMessage }: Props) => {
  const [selected, setSelected] = useState<ChatTab>('text');

  const isGenerating =
    phase === 'PLANNING' ||
    phase === 'STEP_EXECUTING' ||
    phase === 'STEP_COMPLETED' ||
    phase === 'STEP_FAILED';

  return (
    <article className='mb-48 flex flex-col gap-8 border-b border-grey-200 pb-24'>
      <div className='w-300'>
        <Tabs
          items={[
            { label: '답변', value: 'text' },
            { label: '차트', value: 'chart' },
          ]}
          selected={selected}
          onSelect={setSelected}
          disabled={isGenerating}
        />
      </div>
      <div className='w-full py-8'>
        {!isGenerating &&
          (selected === 'text' ? (
            <TextTab text={message.content} />
          ) : (
            <ChartTab />
          ))}
        {isGenerating && (
          <div className='px-12'>
            {/* <p className='text-14 font-400'>{phase}</p> */}
            <p className='flex text-14 font-500 text-grey-600'>
              {phaseMessage}
              <div>
                <LoadingDots />
              </div>
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

const LoadingDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className='inline-block min-w-[24px] text-grey-600'>{dots}</span>
  );
};

export default AssistantMessage;
