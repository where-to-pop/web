import { UserSchema } from 'src/types/user.type';
import { instance } from './config/instance';

export const getUser = async () => {
  const user = await instance.get('/user', {
    schema: UserSchema,
  });
  return user;
};
