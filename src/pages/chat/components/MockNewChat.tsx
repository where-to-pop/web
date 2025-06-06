import dayjs from 'dayjs';
import UserMessage from './message/UserMessage';
import Tabs from 'src/components/Tabs';
import { useState } from 'react';
import LoadingPhase from './message/LoadingPhase';

interface Props {
  content: string;
}

const MockNewChat = ({ content }: Props) => {
  const message = {
    id: 'mock-new-chat',
    role: 'USER',
    content,
    createdAt: dayjs().toISOString(),
  } as const;

  const [selected, setSelected] = useState<'text' | 'chart'>('text');

  return (
    <ul className='mx-auto max-w-900 px-16'>
      <UserMessage message={message} />
      <article className='mb-48 flex flex-col gap-8 border-b border-grey-200 pb-24'>
        <div className='w-300'>
          <Tabs
            items={[
              { label: '답변', value: 'text' },
              { label: '차트', value: 'chart' },
            ]}
            selected={selected}
            onSelect={setSelected}
            disabled={true}
          />
        </div>
        <div className='w-full py-8'>
          <LoadingPhase
            phase={'PLANNING'}
            phaseMessage='요구사항을 분석하고 있어요'
          />
        </div>
      </article>
    </ul>
  );
};

export default MockNewChat;
