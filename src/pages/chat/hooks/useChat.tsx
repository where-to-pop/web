import { useEffect, useRef, useState } from 'react';
import useScroll from './useScroll';
import { useGetChat, usePostMessage } from 'src/services/chat.service';
import { ChatStream, ExecutionPhase, Message } from 'src/types/chat.type';
import { BASE_URL } from 'src/services/config/instance';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast } from 'react-toastify';
import useInputFocus from './useInputFocus';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface Props {
  chatId: string;
}

const TEMP_USER_MESSAGE_ID = 'TEMP_USER_MESSAGE_ID';
const TEMP_ASSISTANT_MESSAGE_ID = 'TEMP_ASSISTANT_MESSAGE_ID';

const useChat = ({ chatId }: Props) => {
  const { ref: messagesContainerRef, scrollToBottom } = useScroll();
  const { ref: inputRef, setFocusToInput } = useInputFocus();

  const queryClient = useQueryClient();
  const { data: chat } = useGetChat(chatId ?? '');
  const { mutateAsync: postMessage } = usePostMessage();

  const isInitialized = useRef(false);

  // 리턴하는 메시지 관리
  const [messages, setMessages] = useState<Message[]>([]);
  const pushMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };
  const updateLastMessageContent = (content: string) => {
    setMessages((prev) => {
      const prevMessages = prev.slice(0, -1);
      const lastMessage = prev[prev.length - 1];
      const newLastMessageContent = lastMessage.content + content;
      return [
        ...prevMessages,
        { ...lastMessage, content: newLastMessageContent },
      ];
    });
  };

  // 새로운 메시지 submit 관리
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    pushMessage({
      id: TEMP_USER_MESSAGE_ID,
      role: 'USER',
      content: value,
      createdAt: dayjs().toISOString(),
    });
    pushMessage({
      id: TEMP_ASSISTANT_MESSAGE_ID,
      role: 'ASSISTANT',
      content: '',
      createdAt: dayjs().toISOString(),
    });
    setPhase('PLANNING');
    setPhaseMessage('요구사항을 분석하고 있어요');
    scrollToBottom('smooth');

    try {
      await postMessage({
        chatId: chatId ?? '',
        body: { message: value },
      });
      setValue('');
      handleFetchSSE();
    } catch (error) {
      console.error('메시지 전송 실패: ', error);
      toast.error('메시지 전송에 실패했습니다.');
    }
  };

  // SSE 연결 관리
  const [phase, setPhase] = useState<ExecutionPhase | null>(null);
  const [phaseMessage, setPhaseMessage] = useState<string | null>(null);

  const syncMessages = () => {
    queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
  };
  useEffect(() => {
    if (!chat || isLoading) {
      return;
    }
    setMessages(chat.messages);
    if (!isInitialized.current) {
      isInitialized.current = true;
      scrollToBottom('instant');
    }
  }, [chat, chatId]);

  const handleSSEClose = (eventSource: EventSource) => {
    eventSource.close();
    setPhase(null);
    setPhaseMessage(null);
    setIsLoading(false);
    setFocusToInput();
    syncMessages();
  };

  const handleFetchSSE = () => {
    const url = BASE_URL + `/v1/chats/${chatId}/stream`;
    const eventSource = new EventSourcePolyfill(url, {
      withCredentials: true,
    });

    // 연결 생성 시 응답 빈 응답 메시지 추가
    eventSource.onopen = () => {
      setIsLoading(true);
      console.log('연결 생성 완료');
    };

    // 메시지 수신 시 메시지 업데이트
    eventSource.onmessage = async (e) => {
      const res = await e.data;
      const chatStream = JSON.parse(res) as ChatStream;
      const newPhase = chatStream.status.phase;
      console.log('커넥션: ', chatStream);
      setPhase(newPhase);
      setPhaseMessage(chatStream.status.message);

      if (newPhase === 'COMPLETED') {
        handleSSEClose(eventSource);
      } else if (newPhase === 'FAILED') {
        handleSSEClose(eventSource);
        console.error('채팅 응답 생성 실행 실패', chatStream);
        toast.error('잠시 후 다시 시도해주세요.');
      } else if (newPhase === 'AGGREGATING') {
        const content = chatStream.finalResult;
        if (!content) {
          return;
        }
        updateLastMessageContent(content);
      }

      scrollToBottom('smooth');
    };

    // 에러 발생 시 연결 종료
    eventSource.onerror = (e: any) => {
      handleSSEClose(eventSource);
      console.error('SSE 연결 에러', e);
      toast.error('잠시 후 다시 시도해주세요.');
    };
  };

  return {
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
  };
};

export default useChat;
