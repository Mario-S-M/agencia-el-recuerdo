"use client"

import { useCallback } from "react"
import { useChatStore } from "../store/useChatStore"
import { sendChatMessage } from "../services/chat.service"
import { sendMessageSchema } from "../schemas/chat.schema"
import type { ChatMessage } from "../types"

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    timestamp: new Date(),
  }
}

export function useChat() {
  const {
    isOpen,
    messages,
    isLoading,
    selectedDestination,
    sessionId,
    openChat,
    closeChat,
    setDestination,
    addMessage,
    setLoading,
    clearMessages,
  } = useChatStore()

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      const parsed = sendMessageSchema.safeParse({
        message: trimmed,
        destination: selectedDestination ?? undefined,
        sessionId,
      })

      if (!parsed.success) return

      addMessage(createMessage("user", trimmed))
      setLoading(true)

      try {
        const reply = await sendChatMessage(parsed.data)
        addMessage(createMessage("assistant", reply))
      } catch {
        addMessage(
          createMessage(
            "assistant",
            "Hubo un problema al conectar con el asistente. Por favor intenta de nuevo."
          )
        )
      } finally {
        setLoading(false)
      }
    },
    [isLoading, selectedDestination, sessionId, addMessage, setLoading]
  )

  return {
    isOpen,
    messages,
    isLoading,
    selectedDestination,
    openChat,
    closeChat,
    setDestination,
    sendMessage,
    clearMessages,
  }
}
