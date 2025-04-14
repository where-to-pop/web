import Bubble from './Bubble';
import { Message } from './SearchTab';
import { useEffect, useRef } from 'react';

interface Props {
  messages: Message[];
}

const Chat = ({ messages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    messages.length > 0 && (
      <section
        ref={scrollRef}
        className='flex max-h-[70dvh] w-full flex-col gap-16 overflow-y-auto rounded-6 border border-grey-400 bg-white/90 px-16 py-20 shadow-lg'
      >
        <Bubble align='right'>
          20대를 타켓으로 하는 팝업스토어를 개설하고 싶어
        </Bubble>
        <Bubble align='left'>다음 건물들을 추천드려요!</Bubble>
        {messages.map((message) => (
          <Bubble key={message.id} align={message.align}>
            {message.content}
          </Bubble>
        ))}
      </section>
    )
  );
};

export default Chat;
