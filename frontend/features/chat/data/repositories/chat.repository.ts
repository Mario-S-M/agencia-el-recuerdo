import { chatApi } from '../api/chat.api';

export class ChatRepository {
  async sendMessage(input: { message: string; sessionId: string; destination?: string }): Promise<string> {
    return chatApi.sendMessage(input);
  }
}
