import { Markup } from 'telegraf';

export const serviceMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('سرویس A', 'service:a')],
  [Markup.button.callback('سرویس B', 'service:b')],
  [Markup.button.callback('بازگشت', 'nav:back')],
  [Markup.button.callback('لغو', 'nav:cancel')],
]);