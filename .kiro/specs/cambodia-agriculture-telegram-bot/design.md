# Design Document: Cambodia Agriculture Telegram Bot

## Overview

The Cambodia Agriculture Telegram Bot is a conversational AI system that helps Cambodian farmers by answering agriculture-related questions through Telegram. The system integrates the Telegram Bot API with an AI language model to provide contextual, relevant agricultural guidance tailored to Cambodia's farming conditions.

The architecture follows a webhook-based approach where Telegram sends user messages to our bot service, which processes them through an AI model and returns responses.

## Architecture

### High-Level Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Telegram  │ ◄─────► │   Bot Service    │ ◄─────► │ AI Service  │
│   Platform  │  HTTPS  │  (Node.js/Python)│  API    │  (OpenAI/   │
│             │         │                  │         │  Anthropic) │
└─────────────┘         └──────────────────┘         └─────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   Database   │
                        │  (Optional)  │
                        └──────────────┘
```

### Technology Stack

**Bot Service:**
- **Runtime**: Node.js with TypeScript (for type safety and modern async/await patterns)
- **Framework**: Express.js for webhook handling
- **Telegram Library**: `node-telegram-bot-api` or `telegraf` (recommended for better abstractions)
- **Environment**: Deployed on a cloud platform (Vercel, Railway, or Heroku for simplicity)

**AI Service:**
- **Primary Option**: OpenAI GPT-4 or GPT-3.5-turbo (good multilingual support including Khmer)
- **Alternative**: Anthropic Claude (excellent instruction following)
- **Integration**: Direct API calls with system prompts optimized for agricultural advice

**Storage (Optional for MVP):**
- **Session Management**: In-memory store or Redis for conversation context
- **Logging**: Simple file-based logging or cloud logging service

## Components and Interfaces

### 1. Telegram Webhook Handler

**Responsibility**: Receives incoming messages from Telegram and routes them to appropriate handlers

**Interface**:
```typescript
interface WebhookHandler {
  handleUpdate(update: TelegramUpdate): Promise<void>;
  setWebhook(url: string): Promise<boolean>;
}
```

**Key Functions**:
- Validate incoming webhook requests from Telegram
- Parse message content and user information
- Route to command handlers or message processors
- Handle errors gracefully

### 2. Command Handler

**Responsibility**: Processes bot commands like /start and /help

**Interface**:
```typescript
interface CommandHandler {
  handleStart(chatId: number): Promise<void>;
  handleHelp(chatId: number): Promise<void>;
}
```

**Commands**:
- `/start` - Welcome message with bot introduction and example questions
- `/help` - Usage instructions and feature list

### 3. Message Processor

**Responsibility**: Processes natural language questions from farmers

**Interface**:
```typescript
interface MessageProcessor {
  processQuestion(
    chatId: number,
    userId: number,
    message: string,
    language?: string
  ): Promise<void>;
}
```

**Key Functions**:
- Detect message language (Khmer vs English)
- Send typing indicator to user
- Forward question to AI service with context
- Format and send response back to user

### 4. AI Service Client

**Responsibility**: Interfaces with the AI API to generate agricultural responses

**Interface**:
```typescript
interface AIServiceClient {
  generateResponse(
    question: string,
    language: string,
    conversationHistory?: Message[]
  ): Promise<string>;
}
```

**System Prompt Design**:
```
You are an agricultural advisor specializing in Cambodian farming practices. 
You help farmers with:
- Crop cultivation advice for Cambodia's tropical climate
- Pest and disease identification and management
- Soil health and fertilization
- Seasonal planting guidance
- Water management and irrigation

