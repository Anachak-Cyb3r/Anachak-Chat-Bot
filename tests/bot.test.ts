import { detectLanguage, getLanguageFromCode } from '../src/utils/language-detector';
import { formatResponse, formatError } from '../src/utils/response-formatter';
import { categorizeError, ErrorCategory } from '../src/utils/error-handler';

describe('Language Detection', () => {
  test('should detect Khmer language', () => {
    const khmerText = 'សួស្តី តើអ្នកសុខសប្បាយទេ?';
    expect(detectLanguage(khmerText)).toBe('km');
  });

  test('should detect English language', () => {
    const englishText = 'Hello, how are you?';
    expect(detectLanguage(englishText)).toBe('en');
  });

  test('should default to English for empty text', () => {
    expect(detectLanguage('')).toBe('en');
  });

  test('should get language from Telegram language code', () => {
    expect(getLanguageFromCode('km')).toBe('km');
    expect(getLanguageFromCode('en')).toBe('en');
    expect(getLanguageFromCode('fr')).toBe('en'); // Fallback to English
    expect(getLanguageFromCode(undefined)).toBe('en');
  });
});

describe('Response Formatting', () => {
  test('should return single message for short response', () => {
    const shortResponse = 'This is a short response.';
    const formatted = formatResponse(shortResponse);
    expect(formatted).toHaveLength(1);
    expect(formatted[0]).toBe(shortResponse);
  });

  test('should split long response into multiple messages', () => {
    const longResponse = 'A'.repeat(5000); // Exceeds 4096 limit
    const formatted = formatResponse(longResponse);
    expect(formatted.length).toBeGreaterThan(1);
    formatted.forEach(msg => {
      expect(msg.length).toBeLessThanOrEqual(4096);
    });
  });

  test('should format AI rate limit error in English', () => {
    const error = new Error('AI_RATE_LIMIT');
    const formatted = formatError(error, 'en');
    expect(formatted).toContain('busy');
  });

  test('should format AI rate limit error in Khmer', () => {
    const error = new Error('AI_RATE_LIMIT');
    const formatted = formatError(error, 'km');
    expect(formatted).toContain('សូមអភ័យទោស');
  });

  test('should format timeout error', () => {
    const error = new Error('AI_TIMEOUT');
    const formatted = formatError(error, 'en');
    expect(formatted).toContain('too long');
  });

  test('should format generic error', () => {
    const error = new Error('Unknown error');
    const formatted = formatError(error, 'en');
    expect(formatted).toContain('technical difficulties');
  });
});

describe('Error Handling', () => {
  test('should categorize AI service errors', () => {
    const error = new Error('AI_SERVICE_ERROR: timeout');
    const categorized = categorizeError(error);
    expect(categorized.category).toBe(ErrorCategory.AI_SERVICE);
    expect(categorized.shouldRetry).toBe(true);
  });

  test('should categorize Telegram API errors', () => {
    const error = new Error('Telegram API error: chat not found');
    const categorized = categorizeError(error);
    expect(categorized.category).toBe(ErrorCategory.TELEGRAM_API);
    expect(categorized.shouldRetry).toBe(true);
  });

  test('should categorize validation errors', () => {
    const error = new Error('Validation failed: required field missing');
    const categorized = categorizeError(error);
    expect(categorized.category).toBe(ErrorCategory.VALIDATION);
    expect(categorized.shouldRetry).toBe(false);
  });

  test('should not retry auth errors', () => {
    const error = new Error('AI_AUTH_ERROR');
    const categorized = categorizeError(error);
    expect(categorized.shouldRetry).toBe(false);
  });

  test('should categorize unknown errors as system errors', () => {
    const error = new Error('Something went wrong');
    const categorized = categorizeError(error);
    expect(categorized.category).toBe(ErrorCategory.SYSTEM);
    expect(categorized.shouldRetry).toBe(true);
  });
});

describe('Conversation Manager', () => {
  test('should be tested with mocked AI service', () => {
    // This is a placeholder for integration tests
    // In a real scenario, you would mock the OpenAI API
    expect(true).toBe(true);
  });
});
