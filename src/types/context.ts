import { Context } from 'telegraf';
import { BotSessionData, UserProfile } from './session.js';

export interface BotContext extends Context {
  session?: BotSessionData;
  user?: UserProfile;
}

// Alias for backward compatibility
export type BotContextWithSession = BotContext;
