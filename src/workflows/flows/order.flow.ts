import { BotContextWithSession } from '../../types/context.js';
import { serviceMenuKeyboard } from '../../bot/keyboards/service.menu.js';

export async function handleOrderFlow(ctx: BotContextWithSession, input: string) {
  const s = ctx.session!.currentState;
  if (s === 'SERVICE_LIST') {
    ctx.session!.context.serviceCode = input;
    ctx.session!.currentState = 'SERVICE_DETAIL';
    await ctx.reply('جزئیات سرویس.', serviceMenuKeyboard);
  } else if (s === 'SERVICE_DETAIL') {
    ctx.session!.currentState = 'ORDER_FORM';
    await ctx.reply('فرم سفارش.');
  } else if (s === 'ORDER_FORM') {
    ctx.session!.context.orderNote = input;
    ctx.session!.currentState = 'ORDER_REVIEW';
    await ctx.reply('بررسی سفارش.');
  } else if (s === 'ORDER_REVIEW' && input === 'confirm') {
    ctx.session!.currentState = 'ORDER_CONFIRM';
    await ctx.reply('تایید شد.');
  }
}
