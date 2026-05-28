import { pool } from '../../db/pool.js';
import { SessionRepository } from '../session.repository.js';
import { BotSessionData } from '../../types/session.js';

export class PostgresSessionRepository implements SessionRepository {
  async findByUserId(userId: string): Promise<BotSessionData | null> {
    const res = await pool.query(
      `SELECT flow_name, current_state, context_jsonb FROM user_sessions WHERE user_id = $1 LIMIT 1`,
      [userId]
    );
    if (!res.rows[0]) return null;
    const r = res.rows[0];
    return {
      flowName: r.flow_name,
      currentState: r.current_state,
      context: r.context_jsonb ?? {},
    };
  }

  async upsert(userId: string, session: BotSessionData): Promise<void> {
    await pool.query(
      `INSERT INTO user_sessions (id, user_id, flow_name, current_state, context_jsonb, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, now())
       ON CONFLICT (user_id)
       DO UPDATE SET flow_name = excluded.flow_name, current_state = excluded.current_state,
                     context_jsonb = excluded.context_jsonb, updated_at = now()`,
      [userId, session.flowName, session.currentState, session.context]
    );
  }
}