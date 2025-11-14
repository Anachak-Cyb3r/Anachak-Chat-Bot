export enum ErrorCategory {
  TELEGRAM_API = 'TELEGRAM_API',
  AI_SERVICE = 'AI_SERVICE',
  VALIDATION = 'VALIDATION',
  SYSTEM = 'SYSTEM',
}

export interface CategorizedError {
  category: ErrorCategory;
  originalError: Error;
  userMessage: string;
  shouldRetry: boolean;
}

export function categorizeError(error: Error): CategorizedError {
  const errorMessage = error.message;

  // Telegram API Errors (check first, before generic API check)
  if (
    errorMessage.includes('Telegram') ||
    errorMessage.includes('chat not found') ||
    errorMessage.includes('bot was blocked')
  ) {
    return {
      category: ErrorCategory.TELEGRAM_API,
      originalError: error,
      userMessage: 'Telegram API error',
      shouldRetry: true,
    };
  }

  // AI Service Errors
  if (
    errorMessage.includes('AI_') ||
    errorMessage.includes('OpenAI') ||
    errorMessage.includes('API')
  ) {
    return {
      category: ErrorCategory.AI_SERVICE,
      originalError: error,
      userMessage: 'AI service error',
      shouldRetry: !errorMessage.includes('AI_AUTH_ERROR'),
    };
  }

  // Validation Errors
  if (
    errorMessage.includes('validation') ||
    errorMessage.includes('invalid') ||
    errorMessage.includes('required')
  ) {
    return {
      category: ErrorCategory.VALIDATION,
      originalError: error,
      userMessage: 'Validation error',
      shouldRetry: false,
    };
  }

  // System Errors (default)
  return {
    category: ErrorCategory.SYSTEM,
    originalError: error,
    userMessage: 'System error',
    shouldRetry: true,
  };
}

export function logError(error: CategorizedError, context?: any): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    category: error.category,
    message: error.originalError.message,
    stack: error.originalError.stack,
    context,
  };

  // In production, this would go to a logging service
  console.error('[ERROR]', JSON.stringify(logEntry, null, 2));
}

export function shouldRetryError(error: Error): boolean {
  const categorized = categorizeError(error);
  return categorized.shouldRetry;
}
