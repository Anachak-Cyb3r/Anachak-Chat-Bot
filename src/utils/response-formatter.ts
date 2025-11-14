/**
 * Formats AI response for Telegram
 * Handles message length limits and formatting
 */
export function formatResponse(aiResponse: string): string[] {
  const MAX_LENGTH = 4096; // Telegram's message length limit
  
  // If response fits in one message, return it
  if (aiResponse.length <= MAX_LENGTH) {
    return [aiResponse];
  }

  // Split long responses into multiple messages
  const messages: string[] = [];
  let currentMessage = '';
  const paragraphs = aiResponse.split('\n\n');

  for (const paragraph of paragraphs) {
    // If adding this paragraph exceeds limit, save current message and start new one
    if (currentMessage.length + paragraph.length + 2 > MAX_LENGTH) {
      if (currentMessage) {
        messages.push(currentMessage.trim());
      }
      // If single paragraph is too long, split it by character chunks
      if (paragraph.length > MAX_LENGTH) {
        for (let i = 0; i < paragraph.length; i += MAX_LENGTH) {
          messages.push(paragraph.slice(i, i + MAX_LENGTH));
        }
        currentMessage = '';
      } else {
        currentMessage = paragraph;
      }
    } else {
      currentMessage += (currentMessage ? '\n\n' : '') + paragraph;
    }
  }

  // Add remaining message
  if (currentMessage) {
    messages.push(currentMessage.trim());
  }

  return messages;
}

/**
 * Formats error messages for users
 */
export function formatError(error: Error, language: 'km' | 'en'): string {
  const errorMessage = error.message;

  if (errorMessage.includes('AI_RATE_LIMIT')) {
    return language === 'km'
      ? '⏳ *សូមអភ័យទោស*\n\nប្រព័ន្ធកំពុងមមាញឹក។ សូមរង់ចាំ 1-2 នាទី ហើយសាកល្បងម្តងទៀត។\n\n🌾 សូមអរគុណចំពោះការអត់ធ្មត់របស់អ្នក!'
      : '⏳ *System Busy*\n\nI\'m receiving many questions right now. Please wait 1-2 minutes and try again.\n\n🌾 Thank you for your patience!';
  }

  if (errorMessage.includes('AI_TIMEOUT')) {
    return language === 'km'
      ? '⏱️ *ពេលវេលាអស់*\n\nសំណួររបស់អ្នកចំណាយពេលយូរពេក។ សូមសាកល្បងសួរម្តងទៀតជាមួយសំណួរខ្លីជាង។'
      : '⏱️ *Request Timeout*\n\nYour question took too long to process. Please try asking a shorter, more specific question.';
  }

  if (errorMessage.includes('AI_AUTH_ERROR')) {
    return language === 'km'
      ? '🔧 *បញ្ហាការកំណត់រចនាសម្ព័ន្ធ*\n\nមានបញ្ហាជាមួយប្រព័ន្ធ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។'
      : '🔧 *Configuration Error*\n\nThere\'s a system configuration issue. Please contact the administrator.';
  }

  // Generic error message
  return language === 'km'
    ? '❌ *មានបញ្ហាបច្ចេកទេស*\n\nសូមអភ័យទោស ខ្ញុំមានបញ្ហាបន្តិច។ សូមសាកល្បងម្តងទៀតក្នុងពេលបន្តិច។\n\n💡 ប្រសិនបើបញ្ហានៅតែមាន សូមផ្ញើ /start ដើម្បីចាប់ផ្តើមឡើងវិញ។'
    : '❌ *Technical Issue*\n\nSorry, I\'m experiencing technical difficulties. Please try again in a moment.\n\n💡 If the problem persists, send /start to restart.';
}