Provide practical, actionable advice. Prioritize organic and sustainable methods.
Keep responses concise but informative. Use simple language that farmers can understand.
```

### 5. Language Detector

**Responsibility**: Identifies the language of incoming messages

**Interface**:
```typescript
interface LanguageDetector {
  detectLanguage(text: string): 'km' | 'en' | 'unknown';
}
```

**Implementation Approach**:
- Simple heuristic: Check for Khmer Unicode characters (U+1780 to U+17FF)
- Fallback to English if uncertain
- Can be enhanced with a language detection library if needed

### 6. Response Formatter

**Responsibility**: Formats AI responses for optimal display in Telegram

**Interface**:
```typescript
interface ResponseFormatter {
  formatResponse(aiResponse: string): string;
  formatError(error: Error): string;
}
```

**Key Functions**:
- Break long responses into multiple messages if needed (Telegram has 4096 char limit)
- Add appropriate formatting (bold, italic) using Telegram markdown
- Handle special characters properly

## Data Models

### TelegramUpdate
```typescript
interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
    date: number;
  };
}
```

### ConversationContext (Optional for MVP)
```typescript
interface ConversationContext {
  chatId: number;
  userId: number;
  language: 'km' | 'en';
  messageHistory: Message[];
  lastInteraction: Date;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

### BotConfig
```typescript
interface BotConfig {
  telegramToken: string;
  webhookUrl: string;
  aiApiKey: string;
  aiModel: string;
  maxResponseTime: number; // milliseconds
  maxMessageHistory: number; // for context
}
```

## Error Handling

### Error Categories

1. **Telegram API Errors**
   - Network failures when sending messages
   - Invalid chat IDs
   - Rate limiting
   - **Handling**: Retry with exponential backoff, log errors, send generic error message to user

2. **AI Service Errors**
   - API timeouts
   - Rate limits exceeded
   - Invalid API keys
   - Model unavailability
   - **Handling**: Catch and log, inform user with friendly message ("I'm having trouble right now, please try again in a moment"), implement retry logic

3. **Validation Errors**
   - Empty messages
   - Unsupported message types (images, videos)
   - **Handling**: Send helpful message explaining what the bot can handle

4. **System Errors**
   - Out of memory
   - Unhandled exceptions
   - **Handling**: Global error handler, log to monitoring service, graceful degradation

### Error Response Messages

**Khmer**:
- AI Service Error: "សូមអភ័យទោស ខ្ញុំមានបញ្ហាបច្ចេកទេសបន្តិច។ សូមសាកល្បងម្តងទៀតក្នុងពេលបន្តិច។"
- Invalid Input: "សូមផ្ញើសំណួររបស់អ្នកជាអត្ថបទ។"

**English**:
- AI Service Error: "Sorry, I'm experiencing technical difficulties. Please try again in a moment."
- Invalid Input: "Please send your question as text."

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock external dependencies (Telegram API, AI API)
- Focus on:
  - Command handlers
  - Language detection logic
  - Response formatting
  - Error handling paths

### Integration Tests
- Test webhook handler with sample Telegram updates
- Test AI service client with real API calls (using test API keys)
- Verify end-to-end message flow

### Manual Testing
- Create test Telegram bot
- Test with real questions in both Khmer and English
- Verify response quality and accuracy
- Test error scenarios (invalid input, service downtime)
- Performance testing (response time under load)

### Test Scenarios
1. User sends `/start` command → Receives welcome message
2. User sends agriculture question in English → Receives relevant answer in English
3. User sends agriculture question in Khmer → Receives relevant answer in Khmer
4. User sends `/help` command → Receives help information
5. AI service is down → User receives friendly error message
6. User sends very long message → Bot handles gracefully
7. Multiple users send messages simultaneously → All receive responses

## Deployment Considerations

### Environment Variables
```
TELEGRAM_BOT_TOKEN=<your_bot_token>
TELEGRAM_WEBHOOK_URL=<your_webhook_url>
AI_API_KEY=<openai_or_anthropic_key>
AI_MODEL=gpt-3.5-turbo
PORT=3000
NODE_ENV=production
```

### Webhook Setup
- Register webhook URL with Telegram using `setWebhook` API
- Ensure HTTPS endpoint (required by Telegram)
- Verify webhook with secret token for security

### Monitoring
- Log all incoming messages and responses
- Track response times
- Monitor AI API usage and costs
- Set up alerts for error rates

### Scaling Considerations (Future)
- Current design handles moderate traffic (hundreds of users)
- For thousands of concurrent users: Add Redis for session management
- For high availability: Deploy multiple instances behind load balancer
- Consider message queue (Bull/BullMQ) for async processing if response times increase
