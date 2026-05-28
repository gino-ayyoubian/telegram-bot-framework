import 'dotenv/config';
import { createBot } from './bot/index.js';
import apiApp from './api/index.js';
import { env } from './config/env.js';

// Start Telegram Bot
const bot = createBot(env.TELEGRAM_BOT_TOKEN);
bot.launch().then(() => {
  console.log('🤖 Bot started');
});

// Start REST API
import http from 'http';
const server = http.createServer(apiApp);
server.listen(env.PORT, () => {
  console.log(`🌐 API running on port ${env.PORT}`);
});

// Graceful shutdown
process.once('SIGINT', () => {
  bot.stop('SIGINT');
  process.exit();
});