import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../keyboards/main.menu.js';

export async function startCommand(ctx: BotContextWithSession) {
  ctx.session.flowName = 'main';
  ctx.session.currentState = 'MAIN_MENU';
  ctx.session.context = {};
  await ctx.reply('سلام. خوش آمدید.', mainMenuKeyboard);
}