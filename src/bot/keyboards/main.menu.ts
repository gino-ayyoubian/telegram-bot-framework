import { Markup } from 'telegraf';

export const mainMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('سفارش', 'menu:order')],
  [Markup.button.callback('پشتیبانی', 'menu:support')],
  [Markup.button.callback('پروفایل', 'menu:profile')],
  [Markup.button.callback('تنظیمات', 'menu:settings')],
]);