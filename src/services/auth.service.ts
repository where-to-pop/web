import { Token, TokenSchema } from 'src/types/auth.type';
import axios from 'axios';
import { instance } from './config/instance';
import { useMutation } from '@tanstack/react-query';

interface PostLoginBody {
  email: string;
  password: string;
}

export const postLogin = async (body: PostLoginBody) => {
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
