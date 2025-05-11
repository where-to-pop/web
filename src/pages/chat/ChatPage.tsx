import Input from './components/Input';
import NavBar from './components/NavBar';
import ChatItem from './components/chat-item/ChatItem';
import { useRef, useState } from 'react';

export interface Chat {
  id: number;
  question: string;
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [value, setValue] = useState('');
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setChats([...chats, { id: chats.length + 1, question: value }]);
    setValue('');
    setTimeout(() => {
      if (chatListRef.current) {
        chatListRef.current.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  const isChatEmpty = chats.length === 0;

  return (
    <div className='flex h-full w-full'>
      <NavBar />
      <main className='relative flex flex-1 flex-col'>
        <section className='flex h-48 w-full shrink-0 items-center border-b border-grey-200 px-24'>
          <h1 className='text-primary-500 text-18 font-600'>WHERE TO POP</h1>
        </section>
        <section
          ref={chatListRef}
          className='relative flex-1 overflow-y-auto pb-200 pt-24'
        >
          {isChatEmpty && (
            <h2 className='from-primary-500 absolute left-1/2 top-[35%] -translate-x-1/2 bg-gradient-to-r to-[#00CCCC] bg-clip-text text-24 font-500 text-transparent'>
              NIKE 팝업스토어를 어디에 개설할까요?
            </h2>
          )}
          <ul className='mx-auto flex max-w-900 flex-col gap-48'>
            {chats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </ul>
        </section>
        <Input value={value} onChange={setValue} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default ChatPage;
