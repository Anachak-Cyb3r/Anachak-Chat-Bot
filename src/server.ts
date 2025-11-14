import express from 'express';
import { config } from './config';
import { createBot } from './bot';

const app = express();
const bot = createBot();

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook endpoint for Telegram
app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body, res);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Cambodia Agriculture Telegram Bot',
    status: 'running',
    version: '1.0.0',
  });
});

async function startServer() {
  try {
    // Start Express server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });

    // Set up webhook if URL is provided (production mode)
    if (config.webhookUrl) {
      console.log(`Setting up webhook: ${config.webhookUrl}/webhook`);
      await bot.telegram.setWebhook(`${config.webhookUrl}/webhook`);
      console.log('Webhook set successfully');
    } else {
      // Development mode: use long polling
      console.log('Starting bot in polling mode (development)');
      await bot.launch();
      console.log('Bot started successfully');
    }

    console.log('✅ Cambodia Agriculture Bot is ready!');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
function setupGracefulShutdown() {
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    try {
      // Stop the bot
      await bot.stop(signal);
      console.log('Bot stopped');
      
      // Exit process
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

// Start the server
setupGracefulShutdown();
startServer();
