import { pool } from '../db/pool.js';
import { UserProfile } from '../types/session.js';

export class UserService {
  async findOrCreate(telegramId: number, profile?: Partial<UserProfile>): Promise<UserProfile> {
    let user = await pool.query(`SELECT * FROM users WHERE telegram_id = $1`, [telegramId]);
    if (user.rows[0]) {
      return user.rows[0];
    }
    const newUser = await pool.query(
      `INSERT INTO users (telegram_id, full_name, username) VALUES ($1, $2, $3) RETURNING *`,
      [telegramId, profile?.fullName ?? null, profile?.username ?? null]
    );
    return newUser.rows[0];
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return res.rows[0] ?? null;
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await pool.query(
      `UPDATE users SET full_name = COALESCE($2, full_name), updated_at = now() WHERE id = $1 RETURNING *`,
      [userId, data.fullName ?? null]
    );
    return res.rows[0];
  }
}

export const userService = new UserService();