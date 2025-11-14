import { Telegraf } from 'telegraf';
import { config } from './config';
import { handleStart, handleHelp } from './handlers/commands';
import { MessageProcessor } from './handlers/message-processor';
import { categorizeError, logError } from './utils/error-handler';

export function createBot(): Telegraf {
  const bot = new Telegraf(config.telegramToken);
  const messageProcessor = new MessageProcessor();

  // Command handlers
  bot.command('start', async (ctx) => {
    try {
      await handleStart(ctx);
    } catch (error) {
      console.error('Error in /start command:', error);
      await ctx.reply('Sorry, something went wrong. Please try again.');
    }
  });

  bot.command('help', async (ctx) => {
    try {
      await handleHelp(ctx);
    } catch (error) {
      console.error('Error in /help command:', error);
      await ctx.reply('Sorry, something went wrong. Please try again.');
    }
  });

  // Text message handler
  bot.on('text', async (ctx) => {
    try {
      await messageProcessor.processQuestion(ctx);
    } catch (error) {
      const categorized = categorizeError(error as Error);
      logError(categorized, {
        chatId: ctx.chat?.id,
        userId: ctx.from?.id,
        messageText: 'text' in ctx.message ? ctx.message.text : undefined,
      });
    }
  });

  // Global error handler
  bot.catch((error, ctx) => {
    console.error('Unhandled error in bot:', error);
    const categorized = categorizeError(error as Error);
    logError(categorized, {
      updateType: ctx.updateType,
      chatId: ctx.chat?.id,
      userId: ctx.from?.id,
    });
  });

  // Cleanup old conversations periodically (every hour)
  setInterval(() => {
    messageProcessor.getConversationManager().cleanupOldConversations(60);
  }, 60 * 60 * 1000);

  return bot;
}
