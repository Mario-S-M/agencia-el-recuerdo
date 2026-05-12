import { z } from 'zod';

export const sendMessageSchema = z.object({
  message: z.string().min(1, 'El mensaje no puede estar vacío').max(1000),
  destination: z.string().optional(),
  sessionId: z.string().min(1),
});

export const n8nResponseSchema = z.union([
  z.object({ output: z.string() }),
  z.object({ message: z.string() }),
  z.object({ text: z.string() }),
  z.object({ response: z.string() }),
]);

export interface SendMessageDTO extends z.infer<typeof sendMessageSchema> {}
export type N8nResponseDTO = z.infer<typeof n8nResponseSchema>;
