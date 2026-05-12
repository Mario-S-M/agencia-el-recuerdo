import { z } from 'zod';

export const chatFormSchema = z.object({
  message: z.string().min(1, 'El mensaje no puede estar vacío').max(1000),
});

export type ChatFormData = z.infer<typeof chatFormSchema>;
