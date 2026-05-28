import { MiddlewareFn } from 'telegraf';
import { BotContextWithSession } from '../../types/context.js';

export const sessionMiddleware: MiddlewareFn<BotContextWithSession> = async (ctx, next) => {
  if (!ctx.session) {
    ctx.session = { flowName: 'main', currentState: 'START', context: {} };
  }
  await next();
};