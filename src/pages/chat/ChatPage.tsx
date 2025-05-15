import { useGetChat, useGetChats } from 'src/services/chat.service';
import Input from './components/Input';
import NavBar from './components/NavBar';
import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import Header from './components/Header';

const ChatPage = () => {
  const { projectId, chatId } = useParams();

  const { data: chats } = useGetChats();
  const chatsOfProject = useMemo(
    () => chats?.filter((chat) => chat.projectId === Number(projectId)) ?? [],
    [chats, projectId],
  );

  const { data: chat } = useGetChat(Number(chatId));
  const messages = chat?.messages ?? [];

  const [value, setValue] = useState('');

  const handleSubmit = () => {
    scrollToBottom();
  };

  const messagesContainer = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainer.current) {
        messagesContainer.current.scrollTo({
          top: messagesContainer.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  return (
    <div className='flex h-full w-full'>
      <NavBar chats={chatsOfProject} />
      <main className='relative flex flex-1 flex-col'>
        <Header projectId={Number(projectId)} />
        <section
          ref={messagesContainer}
          className='relative flex-1 overflow-y-auto pb-200 pt-24'
        >
          <ul className='mx-auto max-w-900'>
            {messages.map((message) =>
              message.role === 'USER' ? (
                <UserMessage key={message.id} message={message} />
              ) : (
                <AssistantMessage key={message.id} message={message} />
              ),
            )}
          </ul>
        </section>
        <Input value={value} onChange={setValue} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default ChatPage;
