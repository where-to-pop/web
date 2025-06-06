import { z } from 'zod';

// ----- ENUM -----

export const RoleEnum = z.enum(['USER', 'ASSISTANT']);
export type Role = z.infer<typeof RoleEnum>;

export const ExecutionPhaseEnum = z.enum([
  'PLANNING', // 실행 계획 생성 중
  'STEP_EXECUTING', // 개별 단계 실행 중
  'STEP_COMPLETED', // 개별 단계 완료
  'STEP_FAILED', // 개별 단계 실패
  'AGGREGATING', // 결과 통합 중
  'COMPLETED', // 전체 실행 완료
  'FAILED', // 전체 실행 실패
]);
export type ExecutionPhase = z.infer<typeof ExecutionPhaseEnum>;

// ----- SCHEMA -----

export const ChatSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  isActive: z.boolean(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Chat = z.infer<typeof ChatSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  role: RoleEnum,
  content: z.string(),
  createdAt: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export const ChatWithMessagesSchema = ChatSchema.extend({
  messages: MessageSchema.array(),
});
export type ChatWithMessages = z.infer<typeof ChatWithMessagesSchema>;

export const CreateMessageResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  title: z.string(),
  latestUserMessage: MessageSchema,
  latestAssistantMessage: MessageSchema,
});
export type CreateMessageResponse = z.infer<typeof CreateMessageResponseSchema>;

export const ChatStreamSchema = z.object({
  status: z.object({
    chatId: z.string(),
    executionId: z.string(),
    phase: ExecutionPhaseEnum,
    currentStep: z.string().nullable(),
    totalSteps: z.number(),
    progress: z.number(),
    message: z.string(),
    stepResult: z.string().nullable(),
    error: z.string().nullable(),
    timestamp: z.string(),
  }),
  isComplete: z.boolean(),
  finalResult: z.string().nullable(),
});
export type ChatStream = z.infer<typeof ChatStreamSchema>;
