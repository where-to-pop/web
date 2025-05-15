import { z } from 'zod';

// ----- ENUM -----

export const RoleEnum = z.enum(['USER', 'ASSISTANT']);
export type Role = z.infer<typeof RoleEnum>;

// ----- SCHEMA -----

export const ChatSchema = z.object({
  id: z.number(),
  userId: z.number(),
  projectId: z.number(),
  isActive: z.boolean(),
  title: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Chat = z.infer<typeof ChatSchema>;

export const MessageSchema = z.object({
  id: z.number(),
  role: RoleEnum,
  content: z.string(),
  createdAt: z.number(),
});
export type Message = z.infer<typeof MessageSchema>;

export const ChatWithMessagesSchema = ChatSchema.extend({
  messages: MessageSchema.array(),
});
export type ChatWithMessages = z.infer<typeof ChatWithMessagesSchema>;

export const CreateMessageResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  projectId: z.number(),
  title: z.string(),
  latestUserMessage: MessageSchema,
  latestAssistantMessage: MessageSchema,
});
export type CreateMessageResponse = z.infer<typeof CreateMessageResponseSchema>;
