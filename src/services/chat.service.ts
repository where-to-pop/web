import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from './config/instance';
import {
  ChatSchema,
  ChatWithMessagesSchema,
  CreateMessageResponseSchema,
} from 'src/types/chat.type';

// ----- GET -----

// NOTE: 프로젝트별로 채팅방을 가져오는 api가 필요하지 않을까?
export const getChats = async () => {
  const res = await instance.get('/v1/chats', {
    schema: ChatSchema.array(),
  });
  return res;
};

export const useGetChats = () => {
  return useQuery({
    queryKey: ['chat'],
    queryFn: getChats,
  });
};

export const getChat = async (chatId: number) => {
  const res = await instance.get(`/v1/chats/${chatId}`, {
    schema: ChatWithMessagesSchema,
  });
  return res;
};

export const useGetChat = (chatId: number) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChat(chatId),
  });
};

// ----- POST -----

export const postChat = async (body: {
  projectId: number;
  initialMessage: string;
}) => {
  const res = await instance.post('/v1/chats', body, {
    schema: ChatWithMessagesSchema,
  });
  return res;
};

export const usePostChat = () => {
  return useMutation({
    mutationFn: (body: { projectId: number; initialMessage: string }) =>
      postChat(body),
  });
};

export const postMessage = async (
  chatId: number,
  body: {
    message: string;
  },
) => {
  const res = await instance.post(`/v1/chats/${chatId}/messages`, body, {
    schema: CreateMessageResponseSchema,
  });
  return res;
};

export const usePostMessage = () => {
  return useMutation({
    mutationFn: ({
      chatId,
      body,
    }: {
      chatId: number;
      body: { message: string };
    }) => postMessage(chatId, body),
  });
};
