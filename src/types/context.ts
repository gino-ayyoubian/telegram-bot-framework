import { Context, SessionFlavor } from 'telegraf';
import { BotSessionData, UserProfile } from './session.js';

export interface BotContext extends Context {
  session: BotSessionData;
  user?: UserProfile;
}

export type BotContextWithSession = BotContext & SessionFlavor<BotSessionData>;