import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../keyboards/main.menu.js';
import { serviceMenuKeyboard } from '../keyboards/service.menu.js';

export async function callbackHandler(ctx: BotContextWithSession) {
  const data = ctx.callbackQuery && 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : '';
  if (!data) return;
  await ctx.answerCbQuery();
  const [group, value] = data.split(':');
  
  if (group === 'menu' && value === 'order') {
    ctx.session!.flowName = 'order';
    ctx.session!.currentState = 'SERVICE_LIST';
    await ctx.reply('انتخاب سرویس:', serviceMenuKeyboard);
  } else if (group === 'menu' && value === 'payment') {
    ctx.session!.flowName = 'payment';
    ctx.session!.currentState = 'PAYMENT_INIT';
    await ctx.reply('درگاه پرداخت آماده شد.');
  } else if (group === 'menu' && value === 'support') {
    ctx.session!.flowName = 'support';
    ctx.session!.currentState = 'SUPPORT_MENU';
    await ctx.reply('موضوع تیکت.');
  } else if (group === 'menu' && value === 'profile') {
    ctx.session!.flowName = 'profile';
    ctx.session!.currentState = 'PROFILE_VIEW';
    await ctx.reply('پروفایل شما.');
  } else if (group === 'menu' && value === 'settings') {
    ctx.session!.flowName = 'settings';
    ctx.session!.currentState = 'SETTINGS_MENU';
    await ctx.reply('تنظیمات.');
  } else if (group === 'nav' && value === 'back') {
    ctx.session!.currentState = 'MAIN_MENU';
    await ctx.reply('منوی اصلی:', mainMenuKeyboard);
  }
}
