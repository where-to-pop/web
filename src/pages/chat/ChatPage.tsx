import {
  useGetChat,
  useGetChats,
  usePostMessage,
} from 'src/services/chat.service';
import Input from './components/Input';
import NavBar from './components/NavBar';
import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import Header from './components/Header';
import { toast } from 'react-toastify';

const ChatPage = () => {
  const { projectId, chatId } = useParams();

  const { data: chats } = useGetChats();
  const chatsOfProject = useMemo(
    () => chats?.filter((chat) => chat.projectId === projectId) ?? [],
    [chats, projectId],
  );

  const { data: chat } = useGetChat(chatId ?? '');
  const messages = chat?.messages ?? [];

  const { mutateAsync: postMessage, isPending: isPosting } = usePostMessage();

  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    try {
      await postMessage({
        chatId: chatId ?? '',
        body: { message: value },
      });
      scrollToBottom();
      setValue('');
    } catch (error) {
      console.error(error);
      toast.error('메시지 전송에 실패했습니다.');
    }
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
      <NavBar projectId={projectId ?? ''} chats={chatsOfProject} />
      <main className='relative flex flex-1 flex-col'>
        <Header projectId={projectId ?? ''} />
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
        <Input
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          disabled={isPosting}
        />
      </main>
    </div>
  );
};

export default ChatPage;
