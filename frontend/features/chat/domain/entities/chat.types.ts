export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Destination {
  name: string;
  country: string;
  region: string;
  icon: string;
}
