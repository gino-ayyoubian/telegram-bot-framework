import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../../bot/keyboards/main.menu.js';

export async function handleSupportFlow(ctx: BotContextWithSession, input: string) {
  const s = ctx.session!.currentState;
  if (s === 'SUPPORT_MENU') {
    ctx.session!.currentState = 'NEW_TICKET';
    await ctx.reply('موضوع تیکت.');
  } else if (s === 'NEW_TICKET') {
    ctx.session!.context.ticketSubject = input;
    ctx.session!.currentState = 'TICKET_OPEN';
    await ctx.reply('تیکت ثبت شد.');
  } else if (s === 'TICKET_OPEN') {
    ctx.session!.currentState = 'TICKET_WAITING';
    await ctx.reply('پیام بعدی در تیکت.');
  } else if (s === 'TICKET_WAITING') {
    ctx.session!.currentState = 'MAIN_MENU';
    await ctx.reply('پایان پشتیبانی.', mainMenuKeyboard);
  }
}
