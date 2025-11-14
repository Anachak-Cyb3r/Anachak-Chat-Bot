# Implementation Plan

- [x] 1. Set up project structure and dependencies
  - Initialize Node.js project with TypeScript configuration
  - Install core dependencies: telegraf, dotenv, openai (or @anthropic-ai/sdk)
  - Create directory structure: src/handlers, src/services, src/utils, src/types
  - Set up TypeScript compiler configuration with strict mode
  - Create .env.example file with required environment variables
  - _Requirements: 1.1, 4.1_

- [x] 2. Implement configuration and type definitions
  - Create types/telegram.types.ts with Telegram message interfaces
  - Create types/config.types.ts with BotConfig interface
  - Implement config.ts to load and validate environment variables
  - Add type definitions for conversation context and messages
  - _Requirements: 1.1, 1.4_

- [x] 3. Create AI service client
  - [x] 3.1 Implement AIServiceClient class with OpenAI integration
    - Create services/ai-service.ts with generateResponse method
    - Implement system prompt for Cambodian agriculture expertise
    - Add error handling for API timeouts and rate limits
    - Configure response parameters (temperature, max_tokens)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2_
  
  - [x] 3.2 Add conversation context support
    - Implement message history tracking in generateResponse
    - Limit context to last N messages to manage token usage
    - Format conversation history for AI API
    - _Requirements: 1.4, 2.2_

- [x] 4. Implement language detection utility
  - Create utils/language-detector.ts with detectLanguage function
  - Implement Khmer Unicode character detection (U+1780 to U+17FF)
  - Add fallback logic for unknown languages (default to English)
  - _Requirements: 6.2, 6.3_

- [x] 5. Create command handlers
  - [x] 5.1 Implement /start command handler
    - Create handlers/commands.ts with handleStart function
    - Write welcome message in both Khmer and English
    - Include example questions farmers can ask
    - Detect user's language preference from Telegram language_code
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 5.2 Implement /help command handler
    - Add handleHelp function to handlers/commands.ts
    - Provide usage instructions and available features
    - Include troubleshooting tips
    - _Requirements: 4.4_

- [x] 6. Implement message processor
  - [x] 6.1 Create message processing logic
    - Create handlers/message-processor.ts with processQuestion function
    - Integrate language detection for incoming messages
    - Send typing indicator using ctx.sendChatAction('typing')
    - Call AI service with detected language
    - _Requirements: 1.1, 1.3, 2.2, 6.2, 6.3_
  
  - [x] 6.2 Implement response formatting and delivery
    - Create utils/response-formatter.ts with formatResponse function
    - Handle Telegram's 4096 character limit by splitting long messages
    - Add Telegram markdown formatting for better readability
    - Send formatted response back to user
    - _Requirements: 2.3, 2.4_

- [x] 7. Create error handling system
  - [x] 7.1 Implement error handler utilities
    - Create utils/error-handler.ts with error categorization
    - Add user-friendly error messages in Khmer and English
    - Implement logging for all errors
    - _Requirements: 5.2, 5.4_
  
  - [x] 7.2 Add retry logic for API failures
    - Implement exponential backoff for AI service calls
    - Add retry mechanism for Telegram API calls
    - Set maximum retry attempts (3 attempts)
    - _Requirements: 5.2_

- [x] 8. Set up main bot application
  - [x] 8.1 Create bot initialization
    - Create src/bot.ts with Telegraf bot instance
    - Register command handlers (start, help)
    - Register message handler for text messages
    - Add global error handler
    - _Requirements: 1.1, 1.2, 4.3, 4.4_
  
  - [x] 8.2 Implement webhook server
    - Create src/server.ts with Express app
    - Set up webhook endpoint for Telegram updates
    - Add health check endpoint
    - Configure webhook URL with Telegram
    - _Requirements: 1.1, 5.1_
  
  - [x] 8.3 Add graceful shutdown handling
    - Implement process signal handlers (SIGTERM, SIGINT)
    - Close bot connections properly
    - Log shutdown events
    - _Requirements: 5.4_

- [x] 9. Create deployment configuration
  - Create package.json scripts for build and start
  - Add Dockerfile for containerized deployment (optional)
  - Create deployment guide in README.md with setup instructions
  - Document how to obtain Telegram bot token and AI API key
  - _Requirements: 5.1_

- [x] 10. Write integration tests
  - Create tests/bot.test.ts for end-to-end message flow
  - Test /start and /help commands
  - Test message processing with mocked AI responses
  - Test error scenarios (AI service down, invalid input)
  - _Requirements: All_
