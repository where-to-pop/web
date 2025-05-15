import { z } from 'zod';

export const TokenSchema = z.object({
  accessToken: z.string(),
  accessTokenExpiresAt: z.number(),
  refreshTokenExpiresAt: z.number(),
});
export type Token = z.infer<typeof TokenSchema>;
