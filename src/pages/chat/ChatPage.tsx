import { useGetChat, usePostMessage } from 'src/services/chat.service';
import Input from './components/Input';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import { toast } from 'react-toastify';
import { Message } from 'src/types/chat.type';

const ChatPage = () => {
  const { chatId } = useParams();

  const { data: chat } = useGetChat(chatId ?? '');
  const { mutateAsync: postMessage } = usePostMessage();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chat) {
      return;
    }
    setMessages(chat.messages);
    scrollToBottom();
  }, [chat, chatId]);

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        id: '',
        role: 'USER',
        content: value,
        createdAt: new Date().toISOString(),
      },
    ]);

    try {
      const newMessage = await postMessage({
        chatId: chatId ?? '',
        body: { message: value },
      });
      setMessages((prev) => {
        const prevMessages = prev.slice(0, -1);
        return [
          ...prevMessages,
          newMessage.latestUserMessage,
          newMessage.latestAssistantMessage,
        ];
      });

      scrollToBottom();
      setValue('');
    } catch (error) {
      console.error(error);
      toast.error('메시지 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
      setFocusToInput();
    }
  };

  const messagesContainer = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    setTimeout(() => {
      if (!messagesContainer.current) {
        return;
      }
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const setFocusToInput = () => {
    setTimeout(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.focus();
    }, 0);
  };

  return (
    <>
      <section
        ref={messagesContainer}
        className='scrollbar-hide relative flex-1 overflow-y-auto pb-200 pt-24'
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
        disabled={isLoading}
      />
    </>
  );
};

export default ChatPage;
