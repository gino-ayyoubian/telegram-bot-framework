import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../../bot/keyboards/main.menu.js';

export async function handlePaymentFlow(ctx: BotContextWithSession, input: string) {
  const s = ctx.session.currentState;
  if (s === 'PAYMENT_INIT') {
    ctx.session.currentState = 'PAYMENT_PENDING';
    await ctx.reply('درگاه آماده شد.');
  } else if (s === 'PAYMENT_PENDING') {
    if (input === 'success') {
      ctx.session.currentState = 'PAYMENT_SUCCESS';
      await ctx.reply('پرداخت موفق.', mainMenuKeyboard);
    } else if (input === 'fail') {
      ctx.session.currentState = 'PAYMENT_FAIL';
      await ctx.reply('پرداخت ناموفق.');
    }
  } else if (s === 'PAYMENT_FAIL') {
    ctx.session.currentState = 'ORDER_REVIEW';
    await ctx.reply('بازگشت به سفارش.');
  }
}