import { Context } from 'telegraf';
import { BotSessionData, UserProfile } from './session.js';

export interface BotContext extends Context {
  session: BotSessionData;
  user?: UserProfile;
}

// SessionFlavor is not exported in current telegraf version;
// BotContext already includes session, so this alias preserves compatibility.
export type BotContextWithSession = BotContext;
