import { BotSessionData } from '../types/session.js';

export interface SessionRepository {
  findByUserId(userId: string): Promise<BotSessionData | null>;
  upsert(userId: string, session: BotSessionData): Promise<void>;
}