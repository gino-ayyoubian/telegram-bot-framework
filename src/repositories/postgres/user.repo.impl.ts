import { pool } from '../../db/pool.js';
import { UserRepository } from '../user.repository.js';
import { UserProfile } from '../../types/session.js';

export class PostgresUserRepository implements UserRepository {
  async findByTelegramId(telegramId: number): Promise<UserProfile | null> {
    const res = await pool.query(
      `SELECT * FROM users WHERE telegram_id = $1 LIMIT 1`,
      [telegramId]
    );
    if (!res.rows[0]) return null;
    const r = res.rows[0];
    return {
      id: r.id,
      telegramId: Number(r.telegram_id),
      fullName: r.full_name,
      username: r.username,
      phone: r.phone,
      role: r.role,
      status: r.status
    };
  }

  async create(data: Partial<UserProfile> & { telegramId: number }): Promise<UserProfile> {
    const res = await pool.query(
      `INSERT INTO users (id, telegram_id, full_name, username, phone, role, status)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.telegramId,
        data.fullName ?? null,
        data.username ?? null,
        data.phone ?? null,
        data.role ?? 'user',
        data.status ?? 'active'
      ]
    );
    const r = res.rows[0];
    return {
      id: r.id,
      telegramId: Number(r.telegram_id),
      fullName: r.full_name,
      username: r.username,
      phone: r.phone,
      role: r.role,
      status: r.status
    };
  }

  async updateProfile(userId: string, patch: Partial<UserProfile>): Promise<UserProfile> {
    const res = await pool.query(
      `UPDATE users SET 
        full_name = COALESCE($2, full_name),
        username = COALESCE($3, username),
        phone = COALESCE($4, phone),
        role = COALESCE($5, role),
        status = COALESCE($6, status),
        updated_at = now()
       WHERE id = $1 RETURNING *`,
      [
        userId,
        patch.fullName ?? null,
        patch.username ?? null,
        patch.phone ?? null,
        patch.role ?? null,
        patch.status ?? null
      ]
    );
    const r = res.rows[0];
    return {
      id: r.id,
      telegramId: Number(r.telegram_id),
      fullName: r.full_name,
      username: r.username,
      phone: r.phone,
      role: r.role,
      status: r.status
    };
  }
}