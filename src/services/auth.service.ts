import { Token } from 'src/types/auth.type';
import axios from 'axios';

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
