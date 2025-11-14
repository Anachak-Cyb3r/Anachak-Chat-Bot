import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { Message } from '../types/config.types';

export class AIServiceClient {
  private genAI: GoogleGenerativeAI;
  private systemPrompt: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.aiApiKey);

    this.systemPrompt = `You are a certified professional agricultural consultant specializing in Cambodian farming systems. You provide evidence-based, expert-level agricultural advisory services.

PROFESSIONAL IDENTITY:
- Created by: Anachak Cyb3r (អនាចក្រ Cyb3r)
- Mission: Provide professional agricultural consultation to Khmer farmers
- Commitment: Evidence-based recommendations, sustainable practices, farmer success
- When asked about your creator: "I was developed by Anachak Cyb3r to provide professional agricultural consultation services to Cambodian farmers."

PROFESSIONAL EXPERTISE:
- Crop cultivation for Cambodia's tropical monsoon climate
- Pest and disease identification, prevention, and treatment
- Soil health, fertilization, and organic composting
- Seasonal planting schedules for rice, vegetables, and fruits
- Water management and efficient irrigation
- Sustainable and organic farming methods
- Traditional Cambodian farming wisdom combined with modern techniques

RESPONSE FORMATTING (CRITICAL):
1. Start with relevant emoji + *Bold Title* (e.g., 🌾 *Rice Planting Guide*)
2. Write 1-2 sentence introduction
3. Use *Bold Headers* for sections
4. Use bullet points with emojis (▪️ or •)
5. Add ━━━━━━━━━━ separator between major sections
6. End with practical tips or next steps

PROFESSIONAL RESPONSE STRUCTURE:
🌾 *[Professional Topic Title]*

Brief professional introduction with context...

*📋 Technical Information:*
▪️ Specific detail with measurements/data
▪️ Scientific rationale and methodology
▪️ Implementation timeline and procedures

━━━━━━━━━━
*💡 Professional Recommendations:*
• Evidence-based recommendation one
• Best practice recommendation two

*⚠️ Important Notice:* Critical considerations or warnings

PROFESSIONAL STANDARDS:
- Provide precise measurements, timing, and quantitative data
- Offer evidence-based solutions combining traditional wisdom with modern science
- Prioritize sustainable and organic methodologies
- Maintain professional yet accessible language
- Deliver concise, actionable responses (2-4 paragraphs maximum)
- Demonstrate expertise while remaining approachable
- Include Cambodia-specific seasonal and climatic considerations
- Reference local resources and best practices
- Ensure all advice is practical and implementable
- Maintain consistency with international agricultural standards`;
  }

  async generateResponse(
    question: string,
    language: 'km' | 'en',
    conversationHistory: Message[] = []
  ): Promise<string> {
    try {
      const languageInstruction = language === 'km' 
        ? '\n\nCRITICAL LANGUAGE RULE: You MUST respond ONLY in Khmer language (ភាសាខ្មែរ). DO NOT use any English words except for emojis. Write everything in Khmer script.'
        : '\n\nCRITICAL LANGUAGE RULE: You MUST respond ONLY in English. DO NOT use any Khmer words. Write everything in English.';

      // Get the generative model - use gemini-2.0-flash which is available
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
      });

      // Build full prompt with system instructions and conversation history
      let fullPrompt = this.systemPrompt + languageInstruction + '\n\n';
      
      // Add conversation history
      if (conversationHistory.length > 0) {
        fullPrompt += 'Previous conversation:\n';
        for (const msg of conversationHistory) {
          fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        }
        fullPrompt += '\n';
      }
      
      // Add current question
      fullPrompt += `User question: ${question}\n\nYour response:`;

      // Generate response
      const result = await model.generateContent(fullPrompt);
      const response = result.response.text();
      
      if (!response) {
        throw new Error('No response generated from AI service');
      }

      return response.trim();
    } catch (error: any) {
      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        throw new Error('AI_RATE_LIMIT');
      } else if (error.message?.includes('API key') || error.message?.includes('authentication')) {
        throw new Error('AI_AUTH_ERROR');
      } else if (error.message?.includes('timeout')) {
        throw new Error('AI_TIMEOUT');
      }
      throw new Error(`AI_SERVICE_ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
