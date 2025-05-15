import { UserSchema } from 'src/types/user.type';
import { instance } from './config/instance';
import { useQuery } from '@tanstack/react-query';

export const getUser = async () => {
  const user = await instance.get('/user', {
    schema: UserSchema,
  });
  return user;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};
