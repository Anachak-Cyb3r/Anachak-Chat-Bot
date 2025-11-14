# Cambodia Agriculture Telegram Bot 🌾

An AI-powered Telegram bot that helps Cambodian farmers with agriculture-related questions. The bot provides expert advice on crop cultivation, pest management, soil health, and farming practices tailored to Cambodia's climate and conditions.

## Features

- 🌱 **Crop Cultivation Advice** - Planting schedules, growing tips for Cambodia's tropical climate
- 🐛 **Pest & Disease Management** - Identification and treatment recommendations
- 🌍 **Soil Health** - Fertilization and composting guidance
- 💧 **Water Management** - Irrigation techniques and water conservation
- 🌿 **Organic Farming** - Sustainable and organic farming methods
- 🇰🇭 **Multilingual** - Supports both Khmer (ខ្មែរ) and English

## Prerequisites

- Node.js 18+ and npm
- A Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- A Google Gemini API Key (FREE! from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Setup Instructions

### 1. Get Your Telegram Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token provided by BotFather

### 2. Get Your Google Gemini API Key (FREE!)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

**Note:** Google Gemini is completely FREE with generous limits (60 requests/minute)!

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
GOOGLE_API_KEY=your_google_gemini_api_key_here
AI_MODEL=gemini-pro
PORT=3000
NODE_ENV=development
```

### 5. Build the Project

```bash
npm run build
```

### 6. Run the Bot

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The bot will start in polling mode (development) and will be ready to receive messages!

## Usage

1. Open Telegram and search for your bot by username
2. Start a conversation with `/start`
3. Ask any agriculture-related question in English or Khmer
4. Get instant AI-powered advice!

### Example Questions

**English:**
- "When is the best time to plant rice in Cambodia?"
- "How do I treat brown spot disease on rice?"
- "What organic fertilizer is good for vegetables?"

**Khmer:**
- "តើពេលណាល្អបំផុតក្នុងការដាំស្រូវនៅកម្ពុជា?"
- "តើខ្ញុំគួរព្យាបាលជំងឺស្នាមត្នោតនៅលើដើមស្រូវយ៉ាងដូចម្តេច?"
- "តើជីធម្មជាតិអ្វីល្អសម្រាប់សួនបន្លែ?"

## Commands

- `/start` - Show welcome message and bot capabilities
- `/help` - Display usage instructions

## Deployment

### Deploy to Production (with Webhook)

For production deployment, you'll need:
1. A server with HTTPS support (required by Telegram)
2. A domain name pointing to your server

Update your `.env`:
```env
TELEGRAM_WEBHOOK_URL=https://your-domain.com
NODE_ENV=production
```

The bot will automatically set up the webhook when started.

### Deployment Options

**Option 1: Railway**
1. Create account at [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy!

**Option 2: Heroku**
1. Create account at [Heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run: `heroku create your-bot-name`
4. Set environment variables: `heroku config:set TELEGRAM_BOT_TOKEN=...`
5. Deploy: `git push heroku main`

**Option 3: Docker**
```bash
docker build -t cambodia-agriculture-bot .
docker run -d --env-file .env -p 3000:3000 cambodia-agriculture-bot
```

## Project Structure

```
├── src/
│   ├── bot.ts                    # Bot initialization and handlers
│   ├── server.ts                 # Express server and webhook setup
│   ├── config.ts                 # Configuration management
│   ├── handlers/
│   │   ├── commands.ts           # /start and /help commands
│   │   └── message-processor.ts # Message processing logic
│   ├── services/
│   │   ├── ai-service.ts         # OpenAI integration
│   │   └── conversation-manager.ts # Conversation context
│   ├── utils/
│   │   ├── language-detector.ts  # Language detection
│   │   ├── response-formatter.ts # Response formatting
│   │   ├── error-handler.ts      # Error categorization
│   │   └── retry-helper.ts       # Retry logic
│   └── types/
│       ├── config.types.ts       # Configuration types
│       └── telegram.types.ts     # Telegram types
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

**Bot doesn't respond:**
- Check that your bot token is correct
- Verify the bot is running (`npm run dev`)
- Check console for error messages

**AI responses are slow:**
- This is normal for the first request
- Google Gemini is usually very fast (1-3 seconds)

**"Configuration issue" error:**
- Verify your Google API key is valid
- Make sure you created the key at [Google AI Studio](https://makersuite.google.com/app/apikey)

## Cost Considerations

- **Google Gemini API**: ✅ **COMPLETELY FREE!** (60 requests/minute, 1500 requests/day)
- **Hosting**: Free tier available on Railway, Heroku, or similar platforms
- **Telegram Bot**: Completely free

**Total Cost: $0** 🎉

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this bot for your own projects!

## Support

For questions or issues, please open an issue on GitHub or contact the maintainer.

---

Made with ❤️ for Cambodian farmers 🇰🇭
