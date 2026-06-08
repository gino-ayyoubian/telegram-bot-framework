import { BotContextWithSession } from '../types/context.js';
import { BotState } from '../types/session.js';

export class WorkflowEngine {
  async process(ctx: BotContextWithSession, input: string): Promise<{ nextState: BotState; replyText?: string }> {
    const state = ctx.session!.currentState;
    if (state === 'START') return { nextState: 'MAIN_MENU', replyText: 'خوش آمدید.' };
    if (state === 'MAIN_MENU' && input === 'order') return { nextState: 'SERVICE_LIST', replyText: 'سرویس را انتخاب کنید.' };
    if (state === 'MAIN_MENU' && input === 'payment') return { nextState: 'PAYMENT_INIT', replyText: 'درگاه آماده شد.' };
    return { nextState: state, replyText: undefined };
  }
}
