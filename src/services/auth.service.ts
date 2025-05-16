import { Token, TokenSchema } from 'src/types/auth.type';
import axios from 'axios';
import { instance } from './config/instance';
import { useMutation } from '@tanstack/react-query';

// ----- POST -----

export const postLogin = async (body: { email: string; password: string }) => {
  const res = await instance.post('/v1/auth/login', body, {
    schema: TokenSchema,
  });
  return res;
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};

export const postRefreshToken = async () => {
  const res = await axios.post<Token>('/auth/refresh', undefined, {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      baseURL: import.meta.env.VITE_BASE_URL,
    },
  });
  return res;
};

export const deleteLogout = async () => {
  await instance.delete('/v1/auth/logout', undefined);
};
