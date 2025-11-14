# Quick Setup Guide - Cambodia Agriculture Bot 🌾

## Step-by-Step Instructions (5 minutes)

### Step 1: Get Telegram Bot Token (2 minutes)

1. Open Telegram app
2. Search for `@BotFather`
3. Send: `/newbot`
4. Choose a name: `Cambodia Agriculture Bot`
5. Choose a username: `cambodia_agriculture_bot` (must end with 'bot')
6. **Copy the token** that BotFather gives you (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get FREE Google Gemini API Key (2 minutes)

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Click **"Create API key in new project"**
5. **Copy your API key** (looks like: `AIzaSyA...`)

### Step 3: Configure Your Bot (1 minute)

1. Create a file named `.env` in your project folder
2. Copy this and paste into `.env`:

```env
TELEGRAM_BOT_TOKEN=paste_your_telegram_token_here
GOOGLE_API_KEY=paste_your_google_api_key_here
AI_MODEL=gemini-pro
PORT=3000
NODE_ENV=development
```

3. Replace `paste_your_telegram_token_here` with your actual Telegram token
4. Replace `paste_your_google_api_key_here` with your actual Google API key

### Step 4: Install and Run

```bash
# Install dependencies (first time only)
npm install

# Build the project
npm run build

# Start the bot
npm start
```

You should see:
```
Server is running on port 3000
Starting bot in polling mode (development)
Bot started successfully
✅ Cambodia Agriculture Bot is ready!
```

### Step 5: Test Your Bot

1. Open Telegram
2. Search for your bot username (e.g., `@cambodia_agriculture_bot`)
3. Click **Start**
4. Try asking: "When is the best time to plant rice in Cambodia?"

## Troubleshooting

**Error: "Missing required environment variable: TELEGRAM_BOT_TOKEN"**
- Make sure you created the `.env` file
- Check that you pasted your token correctly

**Error: "Missing required environment variable: GOOGLE_API_KEY"**
- Make sure you pasted your Google API key in the `.env` file
- Verify the key is correct (no extra spaces)

**Bot doesn't respond:**
- Check the console for errors
- Make sure the bot is running (you should see "Bot started successfully")
- Try sending `/start` command first

## Important Notes

✅ **Google Gemini is 100% FREE** - No credit card required!
✅ **Free limits:** 60 requests/minute, 1500 requests/day
✅ **Perfect for testing and small-scale use**

## Need Help?

If you get stuck, check:
1. Console output for error messages
2. Make sure `.env` file exists and has correct values
3. Verify both API keys are valid

Happy farming! 🌾🇰🇭
