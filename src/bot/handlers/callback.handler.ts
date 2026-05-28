import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../keyboards/main.menu.js';
import { serviceMenuKeyboard } from '../keyboards/service.menu.js';

export async function callbackHandler(ctx: BotContextWithSession) {
  const data = ctx.callbackQuery && 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : '';
  if (!data) return;
  await ctx.answerCbQuery();
  const [group, value] = data.split(':');
  
  if (group === 'menu' && value === 'order') {
    ctx.session.currentState = 'SERVICE_LIST';
    await ctx.reply('سرویس انتخاب کنید', serviceMenuKeyboard);
  } else if (group === 'menu' && value === 'support') {
    ctx.session.currentState = 'SUPPORT_MENU';
    await ctx.reply('پشتیبانی', mainMenuKeyboard);
  } else if (group === 'nav' && value === 'back') {
    ctx.session.currentState = 'MAIN_MENU';
    await ctx.reply('بازگشت', mainMenuKeyboard);
  } else if (group === 'nav' && value === 'cancel') {
    ctx.session.currentState = 'MAIN_MENU';
    ctx.session.context = {};
    await ctx.reply('لغو شد', mainMenuKeyboard);
  }
}