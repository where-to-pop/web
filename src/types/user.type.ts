import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string(),
  email: z.string(),
  identifier: z.string(),
  password: z.string(),
  profileImageUrl: z.string().nullable(),
});
export type User = z.infer<typeof UserSchema>;
