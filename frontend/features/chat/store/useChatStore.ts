import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ChatMessage } from "../types"

interface ChatStore {
  isOpen: boolean
  messages: ChatMessage[]
  isLoading: boolean
  selectedDestination: string | null
  sessionId: string
  openChat: (destination?: string) => void
  closeChat: () => void
  setDestination: (destination: string | null) => void
  addMessage: (message: ChatMessage) => void
  setLoading: (loading: boolean) => void
  clearMessages: () => void
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      isLoading: false,
      selectedDestination: null,
      sessionId: generateSessionId(),

      openChat: (destination?: string) =>
        set((s) => ({
          isOpen: true,
          selectedDestination: destination ?? s.selectedDestination,
        })),

      closeChat: () => set({ isOpen: false }),

      setDestination: (destination) => set({ selectedDestination: destination }),

      addMessage: (message) =>
        set((s) => ({ messages: [...s.messages, message] })),

      setLoading: (loading) => set({ isLoading: loading }),

      clearMessages: () =>
        set({ messages: [], sessionId: generateSessionId() }),
    }),
    {
      name: "chat-storage",
      partialize: (s) => ({ sessionId: s.sessionId, messages: s.messages }),
    }
  )
)
