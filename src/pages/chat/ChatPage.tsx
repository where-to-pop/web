import Input from './components/Input';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import useChat from './hooks/useChat';
import { useEffect } from 'react';
// import ReportTab from './components/ReportTab';

const ChatPage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('isNew') === 'true';

  const removeIsNew = () => {
    navigate('.');
  };

  const {
    messagesContainerRef,
    inputRef,
    messages,
    value,
    setValue,
    isLoading,
    handleSubmit,
    handleFetchSSE,
    phase,
    phaseMessage,
  } = useChat({ chatId: chatId ?? '' });

  useEffect(() => {
    if (isNew && messages.length !== 0) {
      handleFetchSSE();
      removeIsNew();
    }
  }, [isNew, messages.length]);

  return (
    <>
      <section
        ref={messagesContainerRef}
        className='relative flex-1 overflow-y-auto pb-140 pt-24 scrollbar-hide'
      >
        <ul className='mx-auto max-w-900 px-16'>
          {messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            return message.role === 'USER' ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                phase={isLastMessage ? phase : null}
                phaseMessage={isLastMessage ? phaseMessage : null}
              />
            );
          })}
        </ul>
      </section>
      <Input
        ref={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
      {/* <ReportTab /> */}
    </>
  );
};

export default ChatPage;
