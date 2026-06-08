import { BotContextWithSession } from '../../types/context.js';
import { mainMenuKeyboard } from '../../bot/keyboards/main.menu.js';

export async function handleAuthFlow(ctx: BotContextWithSession, input: string) {
  const s = ctx.session!.currentState;
  if (s === 'AUTH_CHECK') {
    ctx.session!.currentState = 'MAIN_MENU';
    await ctx.reply('وارد شده\u200cاید.', mainMenuKeyboard);
  } else if (s === 'REGISTER_NAME') {
    ctx.session!.context.fullName = input;
    ctx.session!.currentState = 'REGISTER_PHONE';
    await ctx.reply('شماره را بفرستید.');
  } else if (s === 'REGISTER_PHONE') {
    ctx.session!.context.phone = input;
    ctx.session!.currentState = 'VERIFY_OTP';
    await ctx.reply('کد تایید را وارد کنید.');
  } else if (s === 'VERIFY_OTP') {
    ctx.session!.currentState = 'MAIN_MENU';
    await ctx.reply('احراز هویت شد.', mainMenuKeyboard);
  }
}
