import { useState } from 'react';
import Tabs from 'src/components/Tabs';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import { Message } from 'src/types/chat.type';

type ChatTab = 'text' | 'chart';

interface Props {
  message: Message;
}

const AssistantMessage = ({ message }: Props) => {
  const [selected, setSelected] = useState<ChatTab>('text');

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
        />
      </div>
      <div className='py-8'>
        {selected === 'text' ? (
          <TextTab text={message.content} />
        ) : (
          <ChartTab />
        )}
      </div>
    </article>
  );
};

export default AssistantMessage;
