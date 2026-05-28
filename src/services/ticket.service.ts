import { pool } from '../db/pool.js';

export interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
}

export class TicketService {
  async create(userId: string, subject: string, priority: string = 'normal'): Promise<Ticket> {
    const res = await pool.query(
      `INSERT INTO tickets (user_id, subject, priority, status) VALUES ($1, $2, $3, 'open') RETURNING *`,
      [userId, subject, priority]
    );
    return res.rows[0];
  }

  async findByUser(userId: string): Promise<Ticket[]> {
    const res = await pool.query(`SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
    return res.rows;
  }

  async addMessage(ticketId: string, userId: string, message: string, role: string): Promise<void> {
    await pool.query(
      `INSERT INTO ticket_messages (ticket_id, sender_user_id, sender_role, message) VALUES ($1, $2, $3, $4)`,
      [ticketId, userId, role, message]
    );
  }

  async getMessages(ticketId: string): Promise<any[]> {
    const res = await pool.query(`SELECT * FROM ticket_messages WHERE ticket_id = $1 ORDER BY created_at`, [ticketId]);
    return res.rows;
  }
}

export const ticketService = new TicketService();