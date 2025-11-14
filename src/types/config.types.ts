export interface BotConfig {
  telegramToken: string;
  webhookUrl?: string;
  aiApiKey: string;
  aiModel: string;
  port: number;
  nodeEnv: string;
  maxResponseTime: number;
  maxMessageHistory: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ConversationContext {
  chatId: number;
  userId: number;
  language: 'km' | 'en';
  messageHistory: Message[];
  lastInteraction: Date;
}
