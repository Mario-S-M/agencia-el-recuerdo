'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '../../../domain/entities/chat.types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-2 max-w-[85%]', isUser ? 'ml-auto flex-row-reverse' : 'mr-auto')}
    >
      <div
        className={cn(
          'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm',
          isUser
            ? 'bg-orange-500/20 border border-orange-500/30'
            : 'bg-teal-500/20 border border-teal-500/30',
        )}
      >
        {isUser ? '👤' : '✈️'}
      </div>

      <div
        className={cn(
          'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-orange-500 text-white rounded-tr-sm'
            : 'bg-white/8 border border-white/10 text-white/90 rounded-tl-sm',
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
