import { Telegraf } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware.js';
import { startCommand } from './commands/start.command.js';
import { textHandler } from './handlers/text.handler.js';
import { callbackHandler } from './handlers/callback.handler.js';
import { env } from '../config/env.js';

export function createBot(token: string) {
  const bot = new Telegraf(token);
  
  bot.use(sessionMiddleware);
  
  bot.start(startCommand);
  bot.action(/.*/, callbackHandler);
  bot.on('text', textHandler);
  
  return bot;
}

// Create and export default bot instance
export const bot = createBot(env.TELEGRAM_BOT_TOKEN);