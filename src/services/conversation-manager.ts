import { ConversationContext, Message } from '../types/config.types';
import { config } from '../config';

export class ConversationManager {
  private conversations: Map<number, ConversationContext>;
  private userLanguagePreferences: Map<number, 'km' | 'en'>;

  constructor() {
    this.conversations = new Map();
    this.userLanguagePreferences = new Map();
  }

  setUserLanguage(userId: number, language: 'km' | 'en'): void {
    this.userLanguagePreferences.set(userId, language);
  }

  getUserLanguage(userId: number): 'km' | 'en' | undefined {
    return this.userLanguagePreferences.get(userId);
  }

  getContext(chatId: number, userId: number, language: 'km' | 'en'): ConversationContext {
    let context = this.conversations.get(chatId);

    if (!context) {
      context = {
        chatId,
        userId,
        language,
        messageHistory: [],
        lastInteraction: new Date(),
      };
      this.conversations.set(chatId, context);
    } else {
      context.lastInteraction = new Date();
      context.language = language; // Update language preference
    }

    return context;
  }

  addMessage(chatId: number, role: 'user' | 'assistant', content: string): void {
    const context = this.conversations.get(chatId);
    
    if (!context) {
      return;
    }

    const message: Message = {
      role,
      content,
      timestamp: new Date(),
    };

    context.messageHistory.push(message);

    // Limit history to maxMessageHistory (keep most recent messages)
    if (context.messageHistory.length > config.maxMessageHistory) {
      context.messageHistory = context.messageHistory.slice(-config.maxMessageHistory);
    }
  }

  getMessageHistory(chatId: number): Message[] {
    const context = this.conversations.get(chatId);
    return context?.messageHistory || [];
  }

  clearContext(chatId: number): void {
    this.conversations.delete(chatId);
  }

  // Clean up old conversations (optional, for memory management)
  cleanupOldConversations(maxAgeMinutes: number = 60): void {
    const now = new Date();
    const conversationsToDelete: number[] = [];

    this.conversations.forEach((context, chatId) => {
      const ageMinutes = (now.getTime() - context.lastInteraction.getTime()) / (1000 * 60);
      if (ageMinutes > maxAgeMinutes) {
        conversationsToDelete.push(chatId);
      }
    });

    conversationsToDelete.forEach(chatId => this.conversations.delete(chatId));
  }
}
