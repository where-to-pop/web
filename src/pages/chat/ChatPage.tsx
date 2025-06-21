import Input from './components/Input';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import useChat from './hooks/useChat';
import { useEffect } from 'react';
import Tabs from 'src/components/Tabs';
import LoadingPhase from './components/message/LoadingPhase';
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

  const isError =
    !isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1].role === 'USER';
  const showLoading = messages.length === 1;

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
          {showLoading && <LoadingAssistantMessage />}
          {isError && <ErrorAssistantMessage />}
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

const LoadingAssistantMessage = () => {
  return (
    <article className='mb-48 flex flex-col gap-8 border-b border-grey-200 pb-24'>
      <div className='w-300'>
        <Tabs
          items={[
            { label: '답변', value: 'text' },
            { label: '출처', value: 'source' },
          ]}
          selected={'text'}
          disabled={true}
        />
      </div>
      <div className='w-full py-8'>
        <LoadingPhase
          phase={'PLANNING'}
          phaseMessage='요구사항을 분석하고 있어요'
          isAnimationEnabled={false}
        />
      </div>
    </article>
  );
};

const ErrorAssistantMessage = () => {
  return (
    <article className='mb-48 flex flex-col gap-8 border-b border-grey-200 pb-24'>
      <div className='w-300'>
        <Tabs
          items={[
            { label: '답변', value: 'text' },
            { label: '출처', value: 'source' },
          ]}
          selected={'text'}
          disabled={true}
        />
      </div>
      <div className='w-full py-8 text-red'>
        답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    </article>
  );
};
