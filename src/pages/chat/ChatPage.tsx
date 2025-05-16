import { useGetChat, usePostMessage } from 'src/services/chat.service';
import Input from './components/Input';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import { toast } from 'react-toastify';

const ChatPage = () => {
  const { chatId } = useParams();

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
    <>
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
    </>
  );
};

export default ChatPage;
