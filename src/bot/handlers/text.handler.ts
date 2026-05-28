import { BotContextWithSession } from '../../types/context.js';
import { routeFlow } from '../../workflows/registry.js';

export async function textHandler(ctx: BotContextWithSession) {
  const input = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  if (!input) return;
  await routeFlow(ctx, input);
}