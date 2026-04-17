import { n8nResponseSchema, type SendMessageInput } from "../schemas/chat.schema"

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook/b084a22e-b8d8-4d70-a3d4-3ed216f18812/chat"

function extractTextFromResponse(data: unknown): string {
  const parsed = n8nResponseSchema.safeParse(data)

  if (!parsed.success) {
    return "Lo siento, hubo un error al procesar la respuesta. Por favor intenta de nuevo."
  }

  const response = parsed.data
  if ("output" in response) return response.output
  if ("message" in response) return response.message
  if ("text" in response) return response.text
  if ("response" in response) return response.response

  return "Lo siento, no pude entender la respuesta. Por favor intenta de nuevo."
}

export async function sendChatMessage(input: SendMessageInput): Promise<string> {
  const body: Record<string, string> = {
    action: "sendMessage",
    sessionId: input.sessionId,
    chatInput: input.message,
  }

  if (input.destination) {
    body.destination = input.destination
  }

  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Error del servidor: ${res.status}`)
  }

  const data: unknown = await res.json()
  return extractTextFromResponse(data)
}
