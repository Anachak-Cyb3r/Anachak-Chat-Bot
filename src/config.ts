import dotenv from 'dotenv';
import { BotConfig } from './types/config.types';

dotenv.config();

function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config: BotConfig = {
  telegramToken: validateEnvVar('TELEGRAM_BOT_TOKEN', process.env.TELEGRAM_BOT_TOKEN),
  webhookUrl: process.env.TELEGRAM_WEBHOOK_URL,
  aiApiKey: validateEnvVar('GOOGLE_API_KEY', process.env.GOOGLE_API_KEY),
  aiModel: process.env.AI_MODEL || 'gemini-pro',
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  maxResponseTime: parseInt(process.env.MAX_RESPONSE_TIME || '10000', 10),
  maxMessageHistory: parseInt(process.env.MAX_MESSAGE_HISTORY || '10', 10),
};
