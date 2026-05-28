import { BotContextWithSession } from '../types/context.js';
import { handleAuthFlow } from './flows/auth.flow.js';
import { handleOrderFlow } from './flows/order.flow.js';
import { handlePaymentFlow } from './flows/payment.flow.js';
import { handleSupportFlow } from './flows/support.flow.js';

export async function routeFlow(ctx: BotContextWithSession, input: string) {
  const s = ctx.session.currentState;
  if (['AUTH_CHECK','REGISTER_NAME','REGISTER_PHONE','VERIFY_OTP'].includes(s)) return handleAuthFlow(ctx, input);
  if (['SERVICE_LIST','SERVICE_DETAIL','ORDER_FORM','ORDER_REVIEW','ORDER_CONFIRM'].includes(s)) return handleOrderFlow(ctx, input);
  if (['PAYMENT_INIT','PAYMENT_PENDING','PAYMENT_SUCCESS','PAYMENT_FAIL'].includes(s)) return handlePaymentFlow(ctx, input);
  if (['SUPPORT_MENU','NEW_TICKET','TICKET_OPEN','TICKET_WAITING'].includes(s)) return handleSupportFlow(ctx, input);
  await ctx.reply('handler تعریف نشده.');
}