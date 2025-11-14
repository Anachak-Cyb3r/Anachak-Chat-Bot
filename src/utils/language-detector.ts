/**
 * Detects the language of a text message
 * Supports Khmer (km) and English (en)
 */
export function detectLanguage(text: string): 'km' | 'en' {
  if (!text || text.trim().length === 0) {
    return 'en'; // Default to English for empty text
  }

  // Khmer Unicode range: U+1780 to U+17FF
  const khmerRegex = /[\u1780-\u17FF]/;
  
  // Check if text contains Khmer characters
  if (khmerRegex.test(text)) {
    return 'km';
  }

  // Default to English
  return 'en';
}

/**
 * Gets language preference from Telegram user's language code
 * Falls back to English if not Khmer
 */
export function getLanguageFromCode(languageCode?: string): 'km' | 'en' {
  if (!languageCode) {
    return 'en';
  }

  // Telegram uses 'km' for Khmer
  if (languageCode.toLowerCase().startsWith('km')) {
    return 'km';
  }

  return 'en';
}
