import { Context } from 'telegraf';
import { AIServiceClient } from '../services/ai-service';
import { ConversationManager } from '../services/conversation-manager';
import { detectLanguage } from '../utils/language-detector';
import { formatResponse, formatError } from '../utils/response-formatter';

export class MessageProcessor {
  private aiService: AIServiceClient;
  private conversationManager: ConversationManager;

  constructor() {
    this.aiService = new AIServiceClient();
    this.conversationManager = new ConversationManager();
  }

  async processQuestion(ctx: Context): Promise<void> {
    // Get message text
    const messageText = ctx.message && 'text' in ctx.message ? ctx.message.text : undefined;
    
    // Ignore empty messages or non-text
    if (!messageText || !ctx.chat || messageText.trim().length === 0) {
      return;
    }

    // Ignore very long messages (over 1000 characters)
    if (messageText.length > 1000) {
      const language = detectLanguage(messageText);
      const tooLongMessage = language === 'km'
        ? '📝 *សារវែងពេក*\n\nសូមផ្ញើសំណួរខ្លីជាង (តិចជាង 1000 តួអក្សរ)។'
        : '📝 *Message Too Long*\n\nPlease send a shorter question (less than 1000 characters).';
      await ctx.reply(tooLongMessage, { parse_mode: 'Markdown' });
      return;
    }

    const chatId = ctx.chat.id;
    const userId = ctx.from?.id || 0;

    try {
      // Detect language from message
      const language = detectLanguage(messageText);

      // Get conversation context
      this.conversationManager.getContext(chatId, userId, language);

      // Send typing indicator
      await ctx.sendChatAction('typing');

      // Add user message to history
      this.conversationManager.addMessage(chatId, 'user', messageText);

      // Get message history for context
      const messageHistory = this.conversationManager.getMessageHistory(chatId);

      // Generate AI response
      const aiResponse = await this.aiService.generateResponse(
        messageText,
        language,
        messageHistory.slice(0, -1) // Exclude the current message we just added
      );

      // Add assistant response to history
      this.conversationManager.addMessage(chatId, 'assistant', aiResponse);

      // Format and send response with Markdown formatting
      const formattedMessages = formatResponse(aiResponse);
      
      for (const message of formattedMessages) {
        try {
          await ctx.reply(message, { parse_mode: 'Markdown' });
        } catch (markdownError) {
          // If markdown fails, send without formatting
          await ctx.reply(message);
        }
      }

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Detect language for error message
      const language = detectLanguage(messageText);
      const errorMessage = formatError(error as Error, language);
      
      try {
        await ctx.reply(errorMessage, { parse_mode: 'Markdown' });
      } catch {
        // Fallback without markdown
        await ctx.reply(errorMessage);
      }
    }
  }

  getConversationManager(): ConversationManager {
    return this.conversationManager;
  }
}
