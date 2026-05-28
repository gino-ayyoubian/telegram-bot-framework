import { UserProfile } from '../types/session.js';

export interface UserRepository {
  findByTelegramId(telegramId: number): Promise<UserProfile | null>;
  create(data: Partial<UserProfile> & { telegramId: number }): Promise<UserProfile>;
  updateProfile(userId: string, patch: Partial<UserProfile>): Promise<UserProfile>;
}