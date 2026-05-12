'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useChat } from '../../hooks/useChat';
import { ChatBubble } from './ChatBubble';
import { DestinationPicker } from './DestinationPicker';

const WELCOME_MESSAGE =
  '¡Hola! Soy el asistente de El Recuerdo ✈️ Estoy aquí para ayudarte a planear el viaje de tus sueños. Puedes seleccionar un destino o contarme qué tienes en mente.';

export function ChatWidget() {
  const {
    isOpen,
    messages,
    isLoading,
    selectedDestination,
    openChat,
    closeChat,
    setDestination,
    sendMessage,
    clearMessages,
  } = useChat();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleHashChange(): void {
      if (window.location.hash === '#chat') {
        openChat();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#chat') handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [openChat]);

  function handleSubmit(): void {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => openChat()}
            className={cn(
              'fixed bottom-6 right-6 z-50',
              'w-14 h-14 rounded-full shadow-2xl',
              'bg-gradient-to-br from-orange-500 to-orange-600',
              'flex items-center justify-center text-2xl',
              'hover:scale-110 active:scale-95 transition-transform duration-200',
              'hover:shadow-orange-500/40',
            )}
            aria-label="Abrir chat"
          >
            💬
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={cn(
              'fixed bottom-6 right-6 z-50',
              'w-[360px] max-w-[calc(100vw-2rem)]',
              'flex flex-col rounded-3xl overflow-hidden shadow-2xl',
              'bg-[#0A1020] border border-white/10',
            )}
            style={{ height: 'min(580px, calc(100vh - 3rem))' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(13,148,136,0.08) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-lg">
                ✈️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Asistente El Recuerdo</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En línea · disponible 24/7
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearMessages}
                  title="Nueva conversación"
                  className="w-7 h-7 rounded-full hover:bg-white/8 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors text-xs"
                >
                  ↺
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  className="w-7 h-7 rounded-full hover:bg-white/8 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                  aria-label="Cerrar chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {/* Welcome */}
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm">
                  ✈️
                </div>
                <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white/8 border border-white/10 text-white/90 text-sm leading-relaxed">
                  {WELCOME_MESSAGE}
                </div>
              </div>

              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 max-w-[85%] mr-auto"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm">
                    ✈️
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/8 border border-white/10 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/50"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div
              className="flex-shrink-0 px-4 pt-3 pb-4 space-y-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Destination picker */}
              <DestinationPicker
                selected={selectedDestination}
                onSelect={setDestination}
              />

              {/* Input */}
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  rows={1}
                  disabled={isLoading}
                  className={cn(
                    'flex-1 resize-none rounded-2xl px-4 py-2.5 text-sm',
                    'bg-white/5 border border-white/10 text-white placeholder-white/30',
                    'focus:outline-none focus:border-orange-500/50 focus:bg-white/8',
                    'transition-all duration-200 max-h-24 leading-relaxed',
                    'disabled:opacity-50',
                  )}
                  style={{ scrollbarWidth: 'none' }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center',
                    'bg-orange-500 text-white transition-all duration-200',
                    'hover:bg-orange-400 active:scale-95',
                    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-orange-500',
                  )}
                  aria-label="Enviar mensaje"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22 11 13 2 9l20-7z" />
                  </svg>
                </button>
              </div>

              <p className="text-white/20 text-[10px] text-center">
                Enter para enviar · Shift+Enter para nueva línea
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
